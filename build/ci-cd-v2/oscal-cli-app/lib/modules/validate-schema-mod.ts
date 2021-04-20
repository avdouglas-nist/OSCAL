import {join} from 'path';
import fs from 'fs';
import Ajv from 'ajv';
const libxmljs = require('libxmljs2');

import {colorCodes} from '../utils/init';
const {P_END, P_INFO, P_ERROR, P_OK, P_PATH, P_WARN} = colorCodes

export const validateSchema = (
    schemaDir: string,
    schemaFile: string,
    workingDir: string,
) => {
  try {
    const oscalRootDirectory: any = join(__dirname, '../../../../..');
    //Extract last element of the array
    const [ fileExtension ] = schemaFile.split('.').slice(-1);
    //If extension is xsd then format is xml else format is json
    const format = fileExtension === 'xsd' ? 'xml' : 'json';

    let schemaRootDir;
    if (schemaDir) { // when validation is triggered from "generate-schema" command
      schemaRootDir = schemaDir;
    }
    else { // when validation is run as a standalone CLI command
      schemaRootDir = workingDir ? `${process.cwd()}/${workingDir}` : process.cwd();
    }
    
    // Confirm that schemaFile is present
    const findSchemaFile = fs.readdirSync(`${schemaRootDir}/${format}/schema`).find(file => file === schemaFile);

    if (!findSchemaFile) {
      console.log(`${P_ERROR}Schema not found in '${P_END}${P_PATH}${schemaRootDir}/${format}/schema${P_END}${P_ERROR}'${P_END}.`);

      process.exit(1);
    }

    const generatedSchemaPath = `${schemaRootDir}/${format}/schema/${schemaFile}`;

    if (format === 'xml') {
         // Using xsd Validator for XML
        const xsdValidatorPath = `${oscalRootDirectory}/build/metaschema/scripts/../support/xml/XMLSchema.xsd`;
        //Using generated XML = XSD file
        const xmlSchema = generatedSchemaPath;
    
       //const xsdSchemaPath = schema;
        const xsdSchemaFile = fs.readFileSync(xmlSchema, 'utf8')
        const xsdSchemaContent = libxmljs.parseXml(xsdSchemaFile)
        const xsdValidatorFile = fs.readFileSync(xsdValidatorPath, 'utf8');
        const xsdValidatorContent= libxmljs.parseXml(xsdValidatorFile)
        const valid = xsdValidatorContent.validate(xsdSchemaContent);

      if (!valid) {
        console.log(`${P_ERROR}XML Schema validation failed for '${P_END}${P_PATH}${generatedSchemaPath}${P_END}${P_PATH} using schema ${xsdValidatorPath}${P_END}${P_ERROR}'${P_END}.`);

        process.exit(1);
      }
      else {
        console.log(`${P_OK}Schema validation passed for '${P_END}${P_PATH}${generatedSchemaPath}${P_END}${P_PATH}.`);
      }
    }

    if (format === 'json') {
      //Uses AJV for the JSON validation
      const ajv = new Ajv();
      const jsonSchemaValidatorPath = `${oscalRootDirectory}/build/metaschema/scripts/../support/json/json-schema-schema.json`
      const jsonSchemaValidatorContent = fs.readFileSync(jsonSchemaValidatorPath, 'utf8');
      const validate = ajv.compile(JSON.parse(jsonSchemaValidatorContent));
      const jsonContent = fs.readFileSync(generatedSchemaPath, 'utf8');
      const valid = validate(JSON.parse(jsonContent));

      if (!valid) {
        console.log(`${P_ERROR}JSON Schema validation failed for '${P_END}${P_PATH}${generatedSchemaPath}${P_END}${P_PATH} using schema ${generatedSchemaPath}${P_END}${P_ERROR}'${P_END}.`);

        process.exit(1);
      } else {
          console.log(`${P_OK}Schema validation passed for '${P_END}${P_PATH}${generatedSchemaPath}${P_END}${P_PATH}.`);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}
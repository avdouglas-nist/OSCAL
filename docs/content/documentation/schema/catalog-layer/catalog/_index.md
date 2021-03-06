---
title: Catalog Model
heading: "OSCAL Catalog Layer: Catalog Model"
description: XML and JSON format documentation for the OSCAL Catalog model, which models a [control catalog](/documentation/schema/catalog-layer/#catalog).
weight: 30
aliases:
  - /docs/model/catalog/
  - /documentation/schema/catalog/
  - /documentation/schema/catalog-layer/catalog/examples/
---

The OSCAL catalog model represents the information contained within a [control catalog](../#catalog). The catalog model is the sole model in the OSCAL [catalog layer](../).

OSCAL is designed to support the standardized representation of control definitions from different sources. The OSCAL catalog model can be used to express different control catalogs in a standardized way, allowing control information to be easily searched, imported, and exported by applications.

## Content Examples

The NIST SP 800-53 revision 4 and 5 control catalogs are provided as catalog model [examples](https://github.com/usnistgov/OSCAL/blob/master/content/nist.gov/SP800-53/) in the OSCAL GitHub repository. These examples are provided in OSCAL XML, JSON, and YAML formats.

### NIST SP 800-53 Annotated Example

{{<callout>}}**Note:** Full versions of the NIST SP 800-53 revision 4 catalog are available in OSCAL [XML](https://github.com/usnistgov/OSCAL/blob/master/content/nist.gov/SP800-53/rev4/xml/NIST_SP-800-53_rev4_catalog.xml), [JSON](https://github.com/usnistgov/OSCAL/blob/master/content/nist.gov/SP800-53/rev4/json/NIST_SP-800-53_rev4_catalog.json), and [YAML](https://github.com/usnistgov/OSCAL/blob/master/content/nist.gov/SP800-53/rev4/yaml/NIST_SP-800-53_rev4_catalog.yaml) formats in the OSCAL GitHub repository. These examples also include assessment and objective content from NIST SP 800-53A revision 4.{{</callout>}}

Here is a non-normative, partial illustration showing how control **AC1** from NIST SP 800-53 rev 4 can be rendered in OSCAL Catalog XML format with a `<control>` element. A short walkthrough follows.

{{<highlight xml "linenos=table,nowrap=false" >}}
<control class="SP800-53" id="ac-1">
  <title>Access Control Policy and Procedures</title>
  <param id="ac-1_prm_1">
    <label>organization-defined personnel or roles</label>
  </param>
  <param id="ac-1_prm_2">
    <label>organization-defined frequency</label>
  </param>
  <param id="ac-1_prm_3">
    <label>organization-defined frequency</label>
  </param>
  <prop class="label">AC-1</prop>
  <part class="statement" id="ac-1_smt">
    <p>The organization:</p>
    <part class="item" id="ac-1_smt.a">
      <prop class="label">a.</prop>
      <p>Develops, documents, and disseminates to <insert param-id="ac-1_prm_1"/>:</p>
      <part class="item" id="ac-1_smt.a.1">
        <prop class="label">1.</prop>
        <p>An access control policy that addresses purpose, scope, roles,
           responsibilities, management commitment, coordination among
           organizational entities, and compliance; and</p>
      </part>
      <part class="item" id="ac-1_smt.a.2">
        <prop class="label">2.</prop>
        <p>Procedures to facilitate the implementation of the access control
           policy and associated access controls; and</p>
      </part>
    </part>
    <part class="item" id="ac-1_smt.b">
      <prop class="label">b.</prop>
      <p>Reviews and updates the current:</p>
      <part class="item" id="ac-1_smt.b.1">
        <prop class="label">1.</prop>
        <p>Access control policy <insert param-id="ac-1_prm_2"/>; and</p>
      </part>
      <part class="item" id="ac-1_smt.b.2">
        <prop class="label">2.</prop>
        <p>Access control procedures <insert param-id="ac-1_prm_3"/>.</p>
      </part>
    </part>
  </part>
  <part class="guidance" id="ac-1_gdn">
    <p>This control addresses the establishment of policy and procedures for the
       effective implementation of selected security controls and control
       enhancements in the AC family. Policy and procedures reflect applicable
       federal laws, Executive Orders, directives, regulations, policies,
       standards, and guidance. Security program policies and procedures at the
       organization level may make the need for system-specific policies and
       procedures unnecessary. The policy can be included as part of the general
       information security policy for organizations or conversely, can be
       represented by multiple policies reflecting the complex nature of certain
       organizations. The procedures can be established for the security program
       in general and for particular information systems, if needed. The
       organizational risk management strategy is a key factor in establishing
       policy and procedures.</p>
    <link rel="related" href="#pm-9">PM-9</link>
  </part>
  <references>
    <link href="#ref050" rel="reference">NIST Special Publication 800-12</link>
    <link href="#ref044" rel="reference">NIST Special Publication 800-100</link>
  </references>
</control>
{{< / highlight >}}

#### Walkthrough

- The control class is "SP800-53". This serves as an indicator to a downstream processor of how it can expect this control to be
structured.
- The control ID is "ac.1". All `id` values are unique within the document and serve for addressing and linking. In the case of controls and subcontrols, the lexical form of the `id` is designed to be consistent with its formal name or label, which is **also** encoded within the control (in this case, "AC-1"). A discrepancy between these values indicates degradation in the data.
- `<param>` elements define parameter values for the control that permit (and may require) setting in context. Typically, a catalog will expose parameters where profiling applications are expected either to provide values themselves (appropriate to each profile) or to permit setting at higher levels of implementation. These values are available for assignment wherever indicated in the language of the control, using corresponding `<insert/>` elements.
- `<prop>` elements specify properties appropriate to this control. Here only a `label` property is given, for the control's canonical label. For other catalogs, other properties may assign values to controls according to any system of labels or associations.
- `<part>` elements indicate larger articulated structures. Here the part provides the *statement* for the control (as shown by its class). In SP 800-53, control statements give the text (formal prose definition and description) of the control. As the example shows, statements can also be articulated into subparts, with each discrete piece of the statement handled separately and assigned its own identifier.
- `<insert>` elements reference parameters (`param-id` referencing parameter IDs) to bring in user-defined values.

The following snippet from the example above contains supplemental guidance given with the control (line breaks added for readability).

{{< highlight xml "linenos=table,linenostart=43" >}}
<part class="guidance" id="ac-1_gdn">
  <p>This control addresses the establishment of policy and procedures for the
     effective implementation of selected security controls and control
     enhancements in the AC family. Policy and procedures reflect applicable
     federal laws, Executive Orders, directives, regulations, policies,
     standards, and guidance. Security program policies and procedures at the
     organization level may make the need for system-specific policies and
     procedures unnecessary. The policy can be included as part of the general
     information security policy for organizations or conversely, can be
     represented by multiple policies reflecting the complex nature of certain
     organizations. The procedures can be established for the security program
     in general and for particular information systems, if needed. The
     organizational risk management strategy is a key factor in establishing
     policy and procedures.</p>
  <link rel="related" href="#pm-9">PM-9</link>
</part>
{{< / highlight >}}

Note that unlike the control statement, which has a structure whose parts are labeled and addressable, the supplemental guidance is a simple paragraph. Where catalogs do not provide structure, OSCAL does not impose any.

Finally, the control description gives references for the control:

{{< highlight xml "linenos=table,linenostart=59" >}}
<references>
  <link href="#ref050" rel="reference">NIST Special Publication 800-12</link>
  <link href="#ref044" rel="reference">NIST Special Publication 800-100</link>
</references>
{{< / highlight >}}

These can be resolved to elements elsewhere in the catalog, as for example here (a citation from this catalog to another NIST publication):

{{< highlight xml >}}
<ref id="ref050">
  <citation href="http://csrc.nist.gov/publications/PubsSPs.html#800-12">NIST Special
  Publication 800-12</citation>
</ref>
{{< / highlight >}}     

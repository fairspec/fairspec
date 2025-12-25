---
title: Fairspec Dataset
sidebar:
  label: Dataset
---

<table>
  <tr>
    <th>Authors</th>
    <td>Evgeny Karev</td>
  </tr>
  <tr>
    <th>Schema</th>
    <td>
      <a href="https://fairspec.org/schemas/{version}/fairspec.dataset.json">https://fairspec.org/schemas/{version}/fairspec.dataset.json</a>
    </td>
  </tr>
</table>

Fairspec Dataset is a simple JSON based format that allows to describe a single dataset and its resources. It is compatible with DataCite for metadata and JSONSchema for structured data.

## Language

The key words `MUST`, `MUST NOT`, `REQUIRED`, `SHALL`, `SHALL NOT`, `SHOULD`, `SHOULD NOT`, `RECOMMENDED`, `MAY`, and `OPTIONAL` in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).

## Descriptor

A Fairspec Dataset is a [JSON](https://json.org/) resource that `MUST` be an object compatible with the [Dataset](#dataset) structure outlined below.

## Dataset

A top-level descriptor object describing an individual dataset.

### `$schema` [required] {#metaSchema}

URI to one of the officially published Fairspec Dataset schemas. It `MUST` ends with the `fairspec.dataset.json` prefix. For example, `https://fairspec.org/schemas/1.0.0/fairspec.dataset.json`.

### `resources`

A list of resources. It `MUST` be an array with search item `MUST` be a [Resource](#resource).

### `<datacite>` {#dataset-datacite}

Dataset supports all the properties defined in [DataCite Metadata Schema 4.6](https://datacite-metadata-schema.readthedocs.io/en/4.6/).

## Resource

### `path`

### `<datacite>` {#dataset-datacite}

Resource supports all the properties defined in [DataCite Metadata Schema 4.6](https://datacite-metadata-schema.readthedocs.io/en/4.6/).

## Extensions

Fairspec Catalog does not support extensions. Additional properties are not allowed.

## Examples

An example of a Fairspec Catalog:

```json
{}
```

## Related Work

> [!NOTE]
> This section is under development.

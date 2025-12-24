---
title: Fairspec Catalog
sidebar:
  label: Catalog
---

<table>
  <tr>
    <th>Authors</th>
    <td>Evgeny Karev</td>
  </tr>
  <tr>
    <th>Schema</th>
    <td>
      <a href="https://fairspec.org/schemas/{version}/fairspec.catalog.json">https://fairspec.org/schemas/{version}/fairspec.catalog.json</a>
    </td>
  </tr>
</table>

Fairspec Catalog is a simple replication format that allows to sync a catalog of Fairspec Datasets. Dynamic search, sorting and similar capabilities are no goals of this specification.

## Language

The key words `MUST`, `MUST NOT`, `REQUIRED`, `SHALL`, `SHALL NOT`, `SHOULD`, `SHOULD NOT`, `RECOMMENDED`, `MAY`, and `OPTIONAL` in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).

## Descriptor

A Fairspec Catalog is a [JSON Lines](https://jsonlines.org/) file with each line has an path to a single Fairspec Dataset descriptor and its last updated time. The paths `MUST` be unique and the datasets `MUST` be sorted by the last updated time in descending order.

## Examples

An example of a Fairspec Catalog:

```jsonl
{"path": "https://example.com/dataset1.json", "updated": "2023-10-01T00:00:00Z"}
{"path": "https://example.com/dataset3.json", "updated": "2023-09-01T00:00:00Z"}
{"path": "https://example.com/dataset2.json", "updated": "2023-08-01T00:00:00Z"}
```

## Properties

Each line of the catalog file `MUST` be a JSON object with the following properties:

### `path` [required] {#path}

URI path to the Fairspec Dataset descriptor. The property `MUST` be [JSON Schema URI](https://json-schema.org/understanding-json-schema/reference/type#resource-identifiers).

### `updated` [required] {#updated}

The last updated time of the dataset. The property `MUST` be [JSON Schema date-time](https://json-schema.org/understanding-json-schema/reference/type#dates-and-times).

## Extensions

Fairspec Catalog does not support extensions. Additional properties are not allowed.

## Streaming

Fairspec Catalog is designed to be used in a streaming manner. Because datasets are sorted by their last updated time in descending order, clients `SHOULD` read the catalog line-by-line and terminate reading once they encounter a dataset with an `updated` timestamp that has already been seen. This allows efficient synchronization without processing the entire catalog file.

## Related Work

> [!NOTE]
> This section is under development.

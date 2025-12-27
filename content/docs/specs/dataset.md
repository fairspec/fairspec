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

A top-level descriptor object describing an individual dataset. It `MUST` have the following properties (all optional unless otherwise stated)::

### `$schema` [required] {#metaSchema}

URI to one of the officially published Fairspec Dataset schemas. It `MUST` ends with the `fairspec.dataset.json` prefix.

For example for version X.Y.Z of the schema:

```json
{
  "$schema": "https://fairspec.org/schemas/X.Y.Z/fairspec.dataset.json"
}
```

### `resources`

A list of resources. It `MUST` be an array with search item `MUST` be a [Resource](#resource).

For example for a single resource:

```json
{
  "resources": [
    {
      "data": "https://example.com/file.csv"
    }
  ]
}
```

For multiple resources with more properties:

```json
{
  "resources": [
    {
      "data": "https://example.com/file1.csv",
      "format": {
        "name": "csv",
        "delimiter": ";"
      },
      "integrity": {
        "type": "sha256",
        "hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
      },
      "tableSchema": "https://example.com/table-schema.json"
    },
    {
      "data": "https://example.com/file2.json",
      "documentSchema": "https://example.com/document-schema.json"
    }
  ]
}
```

### `<datacite>` {#dataset-datacite}

Dataset supports all the properties defined in [DataCite Metadata Schema 4.6](https://datacite-metadata-schema.readthedocs.io/en/4.6/).

For example for a dataset with DOI and some other properties:

```json
{
  "doi": "10.1234/5678",
  "title": "My Dataset",
  "creators": [
    {
      "name": "John Doe",
      "nameType": "Personal"
    }
  ]
}
```

## Resource

A resource within a dataset. It `MUST` have the following properties (all optional unless otherwise stated):

### `data` [required] {#data}

Data or content of the resource. It `MUST` be in one of the following:

- [Path](#path) to a file
- Array of [Paths](#path) to files
- Inline JSON object
- Inline JSON array of objects

When multiple files are provided, they `MUST` all follow the same [Format](#format) and their contents `MUST` be physically concatenable in case of binary formats and logically concatenable in case of textual formats (i.e., combining them should produce a valid single file of that format).

For example, for a single internal file:

```json
{
  "data": "file.csv"
}
```

For multiple external files:

```json
{
  "data": [
    "https://example.com/file1.csv",
    "https://example.com/file2.csv"
  ]
}
```

For a JSON object:

```json
{
  "data": {
    "name": "John Doe",
    "age": 30
  }
}
```

For a JSON array of objects:

```json
{
  "data": [
    {
      "name": "John Doe",
      "age": 30
    },
    {
      "name": "Jane Doe",
      "age": 25
    }
  ]
}
```

### `format`

The format definition of the file. It `MUST` be a [Format](#format). For multiple files the `format` property defines the format for all the files.

For example, for a file with CSV format:

```json
{
  "format": {
    "name": "csv",
    "delimiter": ";"
  }
}
```

### `integrity`

The integrity check of the file. It `MUST` be a JSON object with the following properties:

**`type`**

The type of the integrity check. It `MUST` be one of the following values:

- `md5`
- `sha1`
- `sha256`
- `sha512`

**`hash`**

The hash of the file. It `MUST` be a string.

For example for a file with SHA-256 hash:

```json
{
  "integrity": {
    "type": "sha256",
    "hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  }
}
```

### `document`

It `MUST` be a [Path](#path) to a document schema or an object with the document schema. The document schema `MUST` be compatible with the [JSONSchema Draft 2020-12](https://json-schema.org/draft/2020-12) specification. If present, [Data](#data) `MUST` be a JSON document that is compatible with the provided schema.

For example as an external path:

```json
{
  "document": "https://example.com/document-schema.json"
}
```

For example as an object:

```json
{
  "document": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string"
      },
      "age": {
        "type": "integer"
      }
    },
    "required": ["name", "age"]
  }
}
```

### `table`

It `MUST` be a [Path](#path) to a table schema or an object with the table schema. The table schema `MUST` be compatible with the [Fairspec Table](../table) specification. If present, [Data](#data) `MUST` be a table that is compatible with the provided schema.

For example as an external path:

```json
{
  "table": "https://example.com/table-schema.json"
}
```

For example as an object:

```json
{
  "table": {
    "required": ["name", "age"],
    "properties": {
      "name": {
        "type": "string"
      },
      "age": {
        "type": "integer"
      }
    }
  }
}
```

### `<datacite>` {#resource-datacite}

Resource supports all the properties defined in [DataCite Metadata Schema 4.6](https://datacite-metadata-schema.readthedocs.io/en/4.6/).

For example for a resource with geolocation:

```json
{
  "geoLocations": [
    {
      "geoLocationPoint": {
        "pointLongitude": 12.34,
        "pointLatitude": 56.78
      },
      "geoLocationBox": {
        "westBoundLongitude": 12.34,
        "eastBoundLongitude": 56.78,
        "southBoundLatitude": 12.34,
        "northBoundLatitude": 56.78
      }
    }
  ]
}
```

## Format

Format specifies the features of all the data files in the resource. Format `MUST` be a JSON object with the following properties (all optional unless otherwise stated)::

### `name` [required] {#format-name}

The name of the format. It `MUST` be one of the following values:

- `csv`
- `tsv`
- `json`
- `jsonl`
- `xlsx`
- `ods`
- `sqlite`
- `parquet`
- `arrow`

For example for a CSV file:

```json
{
  "format": {
    "name": "csv"
  }
}
```

### `encoding`

> [!NOTE]
> Supported formats: **csv**, **tsv**

It `MUST` be one of the following values: `utf-8`, `ascii`. This property specifies the character encoding used in the file.

For example:

```json
{
  "format": {
    "name": "csv",
    "encoding": "utf-8"
  }
}
```

### `delimiter`

> [!NOTE]
> Supported formats: **csv**

It `MUST` be a string of one character length with default value `,` (comma). This property specifies the character sequence which separates fields in the data file.

For example:

```json
{
  "format": {
    "name": "csv",
    "delimiter": ";"
  }
}
```

For a file like:
```
id;name;price
1;apple;1.50
2;orange;2.00
```

### `lineTerminator`

> [!NOTE]
> Supported formats: **csv**, **tsv**

It `MUST` be a string. This property specifies the character sequence which terminates rows in the file. Common values are `\n` (Unix), `\r\n` (Windows), `\r` (old Mac).

For example:

```json
{
  "format": {
    "name": "csv",
    "lineTerminator": "\r\n"
  }
}
```

### `quoteChar`

> [!NOTE]
> Supported formats: **csv**

It `MUST` be a string of one character length with default value `"` (double quote). This property specifies a character to use for quoting in case the delimiter needs to be used inside a data cell.

For example:

```json
{
  "format": {
    "name": "csv",
    "quoteChar": "'"
  }
}
```

For a file like:
```
id,name
1,'apple,red'
2,'orange,citrus'
```

### `nullSequence`

> [!NOTE]
> Supported formats: **csv**, **tsv**

It `MUST` be a string or an array of strings. This property specifies the null sequence representing missing values in the data.

For example with a single sequence:

```json
{
  "format": {
    "name": "csv",
    "nullSequence": "NA"
  }
}
```

For example with multiple sequences:

```json
{
  "format": {
    "name": "csv",
    "nullSequence": ["NA", "N/A", "null", ""]
  }
}
```

For a file like:
```
id,name,notes
1,apple,fresh
2,orange,NA
3,banana,N/A
```

### `headerRows`

> [!NOTE]
> Supported formats: **csv**, **tsv**, **json**, **jsonl**, **xlsx**, **ods**

It `MUST` be `false` or an array of positive integers starting from `1`. This property specifies the row numbers for the header. It `SHOULD` to be used for multiline-header files.

For example with a single header row:

```json
{
  "format": {
    "name": "csv",
    "headerRows": [1]
  }
}
```

For example with multi-line headers:

```json
{
  "format": {
    "name": "csv",
    "headerRows": [1, 2]
  }
}
```

For a file like:
```
fruit
id,name,price
1,apple,1.50
2,orange,2.00
```

This would produce headers: "fruit id", "fruit name", "fruit price"

For example with no headers:

```json
{
  "format": {
    "name": "csv",
    "headerRows": false
  }
}
```

### `headerJoin`

> [!NOTE]
> Supported formats: **csv**, **tsv**, **json**, **jsonl**, **xlsx**, **ods**

It `MUST` be a string with default value `" "` (space). This property specifies how multiline-header files have to join the resulting header rows.

For example:

```json
{
  "format": {
    "name": "csv",
    "headerRows": [0, 1],
    "headerJoin": "_"
  }
}
```

For a file like:
```
fruit
id,name,price
1,apple,1.50
```

This would produce headers: "fruit_id", "fruit_name", "fruit_price"

### `commentRows`

> [!NOTE]
> Supported formats: **csv**, **tsv**, **xlsx**, **ods**

It `MUST` be an array of positive integers starting from `1`. This property specifies what rows have to be omitted from the data.

For example:

```json
{
  "format": {
    "name": "csv",
    "commentRows": [1, 5, 10]
  }
}
```

For a file like:
```
id,name
# This is a comment row
1,apple
2,orange
```

With `"commentRows": [2]`, the second row would be skipped.

### `commentChar`

> [!NOTE]
> Supported formats: **csv**, **tsv**, **xlsx**, **ods**

It `MUST` be a string of one character length with default value `#`. This property specifies what rows have to be omitted from the data based on the row's first characters.

For example:

```json
{
  "format": {
    "name": "csv",
    "commentChar": "#"
  }
}
```

For a file like:
```
id,name
# This row is ignored
1,apple
# Another comment
2,orange
```

Rows starting with `#` will be skipped.

### `columnNames`

> [!NOTE]
> Supported formats: **csv**, **tsv**, **json**, **jsonl**, **xlsx**, **ods**

It `MUST` be an array of strings. This property specifies explicit column names to use instead of deriving them from the file.

For example:

```json
{
  "format": {
    "name": "csv",
    "headerRows": false,
    "columnNames": ["id", "name", "price"]
  }
}
```

For a file without headers:
```
1,apple,1.50
2,orange,2.00
```

### `jsonPointer`

> [!NOTE]
> Supported formats: **json**

It `MUST` be a string in [JSON Pointer format (RFC 6901)](https://datatracker.ietf.org/doc/html/rfc6901). This property specifies where a data is located in the document.

For example:

```json
{
  "format": {
    "name": "json",
    "jsonPointer": "/data/items"
  }
}
```

For a JSON file like:
```json
{
  "metadata": { "version": "1.0" },
  "data": {
    "items": [
      { "id": 1, "name": "apple" },
      { "id": 2, "name": "orange" }
    ]
  }
}
```

### `rowType`

> [!NOTE]
> Supported formats: **json**, **jsonl**

It `MUST` be one of the following values: `array`, `object`. This property specifies whether the data items are arrays or objects.

For example with array of objects:

```json
{
  "format": {
    "name": "json",
    "rowType": "object"
  }
}
```

For data like:
```json
[
  { "id": 1, "name": "apple" },
  { "id": 2, "name": "orange" }
]
```

For example with array of arrays:

```json
{
  "format": {
    "name": "json",
    "rowType": "array",
    "columnNames": ["id", "name"]
  }
}
```

For data like:
```json
[
  [1, "apple"],
  [2, "orange"]
]
```

### `sheetName`

> [!NOTE]
> Supported formats: **xlsx**, **ods**

It `MUST` be a string. This property specifies a sheet name of a table in the spreadsheet file.

For example:

```json
{
  "format": {
    "name": "xlsx",
    "sheetName": "Data Sheet"
  }
}
```

### `sheetNumber`

> [!NOTE]
> Supported formats: **xlsx**, **ods**

It `MUST` be an integer with default value `1`. This property specifies a sheet number of a table in the spreadsheet file.

For example:

```json
{
  "format": {
    "name": "xlsx",
    "sheetNumber": 2
  }
}
```

This reads the second sheet from the spreadsheet.

### `tableName`

> [!NOTE]
> Supported formats: **sqlite**

It `MUST` be a string. This property specifies a name of the table in the database.

For example:

```json
{
  "format": {
    "name": "sqlite",
    "tableName": "measurements"
  }
}
```

## Common

Common properties shared by multiple entities in the dataset descriptor.

### Path

It `MUST` be is a string representing a file location. It `MUST` be one of the following:

- [Internal Path](#internal-path)
- [External Path](#external-path)

### Internal Path

It `MUST` be a string representing a relative path, using Unix-style forward slashes (`/`) as path separators. The path is resolved relative to the location of the dataset descriptor file. Unix-style paths `MUST` be converted to the appropriate platform-specific format when accessing files (e.g., converting `/` to `\` on Windows).

Internal path `MUST` point to a file in the same directory as the descriptor file or in a subdirectory of it. Files outside of the descriptor directory are not supported.

The path `MUST NOT` contain any of the following:

- Absolute path indicators (starting with `/` or `~`)
- Directory traversal sequences (`..`)
- Windows-style backslashes (`\`) - only forward slashes (`/`) are allowed as separators
- Windows drive letters (`C:`, `D:`, etc.)
- URI schemes (`://`)

The path `MAY` contain unicode characters, spaces, and special characters in file and directory names.

For example:

```json
{
  "data": "measurements.csv"
}
```

For example with subdirectories:

```json
{
  "data": "data/experiments/results-2024.json"
}
```

For example with unicode and special characters:

```json
{
  "data": "données/résultats (final).csv"
}
```

### External Path

It `MUST` be a string representing an HTTP or HTTPS URL to a remote file.

For example:

```json
{
  "data": "https://example.com/datasets/measurements.csv"
}
```

## Extension

> [!TIP]
> Additional properties are allowed.

Fairspec Dataset has a simple yet powerful extension mechanism based on the JSONSchema standard. An extension is a domain-specific Fairspec Dataset flavour that enriches the standard with additional metadata properties and validation rules.

### Creation

A custom JSONSchema can be provided as a `$schema` property in the dataset descriptor. The profile instructs to validate the descriptor using JSON Schema rules defined by the extension. The extension's schema `MUST` include base Fairspec Dataset schema in the root `allOf` property.

Using JSON Schema features with custom profiles allows you to:

- Add new domain-specific properties
- Require existing properties to meet specific requirements
- Define expected resource types and their schemas
- Combine existing profiles as part of a high-level extension

### Example

For example, a Spectroscopy Fairspec extension that requires spectral metadata:

```json
{
  "$schema": "https://fairspec.org/schemas/1.0.0/spectroscopy.dataset.json",
  "resources": [
    {
      "data": "spectrum.csv",
      "spectralRange": {
        "min": 400,
        "max": 4000,
        "unit": "cm-1"
      }
    }
  ]
}
```

The extension profile would include the base Fairspec Dataset schema and add domain-specific requirements:

```json
{
  "$schema": "http://json-schema.org/draft/2020-12/schema",
  "title": "Spectroscopy Faispec",
  "allOf": [
    { "$ref": "https://fairspec.org/schemas/1.0.0/fairspec.dataset.json" },
    { "$ref": "#/$defs/spectroscopyMixin" }
  ],
  "$defs": {
    "spectroscopyMixin": {
      "type": "object",
      "properties": {
        "resources": {
          "type": "array",
          "items": {
            "properties": {
              "spectralRange": {
                "type": "object",
                "required": ["min", "max", "unit"],
                "properties": {
                  "min": { "type": "number" },
                  "max": { "type": "number" },
                  "unit": { "type": "string" }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

## Comparison

> [!NOTE]
> This section is under development.

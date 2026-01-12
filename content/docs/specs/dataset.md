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
      <a href="https://fairspec.org/profiles/{version}/dataset.json">https://fairspec.org/profiles/{version}/dataset.json</a>
    </td>
  </tr>
</table>

Fairspec Dataset is a simple JSON based format that allows to describe a single dataset and its resources. It is compatible with DataCite for metadata and JSONSchema for structured data.

## Language

The key words `MUST`, `MUST NOT`, `REQUIRED`, `SHALL`, `SHALL NOT`, `SHOULD`, `SHOULD NOT`, `RECOMMENDED`, `MAY`, and `OPTIONAL` in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).

## Descriptor

> [!NOTE]
> If applicable, a data publisher `SHOULD` name the descriptor `dataset.json` and place it in the root of a dataset directory when sharing the dataset publicly.

A Fairspec Dataset is a [JSON](https://json.org/) resource that `MUST` be an object compatible with the [Dataset](#dataset) structure outlined below.

## Dataset

A top-level descriptor object describing an individual dataset. It `MUST` have the following properties (all optional unless otherwise stated):

### `$schema` {#profile}

> [!NOTE]
> The default value is `https://fairspec.org/profiles/latest/dataset.json`. A data publisher `SHOULD` provide this property with an exact version when sharing a standalone descriptor publicly.

[External Path](#external-path) to one of the officially published Fairspec Dataset profiles or to a Fairspec Dataset [Extension](#extension) profile.


For example for version X.Y.Z of the schema:

```json
{
  "$schema": "https://fairspec.org/profiles/X.Y.Z/dataset.json"
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

For multiple resources:

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
    },
    {
      "data": "https://example.com/file2.json",
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

### `name`

An optional name for the resource. It `MUST` be a string consisting of alphanumeric characters and underscores. If provided, it can be used to reference resource within a dataset context. For example, a name of the resource is used in [Foreign Keys](../table#foreign-keys) specified in [Fairspec Table](../table).

### `data` {#data}

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

The format definition of the file. It `MUST` be a [Format](#format). For multipart files the `format` property defines the format for all the files.

For example, for a file with CSV format:

```json
{
  "format": {
    "name": "csv",
    "delimiter": ";"
  }
}
```

### `textual`

A boolean indicating whether the file is text-based. When `true`, the file `MUST` be `utf-8` encoded.

For example:

```json
{
  "data": "document.md",
  "textual": true
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

### `dataSchema`

It `MUST` be a [Path](#path) to a JSON Schema or an object with the JSON Schema. The JSON Schema `MUST` be compatible with the [JSONSchema Draft 2020-12](https://json-schema.org/draft/2020-12) specification. If present, [Data](#data) `MUST` be a JSON document that is compatible with the provided schema.

For example as an external path:

```json
{
  "dataSchema": "https://example.com/schema.json"
}
```

For example as an object:

```json
{
  "dataSchema": {
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

### `tableSchema`

It `MUST` be a [Path](#path) to a Table Schema or an object with the Table Schema. The Table Schema `MUST` be compatible with the [Fairspec Table](../table) specification. If present, [Data](#data) `MUST` be a table that is compatible with the provided schema.

For example as an external path:

```json
{
  "tableSchema": "https://example.com/schema.json"
}
```

For example as an object:

```json
{
  "tableSchema": {
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

Format specifies the features of all the data files in the resource. The schema is routed based on the [`type`](#type) property to determine which specific format applies.

### Format Types

#### CSV

A format for comma-separated values files. It `MUST` have [`type`](#type) set to `"csv"`. It `MUST` be `utf-8` encoded.

Metadata example:

```json
{
  "format": {
    "type": "csv"
  }
}
```

Data example:
```csv
name,age,city
Alice,30,New York
Bob,25,London
Charlie,35,Tokyo
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`delimiter`](#delimiter)
- [`lineTerminator`](#lineterminator)
- [`quoteChar`](#quotechar)
- [`nullSequence`](#nullsequence)
- [`headerRows`](#headerrows)
- [`headerJoin`](#headerjoin)
- [`commentRows`](#commentrows)
- [`commentChar`](#commentchar)
- [`columnNames`](#columnnames)

#### TSV

A format for tab-separated values files. It `MUST` have [`type`](#type) set to `"tsv"`. It `MUST` be `utf-8` encoded.

Metadata example:

```json
{
  "format": {
    "type": "tsv"
  }
}
```

Data example:
```tsv
name	age	city
Alice	30	New York
Bob	25	London
Charlie	35	Tokyo
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`lineTerminator`](#lineterminator)
- [`nullSequence`](#nullsequence)
- [`headerRows`](#headerrows)
- [`headerJoin`](#headerjoin)
- [`commentRows`](#commentrows)
- [`commentChar`](#commentchar)
- [`columnNames`](#columnnames)

#### JSON

A format for JSON array files. It `MUST` have [`type`](#type) set to `"json"`.

Metadata example:

```json
{
  "format": {
    "type": "json"
  }
}
```

Data example:
```json
[
  {"name": "Alice", "age": 30, "city": "New York"},
  {"name": "Bob", "age": 25, "city": "London"},
  {"name": "Charlie", "age": 35, "city": "Tokyo"}
]
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`headerRows`](#headerrows)
- [`headerJoin`](#headerjoin)
- [`commentRows`](#commentrows)
- [`commentChar`](#commentchar)
- [`columnNames`](#columnnames)
- [`jsonPointer`](#jsonpointer)
- [`rowType`](#rowtype)

#### JSONL

A format for JSON Lines files (newline-delimited JSON). It `MUST` have [`type`](#type) set to `"jsonl"`.

Metadata example:

```json
{
  "format": {
    "type": "jsonl"
  }
}
```

Data example:
```jsonl
{"name": "Alice", "age": 30, "city": "New York"}
{"name": "Bob", "age": 25, "city": "London"}
{"name": "Charlie", "age": 35, "city": "Tokyo"}
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`headerRows`](#headerrows)
- [`headerJoin`](#headerjoin)
- [`commentRows`](#commentrows)
- [`commentChar`](#commentchar)
- [`columnNames`](#columnnames)
- [`rowType`](#rowtype)

#### XLSX

A format for Microsoft Excel files. It `MUST` have [`type`](#type) set to `"xlsx"`.

Metadata example:

```json
{
  "format": {
    "type": "xlsx"
  }
}
```

Data example:

```
<binary data>
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`headerRows`](#headerrows)
- [`headerJoin`](#headerjoin)
- [`commentRows`](#commentrows)
- [`commentChar`](#commentchar)
- [`columnNames`](#columnnames)
- [`sheetName`](#sheetname)
- [`sheetNumber`](#sheetnumber)

#### ODS

A format for OpenDocument Spreadsheet files. It `MUST` have [`type`](#type) set to `"ods"`.

Metadata example:

```json
{
  "format": {
    "type": "ods"
  }
}
```

Data example:

```
<binary data>
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`headerRows`](#headerrows)
- [`headerJoin`](#headerjoin)
- [`commentRows`](#commentrows)
- [`commentChar`](#commentchar)
- [`columnNames`](#columnnames)
- [`sheetName`](#sheetname)
- [`sheetNumber`](#sheetnumber)

#### SQLite

A format for SQLite database files. It `MUST` have [`type`](#type) set to `"sqlite"`.

Metadata example:

```json
{
  "format": {
    "type": "sqlite"
  }
}
```

Data example:

```
<binary data>
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`tableName`](#tablename)

#### Parquet

A format for Apache Parquet files. It `MUST` have [`type`](#type) set to `"parquet"`.

Metadata example:

```json
{
  "format": {
    "type": "parquet"
  }
}
```

Data example:

```
<binary data>
```

Supported properties:
- [`title`](#title)
- [`description`](#description)

#### Arrow

A format for Apache Arrow files. It `MUST` have [`type`](#type) set to `"arrow"`.

Metadata example:

```json
{
  "format": {
    "type": "arrow"
  }
}
```

Data example:

```
<binary data>
```

Supported properties:
- [`title`](#title)
- [`description`](#description)

#### Custom

A format for custom data. It `MUST` have [`type`](#type) omitted.

Metadata example:

```json
{
  "format": {
    "title": "Custom format",
    "description": "Custom format description"
  }
}
```

Data example:

```
<binary data>
```

Supported properties:
- [`title`](#title)
- [`description`](#description)

### Format Properties

#### `type`

> [!NOTE]
> Supported formats: **all format types**

The type of the format. It `MUST` be one of the following values (if omitted, the format type is custom):

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
    "type": "csv"
  }
}
```

#### `title`

> [!NOTE]
> Supported formats: **all format types**

An optional human-readable title for the format.

For example:

```json
{
  "format": {
    "title": "My custom format"
  }
}
```

#### `description`

> [!NOTE]
> Supported formats: **all format types**

An optional detailed description of the format.

For example:

```json
{
  "format": {
    "title": "My custom format",
    "description": "You can open this file with OpenOffice"
  }
}
```

#### `delimiter`

> [!NOTE]
> Supported formats: **csv**

It `MUST` be a string of one character length with default value `,` (comma). This property specifies the character sequence which separates fields in the data file.

For example:

```json
{
  "format": {
    "type": "csv",
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

#### `lineTerminator`

> [!NOTE]
> Supported formats: **csv**, **tsv**

It `MUST` be a string. This property specifies the character sequence which terminates rows in the file. Common values are `\n` (Unix), `\r\n` (Windows), `\r` (old Mac).

For example:

```json
{
  "format": {
    "type": "csv",
    "lineTerminator": "\r\n"
  }
}
```

#### `quoteChar`

> [!NOTE]
> Supported formats: **csv**

It `MUST` be a string of one character length with default value `"` (double quote). This property specifies a character to use for quoting in case the delimiter needs to be used inside a data cell.

For example:

```json
{
  "format": {
    "type": "csv",
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

#### `nullSequence`

> [!NOTE]
> Supported formats: **csv**, **tsv**

It `MUST` be a string or an array of strings. This property specifies the null sequence representing missing values in the data.

For example with a single sequence:

```json
{
  "format": {
    "type": "csv",
    "nullSequence": "NA"
  }
}
```

For example with multiple sequences:

```json
{
  "format": {
    "type": "csv",
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

#### `headerRows`

> [!NOTE]
> Supported formats: **csv**, **tsv**, **json**, **jsonl**, **xlsx**, **ods**

It `MUST` be `false` or an array of positive integers starting from `1`. This property specifies the row numbers for the header. It `SHOULD` to be used for multiline-header files.

For example with a single header row:

```json
{
  "format": {
    "type": "csv",
    "headerRows": [1]
  }
}
```

For example with multi-line headers:

```json
{
  "format": {
    "type": "csv",
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
    "type": "csv",
    "headerRows": false
  }
}
```

#### `headerJoin`

> [!NOTE]
> Supported formats: **csv**, **tsv**, **json**, **jsonl**, **xlsx**, **ods**

It `MUST` be a string with default value `" "` (space). This property specifies how multiline-header files have to join the resulting header rows.

For example:

```json
{
  "format": {
    "type": "csv",
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

#### `commentRows`

> [!NOTE]
> Supported formats: **csv**, **tsv**, **json**, **jsonl**, **xlsx**, **ods**

It `MUST` be an array of positive integers starting from `1`. This property specifies what rows have to be omitted from the data.

For example:

```json
{
  "format": {
    "type": "csv",
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

#### `commentChar`

> [!NOTE]
> Supported formats: **csv**, **tsv**, **json**, **jsonl**, **xlsx**, **ods**

It `MUST` be a string of one character length with default value `#`. This property specifies what rows have to be omitted from the data based on the row's first characters.

For example:

```json
{
  "format": {
    "type": "csv",
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

#### `columnNames`

> [!NOTE]
> Supported formats: **csv**, **tsv**, **json**, **jsonl**, **xlsx**, **ods**

It `MUST` be an array of strings. This property specifies explicit column names to use instead of deriving them from the file.

For example:

```json
{
  "format": {
    "type": "csv",
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

#### `jsonPointer`

> [!NOTE]
> Supported formats: **json**

It `MUST` be a string in [JSON Pointer format (RFC 6901)](https://datatracker.ietf.org/doc/html/rfc6901). This property specifies where a data is located in the document.

For example:

```json
{
  "format": {
    "type": "json",
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

#### `rowType`

> [!NOTE]
> Supported formats: **json**, **jsonl**

It `MUST` be one of the following values: `array`, `object`. This property specifies whether the data items are arrays or objects.

For example with array of objects:

```json
{
  "format": {
    "type": "json",
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
    "type": "json",
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

#### `sheetName`

> [!NOTE]
> Supported formats: **xlsx**, **ods**

It `MUST` be a string. This property specifies a sheet name of a table in the spreadsheet file.

For example:

```json
{
  "format": {
    "type": "xlsx",
    "sheetName": "Data Sheet"
  }
}
```

#### `sheetNumber`

> [!NOTE]
> Supported formats: **xlsx**, **ods**

It `MUST` be an integer with default value `1`. This property specifies a sheet number of a table in the spreadsheet file.

For example:

```json
{
  "format": {
    "type": "xlsx",
    "sheetNumber": 2
  }
}
```

This reads the second sheet from the spreadsheet.

#### `tableName`

> [!NOTE]
> Supported formats: **sqlite**

It `MUST` be a string. This property specifies a name of the table in the database.

For example:

```json
{
  "format": {
    "type": "sqlite",
    "tableName": "measurements"
  }
}
```
## Common

Common properties shared by multiple entities in the descriptor.

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

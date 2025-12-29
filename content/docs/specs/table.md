---
title: Fairspec Table
sidebar:
  label: Table
---

<table>
  <tr>
    <th>Authors</th>
    <td>Evgeny Karev</td>
  </tr>
  <tr>
    <th>Schema</th>
    <td>
      <a href="https://fairspec.org/schemas/{version}/fairspec.table.json">https://fairspec.org/schemas/{version}/fairspec.table.json</a>
    </td>
  </tr>
</table>

Fairspec Table is a simple JSON based format that defines a table schema to describe a class of tabular data resources.

## Language

The key words `MUST`, `MUST NOT`, `REQUIRED`, `SHALL`, `SHALL NOT`, `SHOULD`, `SHOULD NOT`, `RECOMMENDED`, `MAY`, and `OPTIONAL` in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).

## Descriptor

A Fairspec Table is a [JSON](https://json.org/) resource that `MUST` be an object compatible with the [Table Schema](#table-schema) structure outlined below.

## Table Schema

A top-level descriptor object defining a schema of tabular data resources. It `MUST` have the following properties (all optional unless otherwise stated):

### `$schema` [required] {#metaSchema}

URI to one of the officially published Fairspec Table schemas. It `MUST` ends with the `fairspec.table.json` prefix.

For example for version X.Y.Z of the schema:

```json
{
  "$schema": "https://fairspec.org/schemas/X.Y.Z/fairspec.table.json"
}
```

### `required`

An optional list of column names that `MUST` be present in the table. Each item `MUST` be a string matching a key in the [`properties`](#properties) object.

For example, to require specific columns:

```json
{
  "required": ["experiment_id", "temperature", "pressure"],
  "properties": {
    "experiment_id": {
      "type": "integer"
    },
    "temperature": {
      "type": "number"
    },
    "pressure": {
      "type": "number"
    },
    "notes": {
      "type": "string"
    }
  }
}
```

### `properties`

An object defining the schema for table columns. Each key represents a column name, and its value `MUST` be a valid [Column](#column) definition.

For example, for a simple table with different column types:

```json
{
  "properties": {
    "id": {
      "type": "integer",
      "minimum": 1
    },
    "name": {
      "type": "string",
      "maxLength": 100
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "active": {
      "type": "boolean"
    }
  }
}
```

### `primaryKey`

An optional array of column names that form the table's primary key. The combination of values in these columns `MUST` uniquely identify each row. At least one column name `MUST` be specified if this property is present.

For example, with a single-column primary key:

```json
{
  "primaryKey": ["experiment_id"],
  "properties": {
    "experiment_id": {
      "type": "integer"
    },
    "measurement": {
      "type": "number"
    }
  }
}
```

For example, with a composite primary key:

```json
{
  "primaryKey": ["sample_id", "timestamp"],
  "properties": {
    "sample_id": {
      "type": "string"
    },
    "timestamp": {
      "type": "string",
      "format": "date-time"
    },
    "value": {
      "type": "number"
    }
  }
}
```

### `uniqueKeys`

An optional array of unique key constraints. Each unique key is an array of column names whose combined values `MUST` be unique across all rows in the table. Each unique key array `MUST` contain at least one column name.

For example, with multiple unique constraints:

```json
{
  "uniqueKeys": [
    ["email"],
    ["username"],
    ["department", "employee_number"]
  ],
  "properties": {
    "email": {
      "type": "string",
      "format": "email"
    },
    "username": {
      "type": "string"
    },
    "department": {
      "type": "string"
    },
    "employee_number": {
      "type": "integer"
    }
  }
}
```

### `foreignKeys`

An optional array of foreign key constraints that define relationships between this table and other tables. Each foreign key specifies local `columns` and their `reference` to columns in another resource (identified by resource [`name`](../dataset#name) in the dataset context).

For example, referencing another resource:

```json
{
  "foreignKeys": [
    {
      "columns": ["customer_id"],
      "reference": {
        "resource": "customers",
        "columns": ["id"]
      }
    }
  ],
  "properties": {
    "order_id": {
      "type": "integer"
    },
    "customer_id": {
      "type": "integer"
    },
    "amount": {
      "type": "number"
    }
  }
}
```

For example, with a self-reference (omitting `resource`):

```json
{
  "foreignKeys": [
    {
      "columns": ["parent_id"],
      "reference": {
        "columns": ["id"]
      }
    }
  ],
  "properties": {
    "id": {
      "type": "integer"
    },
    "parent_id": {
      "type": "integer"
    },
    "name": {
      "type": "string"
    }
  }
}
```

For example, with a composite foreign key:

```json
{
  "foreignKeys": [
    {
      "columns": ["supplier_id", "product_code"],
      "reference": {
        "resource": "catalog",
        "columns": ["supplier_id", "code"]
      }
    }
  ]
}
```

### `missingValues`

An optional list of values that represent missing or null data across all columns in the table. Each item can be either a simple value (string, integer, number, or boolean) or an object with `value` and optional `label` properties for documentation purposes.

For example, with simple values:

```json
{
  "missingValues": ["NA", "N/A", "", -999]
}
```

For example, with labeled values:

```json
{
  "missingValues": [
    { "value": "NA", "label": "Not Available" },
    { "value": "NR", "label": "Not Recorded" },
    { "value": -999, "label": "Sensor Error" }
  ]
}
```

## Column

A column definition that specifies the data type, constraints, and metadata for a table column. The schema is routed based on the [`type`](#type) property and optionally the [`format`](#format) property to determine which specific column type applies.

### Column Types

#### String

A column for text values. It `MUST` have [`type`](#type) set to `"string"` and `MUST NOT` have a [`format`](#format) property.

Schema example:

```json
{
  "properties": {
    "name": {
      "type": "string"
    }
  }
}
```

Data example:
```csv
name
Alice
Bob
Charlie
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`enum`](#enum)
- [`pattern`](#pattern)
- [`minLength`](#minlength)
- [`maxLength`](#maxlength)
- [`categories`](#categories)
- [`missingValues`](#missingvalues)

#### Integer

A column for whole number values. It `MUST` have [`type`](#type) set to `"integer"` and `MUST NOT` have a [`format`](#format) property.

Schema example:

```json
{
  "properties": {
    "age": {
      "type": "integer"
    }
  }
}
```

Data example:
```csv
age
25
32
18
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`enum`](#enum)
- [`minimum`](#minimum)
- [`maximum`](#maximum)
- [`exclusiveMinimum`](#exclusiveminimum)
- [`exclusiveMaximum`](#exclusivemaximum)
- [`multipleOf`](#multipleof)
- [`categories`](#categories)
- [`missingValues`](#missingvalues)
- [`groupChar`](#groupchar)
- [`withText`](#withtext)

#### Number

A column for numeric values including decimals. It `MUST` have [`type`](#type) set to `"number"` and `MUST NOT` have a [`format`](#format) property.

Schema example:

```json
{
  "properties": {
    "temperature": {
      "type": "number"
    }
  }
}
```

Data example:
```csv
temperature
23.5
-10.2
98.6
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`enum`](#enum)
- [`minimum`](#minimum)
- [`maximum`](#maximum)
- [`exclusiveMinimum`](#exclusiveminimum)
- [`exclusiveMaximum`](#exclusivemaximum)
- [`multipleOf`](#multipleof)
- [`missingValues`](#missingvalues)
- [`decimalChar`](#decimalchar)
- [`groupChar`](#groupchar)
- [`withText`](#withtext)

#### Boolean

A column for true/false values. It `MUST` have [`type`](#type) set to `"boolean"` and `MUST NOT` have a [`format`](#format) property.

Schema example:

```json
{
  "properties": {
    "is_active": {
      "type": "boolean"
    }
  }
}
```

Data example:
```csv
is_active
true
false
true
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`enum`](#enum)
- [`missingValues`](#missingvalues)
- [`trueValues`](#truevalues)
- [`falseValues`](#falsevalues)

#### Array

A column for array/list values. It `MUST` have [`type`](#type) set to `"array"` and `MUST NOT` have a [`format`](#format) property.

Schema example:

```json
{
  "properties": {
    "coordinates": {
      "type": "array"
    }
  }
}
```

Data example:
```csv
coordinates
"[1.5, 2.3]"
"[10, 20, 30]"
"[-5.2, 8.9, 12.1]"
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`missingValues`](#missingvalues)
- [`<jsonSchema>`](#jsonSchema)

#### Object

A column for object/dictionary values. It `MUST` have [`type`](#type) set to `"object"` and `MUST NOT` have a [`format`](#format) property.

Schema example:

```json
{
  "properties": {
    "metadata": {
      "type": "object"
    }
  }
}
```

Data example:
```csv
metadata
"{""author"": ""John"", ""version"": 1}"
"{""author"": ""Jane"", ""version"": 2}"
"{""author"": ""Bob"", ""version"": 1}"
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`missingValues`](#missingvalues)
- [`<jsonSchema>`](#jsonSchema)

#### List

A column for delimited list values stored as strings. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"list"`.

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`enum`](#enum)
- [`pattern`](#pattern)
- [`minLength`](#minlength)
- [`maxLength`](#maxlength)
- [`categories`](#categories)
- [`missingValues`](#missingvalues)
- [`delimiter`](#delimiter)
- [`itemType`](#itemtype)

Schema example:

```json
{
  "properties": {
    "tags": {
      "type": "string",
      "format": "list"
    }
  }
}
```

Data example:
```csv
tags
"red,blue,green"
"small,compact"
"new,sale,featured"
```

#### Base64

A column for Base64 encoded binary data. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"base64"`.

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`enum`](#enum)
- [`pattern`](#pattern)
- [`minLength`](#minlength)
- [`maxLength`](#maxlength)
- [`categories`](#categories)
- [`missingValues`](#missingvalues)

Schema example:

```json
{
  "properties": {
    "thumbnail": {
      "type": "string",
      "format": "base64"
    }
  }
}
```

Data example:
```csv
thumbnail
iVBORw0KGgoAAAANSUhEUgAAAAUA
R0lGODlhAQABAIAAAAAAAP///yH5
aGVsbG8gd29ybGQ=
```

#### Hex

A column for hexadecimal encoded data. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"hex"`.

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`enum`](#enum)
- [`pattern`](#pattern)
- [`minLength`](#minlength)
- [`maxLength`](#maxlength)
- [`categories`](#categories)
- [`missingValues`](#missingvalues)

Schema example:

```json
{
  "properties": {
    "color": {
      "type": "string",
      "format": "hex"
    }
  }
}
```

Data example:
```csv
color
FF5733
00BFFF
32CD32
```

#### Email

A column for email addresses. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"email"`.

Schema example:

```json
{
  "properties": {
    "contact_email": {
      "type": "string",
      "format": "email"
    }
  }
}
```

Data example:
```csv
contact_email
alice@example.com
bob@company.org
charlie@domain.net
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`enum`](#enum)
- [`pattern`](#pattern)
- [`minLength`](#minlength)
- [`maxLength`](#maxlength)
- [`categories`](#categories)
- [`missingValues`](#missingvalues)

#### UUID

A column for UUID identifiers. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"uuid"`.

Schema example:

```json
{
  "properties": {
    "id": {
      "type": "string",
      "format": "uuid"
    }
  }
}
```

Data example:
```csv
id
550e8400-e29b-41d4-a716-446655440000
6ba7b810-9dad-11d1-80b4-00c04fd430c8
f47ac10b-58cc-4372-a567-0e02b2c3d479
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`enum`](#enum)
- [`pattern`](#pattern)
- [`minLength`](#minlength)
- [`maxLength`](#maxlength)
- [`categories`](#categories)
- [`missingValues`](#missingvalues)

#### URL

A column for URLs/URIs. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"url"`.

Schema example:

```json
{
  "properties": {
    "homepage": {
      "type": "string",
      "format": "url"
    }
  }
}
```

Data example:
```csv
homepage
https://example.com
https://example.org/page
https://domain.net/path/to/resource
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`enum`](#enum)
- [`pattern`](#pattern)
- [`minLength`](#minlength)
- [`maxLength`](#maxlength)
- [`categories`](#categories)
- [`missingValues`](#missingvalues)

#### Datetime

A column for ISO 8601 datetime values. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"date-time"`.

Schema example:

```json
{
  "properties": {
    "created_at": {
      "type": "string",
      "format": "date-time"
    }
  }
}
```

Data example:
```csv
created_at
2023-12-01T14:30:00Z
2024-01-15T09:45:30+00:00
2024-03-20T18:00:00-05:00
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`enum`](#enum)
- [`pattern`](#pattern)
- [`minLength`](#minlength)
- [`maxLength`](#maxlength)
- [`categories`](#categories)
- [`missingValues`](#missingvalues)
- [`temporalFormat`](#temporalformat)

#### Date

A column for ISO 8601 date values. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"date"`.

Schema example:

```json
{
  "properties": {
    "birth_date": {
      "type": "string",
      "format": "date"
    }
  }
}
```

Data example:
```csv
birth_date
2023-12-01
1990-06-15
2005-03-20
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`enum`](#enum)
- [`pattern`](#pattern)
- [`minLength`](#minlength)
- [`maxLength`](#maxlength)
- [`categories`](#categories)
- [`missingValues`](#missingvalues)
- [`temporalFormat`](#temporalformat)

#### Time

A column for ISO 8601 time values. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"time"`.

Schema example:

```json
{
  "properties": {
    "start_time": {
      "type": "string",
      "format": "time"
    }
  }
}
```

Data example:
```csv
start_time
14:30:00
09:45:30
18:00:00
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`enum`](#enum)
- [`pattern`](#pattern)
- [`minLength`](#minlength)
- [`maxLength`](#maxlength)
- [`categories`](#categories)
- [`missingValues`](#missingvalues)
- [`temporalFormat`](#temporalformat)

#### Duration

A column for ISO 8601 duration values. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"duration"`.

Schema example:

```json
{
  "properties": {
    "elapsed_time": {
      "type": "string",
      "format": "duration"
    }
  }
}
```

Data example:
```csv
elapsed_time
PT1H30M
P1DT12H
PT45M30S
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`enum`](#enum)
- [`pattern`](#pattern)
- [`minLength`](#minlength)
- [`maxLength`](#maxlength)
- [`categories`](#categories)
- [`missingValues`](#missingvalues)

#### WKT

A column for Well-Known Text (WKT) geometry data. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"wkt"`.

Schema example:

```json
{
  "properties": {
    "geometry": {
      "type": "string",
      "format": "wkt"
    }
  }
}
```

Data example:
```csv
geometry
"POINT (30 10)"
"LINESTRING (30 10, 10 30, 40 40)"
"POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))"
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`enum`](#enum)
- [`pattern`](#pattern)
- [`minLength`](#minlength)
- [`maxLength`](#maxlength)
- [`categories`](#categories)
- [`missingValues`](#missingvalues)

#### WKB

A column for Well-Known Binary (WKB) geometry data. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"wkb"`.

Schema example:

```json
{
  "properties": {
    "geometry": {
      "type": "string",
      "format": "wkb"
    }
  }
}
```

Data example:
```csv
geometry
0101000000000000000000000000000000000024400000000000003E40
0102000000030000000000000000003E400000000000002440
0103000000010000000500000000000000000024400000000000003E40
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`enum`](#enum)
- [`pattern`](#pattern)
- [`minLength`](#minlength)
- [`maxLength`](#maxlength)
- [`categories`](#categories)
- [`missingValues`](#missingvalues)

#### Year

A column for year values. It `MUST` have [`type`](#type) set to `"integer"` and [`format`](#format) set to `"year"`.

Schema example:

```json
{
  "properties": {
    "publication_year": {
      "type": "integer",
      "format": "year"
    }
  }
}
```

Data example:
```csv
publication_year
2023
2024
1999
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`enum`](#enum)
- [`minimum`](#minimum)
- [`maximum`](#maximum)
- [`exclusiveMinimum`](#exclusiveminimum)
- [`exclusiveMaximum`](#exclusivemaximum)
- [`multipleOf`](#multipleof)
- [`categories`](#categories)
- [`missingValues`](#missingvalues)
- [`groupChar`](#groupchar)
- [`withText`](#withtext)

#### GeoJSON

A column for GeoJSON geometry objects. It `MUST` have [`type`](#type) set to `"object"` and [`format`](#format) set to `"geojson"`.

Schema example:

```json
{
  "properties": {
    "location": {
      "type": "object",
      "format": "geojson"
    }
  }
}
```

Data example:
```csv
location
"{""type"": ""Point"", ""coordinates"": [30, 10]}"
"{""type"": ""LineString"", ""coordinates"": [[30, 10], [10, 30], [40, 40]]}"
"{""type"": ""Polygon"", ""coordinates"": [[[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]]}"
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`missingValues`](#missingvalues)
- [`<jsonSchema>`](#jsonSchema)

#### TopoJSON

A column for TopoJSON geometry objects. It `MUST` have [`type`](#type) set to `"object"` and [`format`](#format) set to `"topojson"`.

Schema example:

```json
{
  "properties": {
    "topology": {
      "type": "object",
      "format": "topojson"
    }
  }
}
```

Data example:
```csv
topology
"{""type"": ""Topology"", ""objects"": {""example"": {""type"": ""Point"", ""coordinates"": [0, 0]}}}"
"{""type"": ""Topology"", ""arcs"": [[[0, 0], [1, 1]]], ""objects"": {""line"": {""type"": ""LineString"", ""arcs"": [0]}}}"
"{""type"": ""Topology"", ""objects"": {""polygon"": {""type"": ""Polygon"", ""arcs"": [[0]]}}}"
```

Supported properties:
- [`title`](#title)
- [`description`](#description)
- [`missingValues`](#missingvalues)
- [`<jsonSchema>`](#jsonSchema)

### Column Properties

#### `type` [required]

> [!NOTE]
> Supported columns: **all column types**

The data type of the column. It `MUST` be one of the following values:

- `string` - Text values
- `integer` - Whole numbers
- `number` - Numeric values including decimals
- `boolean` - True/false values
- `array` - Array/list values
- `object` - Object/dictionary values

Schema example:

```json
{
  "properties": {
    "age": {
      "type": "integer"
    }
  }
}
```

#### `format`

> [!NOTE]
> Supported columns: **List**, **Base64**, **Hex**, **Email**, **UUID**, **URL**, **Datetime**, **Date**, **Time**, **Duration**, **WKT**, **WKB**, **Year**, **GeoJSON**, **TopoJSON**

An optional format qualifier that specifies a more specific subtype of the base type.

Schema example:

```json
{
  "properties": {
    "email": {
      "type": "string",
      "format": "email"
    }
  }
}
```

#### `title`

> [!NOTE]
> Supported columns: **all column types**

An optional human-readable title for the column. It `MUST` be a string.

Schema example:

```json
{
  "properties": {
    "temp_c": {
      "type": "number",
      "title": "Temperature (Celsius)"
    }
  }
}
```

#### `description`

> [!NOTE]
> Supported columns: **all column types**

An optional detailed description of the column. It `MUST` be a string.

Schema example:

```json
{
  "properties": {
    "pressure": {
      "type": "number",
      "description": "Atmospheric pressure measured in hectopascals (hPa) at the time of observation."
    }
  }
}
```

#### `enum`

> [!NOTE]
> Supported columns: **String**, **Integer**, **Number**, **Boolean**, **List**, **Base64**, **Hex**, **Email**, **UUID**, **URL**, **Datetime**, **Date**, **Time**, **Duration**, **WKT**, **WKB**, **Year**

An optional array of allowed values for the column. The values `MUST` match the column's type.

For example, with string values:

```json
{
  "properties": {
    "status": {
      "type": "string",
      "enum": ["pending", "active", "completed", "cancelled"]
    }
  }
}
```

For example, with integer values:

```json
{
  "properties": {
    "priority": {
      "type": "integer",
      "enum": [1, 2, 3, 4, 5]
    }
  }
}
```

#### `pattern`

> [!NOTE]
> Supported columns: **String**, **List**, **Base64**, **Hex**, **Email**, **UUID**, **URL**, **Datetime**, **Date**, **Time**, **Duration**, **WKT**, **WKB**

An optional regular expression pattern that values `MUST` match. It `MUST` be a valid regex string.

Schema example:

```json
{
  "properties": {
    "product_code": {
      "type": "string",
      "pattern": "^[A-Z]{3}-[0-9]{4}$"
    }
  }
}
```

#### `minLength`

> [!NOTE]
> Supported columns: **String**, **List**, **Base64**, **Hex**, **Email**, **UUID**, **URL**, **Datetime**, **Date**, **Time**, **Duration**, **WKT**, **WKB**

An optional minimum length constraint for string values. It `MUST` be a non-negative integer.

Schema example:

```json
{
  "properties": {
    "username": {
      "type": "string",
      "minLength": 3
    }
  }
}
```

#### `maxLength`

> [!NOTE]
> Supported columns: **String**, **List**, **Base64**, **Hex**, **Email**, **UUID**, **URL**, **Datetime**, **Date**, **Time**, **Duration**, **WKT**, **WKB**

An optional maximum length constraint for string values. It `MUST` be a non-negative integer.

Schema example:

```json
{
  "properties": {
    "username": {
      "type": "string",
      "maxLength": 20
    }
  }
}
```

#### `minimum`

> [!NOTE]
> Supported columns: **Integer**, **Number**, **Year**

An optional minimum value constraint (inclusive). The type `MUST` match the column type.

Schema example:

```json
{
  "properties": {
    "temperature": {
      "type": "number",
      "minimum": -273.15
    }
  }
}
```

#### `maximum`

> [!NOTE]
> Supported columns: **Integer**, **Number**, **Year**

An optional maximum value constraint (inclusive). The type `MUST` match the column type.

Schema example:

```json
{
  "properties": {
    "temperature": {
      "type": "number",
      "maximum": 1000
    }
  }
}
```

#### `exclusiveMinimum`

> [!NOTE]
> Supported columns: **Integer**, **Number**, **Year**

An optional minimum value constraint (exclusive). The type `MUST` match the column type.

Schema example:

```json
{
  "properties": {
    "probability": {
      "type": "number",
      "exclusiveMinimum": 0
    }
  }
}
```

#### `exclusiveMaximum`

> [!NOTE]
> Supported columns: **Integer**, **Number**, **Year**

An optional maximum value constraint (exclusive). The type `MUST` match the column type.

Schema example:

```json
{
  "properties": {
    "probability": {
      "type": "number",
      "exclusiveMaximum": 1
    }
  }
}
```

#### `multipleOf`

> [!NOTE]
> Supported columns: **Integer**, **Number**, **Year**

An optional constraint that values `MUST` be a multiple of this number. For integers, it `MUST` be a positive integer. For numbers, it `MUST` be a positive number.

Schema example:

```json
{
  "properties": {
    "price": {
      "type": "number",
      "multipleOf": 0.01
    }
  }
}
```

#### `categories`

> [!NOTE]
> Supported columns: **String**, **Integer**, **List**, **Base64**, **Hex**, **Email**, **UUID**, **URL**, **Datetime**, **Date**, **Time**, **Duration**, **WKT**, **WKB**, **Year**

An optional array of categorical values with optional labels. Each item can be either a simple value or an object with `value` and `label` properties.

Schema example:

```json
{
  "properties": {
    "severity": {
      "type": "integer",
      "categories": [
        { "value": 1, "label": "Low" },
        { "value": 2, "label": "Medium" },
        { "value": 3, "label": "High" }
      ]
    }
  }
}
```

#### `missingValues`

> [!NOTE]
> Supported columns: **all column types**

An optional column-specific list of values that represent missing or null data for this column. The type of missing values depends on the column type.

Schema example:

```json
{
  "properties": {
    "measurement": {
      "type": "number",
      "missingValues": [
        { "value": -999, "label": "Sensor malfunction" },
        { "value": "NA", "label": "Not measured" }
      ]
    }
  }
}
```

#### `trueValues`

> [!NOTE]
> Supported columns: **Boolean**

An optional array of string values that `SHOULD` be interpreted as `true` when parsing data. It `MUST` be an array of strings.

Schema example:

```json
{
  "properties": {
    "is_active": {
      "type": "boolean",
      "trueValues": ["yes", "true", "1", "Y"]
    }
  }
}
```

#### `falseValues`

> [!NOTE]
> Supported columns: **Boolean**

An optional array of string values that `SHOULD` be interpreted as `false` when parsing data. It `MUST` be an array of strings.

Schema example:

```json
{
  "properties": {
    "is_active": {
      "type": "boolean",
      "falseValues": ["no", "false", "0", "N"]
    }
  }
}
```

#### `decimalChar`

> [!NOTE]
> Supported columns: **Number**

An optional single character used as the decimal separator in the data. It `MUST` be a string of length 1. Default is `.` (period).

Schema example:

```json
{
  "properties": {
    "price": {
      "type": "number",
      "decimalChar": ","
    }
  }
}
```

#### `groupChar`

> [!NOTE]
> Supported columns: **Integer**, **Number**, **Year**

An optional single character used as the thousands separator in the data. It `MUST` be a string of length 1.

Schema example:

```json
{
  "properties": {
    "population": {
      "type": "integer",
      "groupChar": ","
    }
  }
}
```

#### `withText`

> [!NOTE]
> Supported columns: **Integer**, **Number**, **Year**

An optional boolean indicating whether numeric values may include non-numeric text that should be stripped during parsing.

Schema example:

```json
{
  "properties": {
    "price": {
      "type": "number",
      "withText": true
    }
  }
}
```

#### `temporalFormat`

> [!NOTE]
> Supported columns: **Datetime**, **Date**, **Time**

An optional string specifying the datetime format pattern. If not provided, ISO 8601 format is assumed.

Schema example:

```json
{
  "properties": {
    "collection_date": {
      "type": "string",
      "format": "date",
      "temporalFormat": "%m/%d/%Y"
    }
  }
}
```

#### `delimiter`

> [!NOTE]
> Supported columns: **List**

An optional single character used to delimit items in a list column. It `MUST` be a string of length 1. Default is `,` (comma).

Schema example:

```json
{
  "properties": {
    "tags": {
      "type": "string",
      "format": "list",
      "delimiter": ";"
    }
  }
}
```

#### `itemType`

> [!NOTE]
> Supported columns: **List**

An optional type for items in a list column. It `MUST` be one of: `string`, `integer`, `number`, `boolean`, `datetime`, `date`, `time`.

Schema example:

```json
{
  "properties": {
    "measurements": {
      "type": "string",
      "format": "list",
      "itemType": "number"
    }
  }
}
```

#### `<jsonSchema>`

> [!NOTE]
> Supported columns: **Array**, **Object**, **GeoJSON**, **TopoJSON**

For `array` and `object` column types, all properties from [JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12/schema) are supported to define the structure and validation rules.

For example, with an array column:

```json
{
  "properties": {
    "coordinates": {
      "type": "array",
      "items": {
        "type": "number"
      },
      "minItems": 2,
      "maxItems": 3
    }
  }
}
```

For example, with an object column:

```json
{
  "properties": {
    "metadata": {
      "type": "object",
      "properties": {
        "author": { "type": "string" },
        "version": { "type": "integer" }
      },
      "required": ["author"]
    }
  }
}
```
## Extension

> [!WARNING]
> Additional properties are NOT allowed.

Fairspec Table does not support extension.

## Comparison

> [!NOTE]
> This section is under development.

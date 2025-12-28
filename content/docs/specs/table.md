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

For example:

```json
{
  "properties": {
    "name": {
      "type": "string"
    }
  }
}
```

#### Integer

A column for whole number values. It `MUST` have [`type`](#type) set to `"integer"` and `MUST NOT` have a [`format`](#format) property.

For example:

```json
{
  "properties": {
    "age": {
      "type": "integer"
    }
  }
}
```

#### Number

A column for numeric values including decimals. It `MUST` have [`type`](#type) set to `"number"` and `MUST NOT` have a [`format`](#format) property.

For example:

```json
{
  "properties": {
    "temperature": {
      "type": "number"
    }
  }
}
```

#### Boolean

A column for true/false values. It `MUST` have [`type`](#type) set to `"boolean"` and `MUST NOT` have a [`format`](#format) property.

For example:

```json
{
  "properties": {
    "is_active": {
      "type": "boolean"
    }
  }
}
```

#### Array

A column for array/list values. It `MUST` have [`type`](#type) set to `"array"` and `MUST NOT` have a [`format`](#format) property.

For example:

```json
{
  "properties": {
    "coordinates": {
      "type": "array"
    }
  }
}
```

#### Object

A column for object/dictionary values. It `MUST` have [`type`](#type) set to `"object"` and `MUST NOT` have a [`format`](#format) property.

For example:

```json
{
  "properties": {
    "metadata": {
      "type": "object"
    }
  }
}
```

#### List

A column for delimited list values stored as strings. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"list"`.

For example:

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

#### Base64

A column for Base64 encoded binary data. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"base64"`.

For example:

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

#### Hex

A column for hexadecimal encoded data. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"hex"`.

For example:

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

#### Email

A column for email addresses. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"email"`.

For example:

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

#### UUID

A column for UUID identifiers. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"uuid"`.

For example:

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

#### URL

A column for URLs/URIs. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"url"`.

For example:

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

#### Datetime

A column for ISO 8601 datetime values. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"date-time"`.

For example:

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

#### Date

A column for ISO 8601 date values. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"date"`.

For example:

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

#### Time

A column for ISO 8601 time values. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"time"`.

For example:

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

#### Duration

A column for ISO 8601 duration values. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"duration"`.

For example:

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

#### WKT

A column for Well-Known Text (WKT) geometry data. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"wkt"`.

For example:

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

#### WKB

A column for Well-Known Binary (WKB) geometry data. It `MUST` have [`type`](#type) set to `"string"` and [`format`](#format) set to `"wkb"`.

For example:

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

#### Year

A column for year values. It `MUST` have [`type`](#type) set to `"integer"` and [`format`](#format) set to `"year"`.

For example:

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

#### GeoJSON

A column for GeoJSON geometry objects. It `MUST` have [`type`](#type) set to `"object"` and [`format`](#format) set to `"geojson"`.

For example:

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

#### TopoJSON

A column for TopoJSON geometry objects. It `MUST` have [`type`](#type) set to `"object"` and [`format`](#format) set to `"topojson"`.

For example:

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

For example:

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
> Supported columns: **string**, **integer**, **object**

An optional format qualifier that specifies a more specific subtype of the base type.

**String formats:** `list`, `email`, `uuid`, `url`, `date-time`, `date`, `time`, `duration`, `base64`, `hex`, `wkt`, `wkb`

**Integer formats:** `year`

**Object formats:** `geojson`, `topojson`

For example:

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

For example:

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

For example:

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
> Supported columns: **string**, **integer**, **number**, **boolean**

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
> Supported columns: **string**

An optional regular expression pattern that values `MUST` match. It `MUST` be a valid regex string.

For example:

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
> Supported columns: **string**

An optional minimum length constraint for string values. It `MUST` be a non-negative integer.

For example:

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
> Supported columns: **string**

An optional maximum length constraint for string values. It `MUST` be a non-negative integer.

For example:

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
> Supported columns: **integer**, **number**

An optional minimum value constraint (inclusive). The type `MUST` match the column type.

For example:

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
> Supported columns: **integer**, **number**

An optional maximum value constraint (inclusive). The type `MUST` match the column type.

For example:

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
> Supported columns: **integer**, **number**

An optional minimum value constraint (exclusive). The type `MUST` match the column type.

For example:

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
> Supported columns: **integer**, **number**

An optional maximum value constraint (exclusive). The type `MUST` match the column type.

For example:

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
> Supported columns: **integer**, **number**

An optional constraint that values `MUST` be a multiple of this number. For integers, it `MUST` be a positive integer. For numbers, it `MUST` be a positive number.

For example:

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
> Supported columns: **string**, **integer**

An optional array of categorical values with optional labels. Each item can be either a simple value or an object with `value` and `label` properties.

For example:

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

For example:

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
> Supported columns: **boolean**

An optional array of string values that `SHOULD` be interpreted as `true` when parsing data. It `MUST` be an array of strings.

For example:

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
> Supported columns: **boolean**

An optional array of string values that `SHOULD` be interpreted as `false` when parsing data. It `MUST` be an array of strings.

For example:

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
> Supported columns: **number**

An optional single character used as the decimal separator in the data. It `MUST` be a string of length 1. Default is `.` (period).

For example:

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
> Supported columns: **integer**, **number**

An optional single character used as the thousands separator in the data. It `MUST` be a string of length 1.

For example:

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
> Supported columns: **integer**, **number**

An optional boolean indicating whether numeric values may include non-numeric text that should be stripped during parsing.

For example:

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
> Supported columns: **datetime**, **date**, **time**

An optional string specifying the datetime format pattern. If not provided, ISO 8601 format is assumed.

For example:

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
> Supported columns: **list**

An optional single character used to delimit items in a list column. It `MUST` be a string of length 1. Default is `,` (comma).

For example:

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
> Supported columns: **list**

An optional type for items in a list column. It `MUST` be one of: `string`, `integer`, `number`, `boolean`, `datetime`, `date`, `time`.

For example:

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

#### `<jsonschema>`

> [!NOTE]
> Supported columns: **array**, **object**

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

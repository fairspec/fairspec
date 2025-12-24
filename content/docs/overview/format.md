---
title: Format
sidebar:
  order: 1
---

Cardealer DP (Car Dealer Data Package) is a data exchange format that helps car dealerships share their car listings. It is developed on top of the Data Package standard.

## Why Cardealer DP?

The automotive industry lacks a standardized format for exchanging car listing data between dealerships, marketplaces, and aggregation platforms. This creates several challenges:

- **Data inconsistency**: Each platform uses its own proprietary format, making integration difficult
- **Manual data entry**: Dealerships often need to manually enter the same car listings across multiple platforms
- **Limited interoperability**: Aggregators must maintain custom integrations for each data source
- **Data quality issues**: Without clear schemas, data validation and quality control are challenging

Cardealer DP solves these problems by providing a **standardized, validated, and extensible format** for sharing car dealership data. Built on the proven [Data Package](https://datapackage.org/) standard, it ensures data is machine-readable, well-documented, and easy to integrate.

## Structure of a Cardealer DP File

A Cardealer DP file is a JSON document that follows the Data Package specification. The file contains metadata about the package and one or more data resources describing the dealer, its showrooms, and its cars.

### Basic Structure

```json
{
  "$schema": "https://datisthq.github.io/cardealerdp/extension/<version>/profile.json",
  "resources": [
    {
      "name": "car",
      "schema": "https://datisthq.github.io/cardealerdp/extension/<version>/schemas/car.json",
      "data": [{...}, {...}, {...}]
    },
    {
      "name": "dealer",
      "schema": "https://datisthq.github.io/cardealerdp/extension/<version>/schemas/dealer.json",
      "data": [{...}]
    },
    {
      "name": "showroom",
      "schema": "https://datisthq.github.io/cardealerdp/extension/<version>/schemas/showroom.json",
      "data": [{...}, {...}]
    }
  ]
}
```

### Key Components

1. **Profile**: References the Cardealer DP profile that defines the structure and validation rules
2. **Resources**: An array containing 1-3 resources:
   - **dealer** (required): Information about the car dealership (exactly 1 item)
   - **car** (optional): Array of car listings offered by the dealer
   - **showroom** (optional): Array of physical showroom locations

Each resource includes:
- **name**: The resource type identifier (`"dealer"`, `"car"`, or `"showroom"`)
- **schema**: URL pointing to the JSON schema that validates the data structure
- **data**: An array of data items conforming to the schema

### Data Relationships

The resources are connected through foreign keys:
- Cars can reference a specific **showroom** via `showroomId`
- If no `showroomId` is provided, the car is assumed to be at the dealer's main address
- Each showroom belongs to a dealer

This structure allows flexible representation of dealerships with single or multiple locations while maintaining data integrity through schema validation.

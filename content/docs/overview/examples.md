---
title: Examples
sidebar:
  order: 3
---

This page provides examples of Cardealer DP files for different scenarios.

## Example 1: Simple Dealer with One Showroom

A basic example with a single dealer location and two car listings. When no showrooms are specified, all cars are assumed to be at the dealer's main address.

```json
{
  "$schema": "https://datisthq.github.io/cardealerdp/extension/v0.3.3/profile.json",
  "resources": [
    {
      "name": "dealer",
      "schema": "https://datisthq.github.io/cardealerdp/extension/v0.3.3/schemas/dealer.json",
      "data": [
        {
          "title": "Premium Auto Sales",
          "country": "United States",
          "region": "California",
          "city": "Los Angeles",
          "address": "1234 Sunset Boulevard",
          "postcode": "90028",
          "phone": "+1-323-555-0100",
          "email": "sales@premiumauto.com",
          "url": "https://www.premiumauto.com",
          "lat": 34.0983,
          "lon": -118.3267
        }
      ]
    },
    {
      "name": "car",
      "schema": "https://datisthq.github.io/cardealerdp/extension/v0.3.3/schemas/car.json",
      "data": [
        {
          "title": "2023 Tesla Model 3 Long Range",
          "url": "https://www.premiumauto.com/cars/tesla-model-3-2023",
          "price": 45990,
          "currency": "USD",
          "year": 2023,
          "mileage": 12000,
          "brand": "Tesla",
          "model": "Model 3",
          "version": "Long Range AWD",
          "fuel": "electric",
          "gearbox": "auto",
          "category": "saloon",
          "color": "white",
          "door": "fourfive",
          "power": 346,
          "seats": 5,
          "range": 358,
          "battery": 75
        },
        {
          "title": "2022 BMW X5 xDrive40i",
          "url": "https://www.premiumauto.com/cars/bmw-x5-2022",
          "price": 62500,
          "currency": "USD",
          "year": 2022,
          "mileage": 24500,
          "brand": "BMW",
          "model": "X5",
          "version": "xDrive40i",
          "fuel": "petrol",
          "gearbox": "auto",
          "category": "suv",
          "color": "black",
          "door": "fourfive",
          "power": 335,
          "cubics": 2998,
          "seats": 5
        }
      ]
    }
  ]
}
```

## Example 2: Dealer with Multiple Showrooms

A dealer with a main location and additional showrooms, with cars distributed across different locations.

```json
{
  "$schema": "https://datisthq.github.io/cardealerdp/extension/v0.3.3/profile.json",
  "resources": [
    {
      "name": "dealer",
      "schema": "https://datisthq.github.io/cardealerdp/extension/v0.3.3/schemas/dealer.json",
      "data": [
        {
          "title": "Elite Motors Group",
          "country": "United States",
          "region": "California",
          "city": "San Francisco",
          "address": "500 Market Street",
          "postcode": "94105",
          "phone": "+1-415-555-0200",
          "email": "info@elitemotors.com",
          "url": "https://www.elitemotors.com",
          "lat": 37.7749,
          "lon": -122.4194
        }
      ]
    },
    {
      "name": "showroom",
      "schema": "https://datisthq.github.io/cardealerdp/extension/v0.3.3/schemas/showroom.json",
      "data": [
        {
          "id": "showroom-downtown-sf",
          "title": "Elite Motors - Downtown Showroom",
          "country": "United States",
          "region": "California",
          "city": "San Francisco",
          "address": "500 Market Street",
          "postcode": "94105",
          "phone": "+1-415-555-0200",
          "email": "downtown@elitemotors.com",
          "url": "https://www.elitemotors.com/downtown",
          "lat": 37.7749,
          "lon": -122.4194
        },
        {
          "id": "showroom-berkeley",
          "title": "Elite Motors - Berkeley Location",
          "country": "United States",
          "region": "California",
          "city": "Berkeley",
          "address": "2100 University Avenue",
          "postcode": "94704",
          "phone": "+1-510-555-0300",
          "email": "berkeley@elitemotors.com",
          "url": "https://www.elitemotors.com/berkeley",
          "lat": 37.8715,
          "lon": -122.2730
        }
      ]
    },
    {
      "name": "car",
      "schema": "https://datisthq.github.io/cardealerdp/extension/v0.3.3/schemas/car.json",
      "data": [
        {
          "showroomId": "showroom-downtown-sf",
          "title": "2024 Porsche 911 Carrera",
          "url": "https://www.elitemotors.com/cars/porsche-911-2024",
          "price": 115000,
          "currency": "USD",
          "year": 2024,
          "mileage": 3500,
          "brand": "Porsche",
          "model": "911",
          "version": "Carrera",
          "fuel": "petrol",
          "gearbox": "auto",
          "category": "sport",
          "color": "red",
          "door": "twothree",
          "power": 379,
          "cubics": 2981,
          "seats": 4
        },
        {
          "showroomId": "showroom-berkeley",
          "title": "2023 Audi e-tron GT",
          "url": "https://www.elitemotors.com/cars/audi-etron-gt-2023",
          "price": 105000,
          "currency": "USD",
          "year": 2023,
          "mileage": 8900,
          "brand": "Audi",
          "model": "e-tron GT",
          "version": "quattro",
          "fuel": "electric",
          "gearbox": "auto",
          "category": "saloon",
          "color": "grey",
          "door": "fourfive",
          "power": 476,
          "seats": 5,
          "range": 238,
          "battery": 93
        },
        {
          "title": "2023 Mercedes-Benz S-Class",
          "url": "https://www.elitemotors.com/cars/mercedes-s-class-2023",
          "price": 118000,
          "currency": "USD",
          "year": 2023,
          "mileage": 5200,
          "brand": "Mercedes-Benz",
          "model": "S-Class",
          "version": "S 500 4MATIC",
          "fuel": "petrol",
          "gearbox": "auto",
          "category": "saloon",
          "color": "black",
          "door": "fourfive",
          "power": 429,
          "cubics": 2999,
          "seats": 5
        }
      ]
    }
  ]
}
```

Note: The third car listing (Mercedes-Benz S-Class) has no `showroomId`, so it defaults to the dealer's main address at 500 Market Street.

## Example 3: Minimal Configuration

A minimal valid Cardealer DP file with only required fields.

```json
{
  "$schema": "https://datisthq.github.io/cardealerdp/extension/v0.3.3/profile.json",
  "resources": [
    {
      "name": "dealer",
      "schema": "https://datisthq.github.io/cardealerdp/extension/v0.3.3/schemas/dealer.json",
      "data": [
        {
          "title": "Quick Auto Sales",
          "country": "United States",
          "region": "Nevada",
          "city": "Las Vegas",
          "address": "789 Las Vegas Blvd",
          "url": "https://www.quickauto.com"
        }
      ]
    },
    {
      "name": "car",
      "schema": "https://datisthq.github.io/cardealerdp/extension/v0.3.3/schemas/car.json",
      "data": [
        {
          "title": "2021 Honda Civic LX",
          "url": "https://www.quickauto.com/cars/honda-civic-2021",
          "price": 22500,
          "currency": "USD",
          "year": 2021,
          "mileage": 35000,
          "brand": "Honda",
          "model": "Civic",
          "version": "LX",
          "fuel": "petrol",
          "gearbox": "manual",
          "category": "saloon",
          "color": "blue",
          "door": "fourfive"
        }
      ]
    }
  ]
}
```

This minimal example includes only the required fields for both dealer and car resources, demonstrating the minimum viable data package.

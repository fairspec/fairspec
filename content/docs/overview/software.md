---
title: Software
sidebar:
  order: 2
---

Cardealer DP provides SDKs for Python and TypeScript/JavaScript to make it easy to publish and consume Car Dealer Data Packages.

## Python

> [!NOTE]
> In addition to the Python SDK, we recommend using [frictionless-py](https://framework.frictionlessdata.io/) to manage your data packages. For example, using it you can publish your data pacakge directory to Zenodo instead of saving it locally, as well, as consume it from a remote server.

### Installation

```bash
pip install cardealerdp frictionless
```

### Publication

```python
from cardealerdp import Package, Car, Dealer
import frictionless

# Create dealer information
dealer = Dealer(
    title="Premium Auto Sales",
    country="United States",
    region="California",
    city="Los Angeles",
    address="1234 Sunset Boulevard",
    postcode="90028",
    phone="+1-323-555-0100",
    email="sales@premiumauto.com",
    url="https://www.premiumauto.com",
    lat=34.0983,
    lon=-118.3267,
)

# Create car listings
car = Car(
    title="2023 Tesla Model 3 Long Range",
    url="https://www.premiumauto.com/cars/tesla-model-3-2023",
    price=45990,
    currency="USD",
    year=2023,
    mileage=12000,
    brand="Tesla",
    model="Model 3",
    version="Long Range AWD",
    fuel="electric",
    gearbox="auto",
    category="saloon",
    color="white",
    door="fourfive",
    power=346,
    seats=5,
    range=358,
    battery=75,
)

package = Package(
    {
        "$schema": "https://datisthq.github.io/cardealerdp/extension/v0.3.3/profile.json",
        "resources": [
            {
                "name": "car",
                "data": [car],
                "schema": "https://datisthq.github.io/cardealerdp/extension/v0.3.3/schemas/car.json",
            },
            {
                "name": "dealer",
                "data": [dealer],
                "schema": "https://datisthq.github.io/cardealerdp/extension/v0.3.3/schemas/dealer.json",
            },
        ],
    }
)

frictionless.Package(package).to_json("cardealer.json")
```

### Validation

```python
import frictionless

report = frictionless.validate("cardealer.json")
print(report)
```

### Consumption

```python
import frictionless

package = frictionless.Package("cardealer.json")
print(package)
```

## TypeScript

> [!NOTE]
> In addition to the TypeScript SDK, we recommend using [frictionless-ts](https://github.com/frictionlessdata/frictionless-ts) to manage your data packages. For example, using it you can publish your data pacakge directory to Zenodo instead of saving it locally, as well, as consumte it from a remote server.

### Installation

```bash
npm install cardealerdp frictionless-ts
```

### Publication

```typescript
import type { Car, Dealer, Package } from "cardealerdp";
import { savePackageDescriptor } from "frictionless-ts";

const dealer: Dealer = {
	title: "Premium Auto Sales",
	country: "United States",
	region: "California",
	city: "Los Angeles",
	address: "1234 Sunset Boulevard",
	postcode: "90028",
	phone: "+1-323-555-0100",
	email: "sales@premiumauto.com",
	url: "https://www.premiumauto.com",
	lat: 34.0983,
	lon: -118.3267,
};

const car: Car = {
	title: "2023 Tesla Model 3 Long Range",
	url: "https://www.premiumauto.com/cars/tesla-model-3-2023",
	price: 45990,
	currency: "USD",
	year: 2023,
	mileage: 12000,
	brand: "Tesla",
	model: "Model 3",
	version: "Long Range AWD",
	fuel: "electric",
	gearbox: "auto",
	category: "saloon",
	color: "white",
	door: "fourfive",
	power: 346,
	seats: 5,
	range: 358,
	battery: 75,
};

const dataPackage: Package = {
	$schema:
		"https://datisthq.github.io/cardealerdp/extension/v0.3.3/profile.json",
	resources: [
		{
			name: "car",
			data: [car],
			schema:
				"https://datisthq.github.io/cardealerdp/extension/v0.3.3/schemas/car.json",
		},
		{
			name: "dealer",
			data: [dealer],
			schema:
				"https://datisthq.github.io/cardealerdp/extension/v0.3.3/schemas/dealer.json",
		},
	],
};

await savePackageDescriptor(dataPackage, {
	path: "cardealer.json",
	overwrite: true,
});
```

### Validation

```typescript
import { validatePackage } from "frictionless-ts";

const { valid, errors } = await validatePackage("cardealer.json");
console.log(valid, errors);
```

### Consumption

```typescript
import { loadPackageDescriptor } from "frictionless-ts";

const dataPackage = await loadPackageDescriptor("cardealer.json");
console.log(dataPackage);
```

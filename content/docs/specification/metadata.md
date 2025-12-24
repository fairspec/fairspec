---
title: Metadata
---

## Definitions

- <a id="definitions/Package"></a>**`Package`** *(object)*
  - <a id="definitions/Package/properties/%24schema"></a>**`$schema`**: Must be: `"https://datisthq.github.io/cardealerdp/extension/v0.3.3/profile.json"`.
  - <a id="definitions/Package/properties/resources"></a>**`resources`** *(array, required)*: Length must be at least 1.
    - <a id="definitions/Package/properties/resources/items"></a>**Items**: Refer to *[#/definitions/Resource](#definitions/Resource)*.
- <a id="definitions/Resource"></a>**`Resource`**
  - **One of**
    - <a id="definitions/Resource/oneOf/0"></a>: Refer to *[#/definitions/CarResource](#definitions/CarResource)*.
    - <a id="definitions/Resource/oneOf/1"></a>: Refer to *[#/definitions/DealerResource](#definitions/DealerResource)*.
    - <a id="definitions/Resource/oneOf/2"></a>: Refer to *[#/definitions/ShowroomResource](#definitions/ShowroomResource)*.
- <a id="definitions/CarResource"></a>**`CarResource`** *(object)*
  - <a id="definitions/CarResource/properties/name"></a>**`name`**: Must be: `"car"`.
  - <a id="definitions/CarResource/properties/data"></a>**`data`** *(array, required)*: Data items have to conform to the Car table schema. Length must be at least 1.
    - <a id="definitions/CarResource/properties/data/items"></a>**Items** *(object)*
  - <a id="definitions/CarResource/properties/schema"></a>**`schema`**: Must be: `"https://datisthq.github.io/cardealerdp/extension/v0.3.3/schemas/car.json"`.
- <a id="definitions/DealerResource"></a>**`DealerResource`** *(object)*
  - <a id="definitions/DealerResource/properties/name"></a>**`name`**: Must be: `"dealer"`.
  - <a id="definitions/DealerResource/properties/data"></a>**`data`** *(array, required)*: Data items have to conform to the Dealer table schema. Length must be equal to 1.
    - <a id="definitions/DealerResource/properties/data/items"></a>**Items** *(object)*
  - <a id="definitions/DealerResource/properties/schema"></a>**`schema`**: Must be: `"https://datisthq.github.io/cardealerdp/extension/v0.3.3/schemas/dealer.json"`.
- <a id="definitions/ShowroomResource"></a>**`ShowroomResource`** *(object)*
  - <a id="definitions/ShowroomResource/properties/name"></a>**`name`**: Must be: `"showroom"`.
  - <a id="definitions/ShowroomResource/properties/data"></a>**`data`** *(array, required)*: Data items have to conform to the Showroom table schema. Length must be at least 1.
    - <a id="definitions/ShowroomResource/properties/data/items"></a>**Items** *(object)*
  - <a id="definitions/ShowroomResource/properties/schema"></a>**`schema`**: Must be: `"https://datisthq.github.io/cardealerdp/extension/v0.3.3/schemas/showroom.json"`.

# liveapi-ts

TypeScript client for the [LiveAPI](https://liveapi.io) reference-data API.

The token spends calls on your account. Keep it in an environment variable on your server. Do not put it in a browser page or a mobile app.

```ts
import { Client } from "@liveapiio/liveapi";

const client = new Client({ token: process.env.LIVEAPI_TOKEN! });
const phone = await client.validatePhone("0555 111 22 33", "TR");
```

Request an optional country boundary with `await client.country("TR", true)`. The returned country may contain `geoshape` and `geoshape_attribution`.

```
npm install github:liveapiio/liveapi-ts
```

Methods: IP (`callerIp`, `lookupIp`, `callerField`, `lookupField`), countries and divisions, `currencies`, phones, plates, `rates`, `convert`, `distance`, `reverseGeocode`, `validateIban`, `validateIdentity`, `validateTaxNumber`, `idValidators`, `validateId`, `postalCodeCountries`, `postalCode`, `holidays`, `businessDays`, `timezone`, `validateEmail`, `validateVat`, `parseUserAgent`, `validateBarcode`.

```ts
await client.validateId("ES", "nif", "12345678Z");   // national ID / tax number checks
await client.validateBarcode("4006381333931");       // EAN / UPC / GTIN / ISBN
await client.postalCode("DE", "10115");              // LiveAPI in-house data
await client.reverseGeocode(41.01, 28.97);
await client.parseUserAgent(req.headers["user-agent"]);
```

IP results also carry `is_tor`, `is_hosting` and `hosting_provider`.

Docs: https://liveapi.io/docs

IP lookups include `attribution` and `attribution_url`. Keep those fields when you store or show a DB-IP result. Postal-code results identify LiveAPI's in-house dataset. A validation result with `valid: false` is still HTTP 200 and uses one call. Only a non-2xx response is free.

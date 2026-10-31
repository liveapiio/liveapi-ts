# liveapi-ts

TypeScript client for the [LiveAPI](https://liveapi.io) reference-data API.

The token spends calls on your account. Keep it in an environment variable on your server. Do not put it in a browser page or a mobile app.

```ts
import { Client } from "@liveapiio/liveapi";

const client = new Client({ token: process.env.LIVEAPI_TOKEN! });
const phone = await client.validatePhone("0555 111 22 33", "TR");
```

```
npm install github:liveapiio/liveapi-ts
```

Docs: https://liveapi.io/docs

IP lookups include `attribution` and `attribution_url`. Keep those fields when you store or show a DB-IP result. A validation result with `valid: false` is still HTTP 200 and uses one call. Only a non-2xx response is free.

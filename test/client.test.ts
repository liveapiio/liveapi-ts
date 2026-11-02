import assert from "node:assert/strict";
import test from "node:test";
import { Client, LiveApiError } from "../src/index.ts";

test("validatePhone sends the bearer token and decodes the body", async () => {
  const client = new Client({
    token: "test-token",
    baseUrl: "https://example.test",
    fetch: async (input, init) => {
      assert.equal(String(input), "https://example.test/v1/phones/validate");
      assert.equal((init?.headers as Record<string, string>).Authorization, "Bearer test-token");
      assert.equal(init?.method, "POST");
      return new Response(JSON.stringify({ valid: true, possible: true, reason: null, e164: "+905551112233", national: null, international: null, country: "TR", calling_code: "90", type: "MOBILE" }), { status: 200 });
    },
  });
  const phone = await client.validatePhone("0555 111 22 33", "TR");
  assert.equal(phone.e164, "+905551112233");
});

test("rates keeps the TCMB rate list", async () => {
  const client = new Client({
    token: "test-token",
    fetch: async (input) => {
      assert.match(String(input), /source=tcmb/);
      return new Response(JSON.stringify({ source: "tcmb", base: "TRY", date: "2025-12-31", fetched_at: "2025-12-31T15:00:00Z", rates: [{ code: "USD", name: "US Dollar", unit: 1, source_unit: 1, forex_buying: 1.1, forex_selling: null, banknote_buying: null, banknote_selling: null }] }), { status: 200 });
    },
  });
  const rates = await client.rates("tcmb");
  assert.equal(rates.source, "tcmb");
  assert.equal(rates.rates[0]?.code, "USD");
});

test("a non-2xx response becomes LiveApiError", async () => {
  const client = new Client({
    token: "test-token",
    fetch: async () => new Response(JSON.stringify({ error: { code: "not_found", message: "No location record for this address." } }), { status: 404 }),
  });
  await assert.rejects(client.lookupIp("203.0.113.8"), (error: unknown) => {
    assert.ok(error instanceof LiveApiError);
    assert.equal(error.status, 404);
    assert.equal(error.code, "not_found");
    return true;
  });
});

test("a blank token is rejected before the request", async () => {
  const client = new Client({ token: "  ", fetch: async () => { throw new Error("should not fetch"); } });
  await assert.rejects(client.currencies(), (error: unknown) => error instanceof LiveApiError && error.code === "unauthorized");
});

test("country can request its geoshape without changing the default call", async () => {
  const paths: string[] = [];
  const client = new Client({ token: "test-token", baseUrl: "https://example.test", fetch: async (input) => {
    paths.push(String(input));
    return new Response(JSON.stringify({ code: "TR", geoshape: { type: "Polygon", coordinates: [] } }));
  } });
  await client.country("TR");
  await client.country("TR", true);
  assert.deepEqual(paths, ["https://example.test/v1/countries/TR", "https://example.test/v1/countries/TR?include=geoshape"]);
});

test("validateId posts the value to the country and type path", async () => {
  const client = new Client({
    token: "test-token",
    baseUrl: "https://example.test",
    fetch: async (input, init) => {
      assert.equal(String(input), "https://example.test/v1/validate/ES/nif");
      assert.equal(init?.method, "POST");
      assert.deepEqual(JSON.parse(String(init?.body)), { value: "12345678Z" });
      return new Response(JSON.stringify({ valid: true, normalized: "12345678Z", country: "ES", type: "nif", reason: null, registry_checked: false }), { status: 200 });
    },
  });
  const result = await client.validateId("ES", "nif", "12345678Z");
  assert.equal(result.valid, true);
});

test("idValidators unwraps the data list", async () => {
  const client = new Client({
    token: "test-token",
    fetch: async () => new Response(JSON.stringify({ data: [{ country: "ES", type: "nif", name: "NIF", holder: "person", description: "", example: "12345678Z", path: "/v1/validate/ES/nif" }] }), { status: 200 }),
  });
  const list = await client.idValidators();
  assert.equal(list[0]?.type, "nif");
});

test("new GET helpers build the right URLs", async () => {
  const seen: string[] = [];
  const client = new Client({
    token: "test-token",
    baseUrl: "https://example.test",
    fetch: async (input, init) => {
      seen.push(`${init?.method} ${String(input)}${init?.body ? " " + String(init.body) : ""}`);
      return new Response("{}", { status: 200 });
    },
  });
  await client.validateBarcode("4006381333931");
  await client.reverseGeocode(41.01, 28.97);
  await client.postalCode("DE", "10115");
  await client.postalCodeCountries();
  await client.parseUserAgent("Mozilla/5.0");
  assert.deepEqual(seen, [
    "GET https://example.test/v1/barcodes/validate?code=4006381333931",
    "GET https://example.test/v1/reverse?lat=41.01&lon=28.97",
    "GET https://example.test/v1/postal-codes/DE/10115",
    "GET https://example.test/v1/postal-codes",
    'POST https://example.test/v1/user-agent {"ua":"Mozilla/5.0"}',
  ]);
});

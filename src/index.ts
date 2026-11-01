export class LiveApiError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "LiveApiError";
    this.status = status;
    this.code = code;
  }
}

export type Currency = { code: string; name: string; symbol: string | null };
export type Language = { code: string; name: string };
export type Country = {
  code: string;
  iso3: string;
  numeric: string | null;
  name: string;
  official_name: string;
  name_tr: string | null;
  capital: string | null;
  region: string | null;
  subregion: string | null;
  tld: string | null;
  flag: string | null;
  latitude: number | null;
  longitude: number | null;
  area_km2: number | null;
  independent: boolean;
  currencies: Currency[];
  languages: Language[];
  calling_code: string | null;
  in_eu: boolean;
};
export type Division = {
  id: string;
  country: string;
  code: string;
  name: string;
  level: number;
  parent_id: string | null;
  children?: Division[];
};
export type IpLocation = {
  ip: string | null;
  version: "IPv4" | "IPv6" | null;
  city: string | null;
  region: string | null;
  region_code: string | null;
  country_code: string | null;
  country_code_iso3: string | null;
  country_name: string | null;
  country_name_tr: string | null;
  country_capital: string | null;
  country_tld: string | null;
  country_flag: string | null;
  continent_code: string | null;
  in_eu: boolean | null;
  postal: string | null;
  latitude: number | null;
  longitude: number | null;
  timezone: string | null;
  utc_offset: string | null;
  country_calling_code: string | null;
  currency: string | null;
  currency_name: string | null;
  languages: string | null;
  language_codes: string[];
  country_area: number | null;
  asn: string | null;
  org: string | null;
  colo: string | null;
  metro_code: string | null;
  browser_language: string | null;
  source: "cloudflare" | "db-ip" | null;
  attribution: string | null;
  attribution_url: string | null;
  /** Listed in the Tor exit list. null when the list is not loaded. */
  is_tor: boolean | null;
  /** Inside a published cloud or hosting range. null when the data is not loaded. */
  is_hosting: boolean | null;
  hosting_provider: string | null;
};
export type CallingCode = { country: string; name: string; calling_code: string };
export type PhoneValidation = {
  valid: boolean;
  possible: boolean;
  reason: string | null;
  e164: string | null;
  national: string | null;
  international: string | null;
  country: string | null;
  calling_code: string | null;
  type: string | null;
};
export type PlateFormat = { country: string; description: string; example: string };
export type PlateValidation = {
  valid: boolean;
  reason: string | null;
  normalized: string | null;
  country: string;
  province_code: string | null;
  province_name: string | null;
};
export type ReferenceRate = { code: string; rate: number };
export type TcmbRate = {
  code: string;
  name: string;
  unit: 1;
  source_unit: number;
  forex_buying: number | null;
  forex_selling: number | null;
  banknote_buying: number | null;
  banknote_selling: number | null;
};
export type Rates = {
  source: "ecb" | "fed" | "tcmb";
  base: string;
  date: string | null;
  fetched_at: string;
  rates: ReferenceRate[] | TcmbRate[];
};
export type ConvertRequest = {
  from: string;
  to: string;
  amount?: number;
  source?: "ecb" | "fed" | "tcmb";
  date?: string;
  tcmbRate?: "forex_buying" | "forex_selling" | "banknote_buying" | "banknote_selling";
};
export type Conversion = {
  from: string;
  to: string;
  amount: number;
  rate: number;
  result: number;
  source: "ecb" | "fed" | "tcmb";
  base: string;
  date: string | null;
  tcmb_rate: string | null;
};
export type Point = { latitude?: number; longitude?: number; country?: string };
export type Distance = {
  kilometers: number;
  from: { latitude: number; longitude: number; country: string | null; label: string | null };
  to: { latitude: number; longitude: number; country: string | null; label: string | null };
};
export type IbanValidation = {
  valid: boolean;
  reason: string | null;
  iban: string | null;
  formatted: string | null;
  country: string | null;
  check_digits: string | null;
  bban: string | null;
  bank_code: string | null;
  bank_name: string | null;
};
export type TrNumberValidation = { valid: boolean; reason: string | null; type: "tckn" | "vkn"; registry_checked: false };
export type Holiday = { date: string; name: string; local_name: string; half_day: boolean; nationwide: boolean };
export type HolidayList = { country: string; year: number; source: "liveapi-tr" | "nager.date"; holidays: Holiday[] };
export type BusinessDaysRequest = { country: string; start: string; days?: number; end?: string; weekend?: number[] };
export type BusinessDays = {
  country: string;
  start: string;
  days: number | null;
  end: string;
  business_days: number;
  weekend: number[];
  holidays_skipped: string[];
};
export type TimezoneRequest = { latitude?: number; longitude?: number; country?: string };
export type Timezone = {
  timezone: string;
  utc_offset: string | null;
  abbreviation: string | null;
  is_dst: boolean;
  local_time: string;
  country_code: string | null;
  timezones: string[];
  source: "coordinates" | "country";
};
export type EmailCheck = {
  email: string;
  valid: boolean;
  reason: string | null;
  normalized: string | null;
  local_part: string | null;
  domain: string | null;
  syntax_valid: boolean;
  dns_checked: boolean;
  domain_exists: boolean | null;
  accepts_mail: boolean | null;
  mx_records: { priority: number; exchange: string }[];
  disposable: boolean;
  role: boolean;
};
export type VatCheck = {
  country_code: string;
  vat_number: string;
  valid: boolean;
  name: string | null;
  address: string | null;
  request_date: string;
  source: "vies";
};

export type IdValidator = {
  country: string;
  type: string;
  name: string;
  holder: "person" | "entity" | "bank";
  description: string;
  example: string;
  path: string;
};
export type IdValidation = {
  valid: boolean;
  normalized: string | null;
  country: string;
  type: string;
  reason: string | null;
  details?: Record<string, unknown>;
  registry_checked: false;
};
export type GeoNamesAttribution = { source: "GeoNames"; url: string; license: "CC BY 4.0" };
export type PostalCodeCountry = { country: string; count: number; partial: boolean; updated: string };
export type PostalCodeCountries = { data: PostalCodeCountry[]; attribution: GeoNamesAttribution };
export type PostalPlace = {
  postal_code: string;
  place: string;
  admin1: string | null;
  admin1_code: string | null;
  admin2: string | null;
  admin2_code: string | null;
  admin3: string | null;
  admin3_code: string | null;
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
};
export type PostalCodeLookup = {
  country: string;
  query: string;
  postal_code: string;
  match: "exact" | "partial";
  partial_data: boolean;
  coverage_note: string | null;
  places: PostalPlace[];
  updated: string;
  attribution: GeoNamesAttribution;
};
export type ReverseGeocode = {
  latitude: number;
  longitude: number;
  country_code: string;
  country_name: string | null;
  admin1: { code: string | null; name: string; type: string | null } | null;
  admin2: { id: string | null; name: string; type: string | null } | null;
  precision: "admin2" | "admin1";
  attribution: string;
};
export type UserAgent = {
  ua: string;
  browser: { name: string | null; version: string | null; major: string | null };
  engine: { name: string | null; version: string | null };
  os: { name: string | null; version: string | null };
  device: { type: string; vendor: string | null; model: string | null };
  cpu: { architecture: string | null };
  is_bot: boolean;
  bot_match: string | null;
};
export type BarcodeValidation = {
  input: string;
  normalized: string;
  valid: boolean;
  type: "ean8" | "upca" | "ean13" | "gtin14" | "isbn10" | "isbn13" | null;
  reason: "invalid_characters" | "invalid_length" | "invalid_check_digit" | null;
  check_digit: string | null;
  expected_check_digit: string | null;
  gtin14: string | null;
  isbn10: string | null;
  isbn13: string | null;
};

export type ClientOptions = {
  token: string;
  baseUrl?: string;
  fetch?: typeof fetch;
};

/** Calls the LiveAPI reference-data endpoints. Keep the token on a server. */
export class Client {
  readonly baseUrl: string;
  readonly token: string;
  private readonly fetchImpl: typeof fetch;

  constructor(options: ClientOptions) {
    this.token = options.token;
    this.baseUrl = (options.baseUrl ?? "https://liveapi.io").replace(/\/$/, "");
    this.fetchImpl = options.fetch ?? fetch;
  }

  callerIp(): Promise<IpLocation> {
    return this.json("GET", "/v1/ip");
  }

  lookupIp(ip: string): Promise<IpLocation> {
    return this.json("GET", `/v1/ip/${encodeURIComponent(ip)}`);
  }

  callerField(field: string): Promise<string> {
    return this.text(`/v1/ip/${encodeURIComponent(field)}`);
  }

  lookupField(ip: string, field: string): Promise<string> {
    return this.text(`/v1/ip/${encodeURIComponent(ip)}/${encodeURIComponent(field)}`);
  }

  countries(query?: string): Promise<Country[]> {
    return this.json("GET", "/v1/countries", { query: { q: query } });
  }

  country(code: string): Promise<Country> {
    return this.json("GET", `/v1/countries/${encodeURIComponent(code)}`);
  }

  divisions(country: string): Promise<Division[]> {
    return this.json("GET", `/v1/countries/${encodeURIComponent(country)}/divisions`);
  }

  divisionByCode(country: string, code: string): Promise<Division> {
    return this.json("GET", `/v1/countries/${encodeURIComponent(country)}/divisions/${encodeURIComponent(code)}`);
  }

  divisionChildrenByCode(country: string, code: string): Promise<Division[]> {
    return this.json("GET", `/v1/countries/${encodeURIComponent(country)}/divisions/${encodeURIComponent(code)}/children`);
  }

  division(id: string): Promise<Division> {
    return this.json("GET", `/v1/divisions/${encodeURIComponent(id)}`);
  }

  divisionChildren(id: string): Promise<Division[]> {
    return this.json("GET", `/v1/divisions/${encodeURIComponent(id)}/children`);
  }

  currencies(): Promise<Currency[]> {
    return this.json("GET", "/v1/currencies");
  }

  callingCodes(country?: string): Promise<CallingCode[]> {
    return this.json("GET", "/v1/phones/codes", { query: { country } });
  }

  validatePhone(number: string, country?: string): Promise<PhoneValidation> {
    return this.json("POST", "/v1/phones/validate", { body: country ? { number, country } : { number } });
  }

  plateFormats(): Promise<PlateFormat[]> {
    return this.json("GET", "/v1/plates/formats");
  }

  validatePlate(plate: string, country: string): Promise<PlateValidation> {
    return this.json("POST", "/v1/plates/validate", { body: { plate, country } });
  }

  rates(source?: "ecb" | "fed" | "tcmb", date?: string): Promise<Rates> {
    return this.json("GET", "/v1/rates", { query: { source, date } });
  }

  convert(request: ConvertRequest): Promise<Conversion> {
    return this.json("GET", "/v1/rates/convert", {
      query: {
        from: request.from,
        to: request.to,
        amount: request.amount,
        source: request.source,
        date: request.date,
        tcmb_rate: request.tcmbRate,
      },
    });
  }

  distance(from: Point, to: Point): Promise<Distance> {
    return this.json("POST", "/v1/geo/distance", { body: { from, to } });
  }

  validateIban(iban: string): Promise<IbanValidation> {
    return this.json("POST", "/v1/iban/validate", { body: { iban } });
  }

  validateIdentity(number: string): Promise<TrNumberValidation> {
    return this.json("POST", "/v1/tr/identity/validate", { body: { number } });
  }

  validateTaxNumber(number: string): Promise<TrNumberValidation> {
    return this.json("POST", "/v1/tr/tax-number/validate", { body: { number } });
  }

  holidays(country: string, year?: number): Promise<HolidayList> {
    return this.json("GET", "/v1/holidays", { query: { country, year } });
  }

  businessDays(request: BusinessDaysRequest): Promise<BusinessDays> {
    return this.json("POST", "/v1/business-days", { body: request });
  }

  timezone(request: TimezoneRequest = {}): Promise<Timezone> {
    return this.json("GET", "/v1/timezone", { query: { lat: request.latitude, lon: request.longitude, country: request.country } });
  }

  validateEmail(email: string, dns?: boolean): Promise<EmailCheck> {
    return this.json("POST", "/v1/email/validate", { body: dns === undefined ? { email } : { email, dns } });
  }

  validateVat(vatNumber: string, country?: string): Promise<VatCheck> {
    return this.json("POST", "/v1/vat/validate", { body: country ? { vat_number: vatNumber, country } : { vat_number: vatNumber } });
  }

  /** Lists the national ID, tax and company number checks. */
  async idValidators(): Promise<IdValidator[]> {
    const body = await this.json<{ data: IdValidator[] }>("GET", "/v1/validate");
    return body.data;
  }

  /** Checks a national number offline, for example ("ES", "nif", "12345678Z"). */
  validateId(country: string, type: string, value: string): Promise<IdValidation> {
    return this.json("POST", `/v1/validate/${encodeURIComponent(country)}/${encodeURIComponent(type)}`, { body: { value } });
  }

  postalCodeCountries(): Promise<PostalCodeCountries> {
    return this.json("GET", "/v1/postal-codes");
  }

  postalCode(country: string, code: string): Promise<PostalCodeLookup> {
    return this.json("GET", `/v1/postal-codes/${encodeURIComponent(country)}/${encodeURIComponent(code)}`);
  }

  /** Country and administrative area for a point. */
  reverseGeocode(latitude: number, longitude: number): Promise<ReverseGeocode> {
    return this.json("GET", "/v1/reverse", { query: { lat: latitude, lon: longitude } });
  }

  /** Parses a User-Agent string (for example one your server received). */
  parseUserAgent(ua: string): Promise<UserAgent> {
    return this.json("POST", "/v1/user-agent", { body: { ua } });
  }

  /** Checks the check digit of an EAN-8, UPC-A, EAN-13, GTIN-14 or ISBN. */
  validateBarcode(code: string): Promise<BarcodeValidation> {
    return this.json("GET", "/v1/barcodes/validate", { query: { code } });
  }

  private async json<T>(method: string, path: string, options?: { query?: Record<string, string | number | undefined>; body?: unknown }): Promise<T> {
    const { status, text } = await this.send(method, path, options?.query, options?.body, "application/json");
    if (status < 200 || status >= 300) throw failure(status, text);
    return JSON.parse(text) as T;
  }

  private async text(path: string): Promise<string> {
    const { status, text } = await this.send("GET", path, undefined, undefined, "text/plain");
    if (status < 200 || status >= 300) throw failure(status, text);
    return text;
  }

  private async send(method: string, path: string, query: Record<string, string | number | undefined> | undefined, body: unknown, accept: string): Promise<{ status: number; text: string }> {
    if (this.token.trim() === "") throw new LiveApiError(401, "unauthorized", "Bearer token is missing.");
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query ?? {})) {
      if (value !== undefined && value !== "") params.set(key, String(value));
    }
    const search = params.size > 0 ? `?${params.toString()}` : "";
    const response = await this.fetchImpl(`${this.baseUrl}${path}${search}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: accept,
        "User-Agent": "liveapi-ts/0.1.0",
        ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return { status: response.status, text: await response.text() };
  }
}

function failure(status: number, raw: string): LiveApiError {
  try {
    const body = JSON.parse(raw) as { error?: { code?: string; message?: string } };
    if (body.error?.message) return new LiveApiError(status, body.error.code ?? "", body.error.message);
  } catch {
    // The body is not the API error envelope.
  }
  const message = raw.trim();
  return new LiveApiError(status, "", message === "" ? "LiveAPI request failed." : message);
}

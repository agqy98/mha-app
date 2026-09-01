export interface AddressSuggestion {
  id: string;

  formatted: string;
  addressLine1: string;
  addressLine2?: string;

  postalCode: string;

  latitude: number;
  longitude: number;
}

interface GeoapifyResult {
  place_id?: string;

  formatted: string;

  address_line1?: string;
  address_line2?: string;

  postcode?: string;

  lat: number;
  lon: number;
}

interface GeoapifyResponse {
  results: GeoapifyResult[];
}

const API_KEY =
  import.meta.env.VITE_GEOAPIFY_API_KEY;

export async function searchSingaporeAddresses(
  query: string
): Promise<AddressSuggestion[]> {
  if (!API_KEY) {
    throw new Error(
      "VITE_GEOAPIFY_API_KEY is not configured"
    );
  }

  const text = query.trim();

  if (text.length < 3) {
    return [];
  }

  const params = new URLSearchParams({
    text,
    format: "json",
    filter: "countrycode:sg",
    lang: "en",
    limit: "6",
    apiKey: API_KEY,
  });

  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      `Geoapify request failed: ${response.status}`
    );
  }

  const data =
    (await response.json()) as GeoapifyResponse;

  const results = data.results.map(
    (result) => ({
      id:
        result.place_id ??
        `${result.lat}-${result.lon}`,

      formatted: result.formatted,

      addressLine1:
        result.address_line1 ??
        result.formatted,

      addressLine2:
        result.address_line2,

      postalCode:
        result.postcode ?? "",

      latitude: result.lat,
      longitude: result.lon,
    })
  );

  // Remove duplicate results.
  return Array.from(
    new Map(
      results.map((result) => [
        `${result.formatted}-${result.latitude}-${result.longitude}`,
        result,
      ])
    ).values()
  );
}
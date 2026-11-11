import { ZuploRequest } from "@zuplo/runtime";

// Game-day weather for the sports MCP server, backed by Open-Meteo (free, no
// key). Takes a city name so the model can chain it off a scoreboard tool's
// venue city without knowing coordinates.

const WEATHER_CODES: Record<number, string> = {
  0: "clear",
  1: "mostly clear",
  2: "partly cloudy",
  3: "overcast",
  45: "fog",
  48: "freezing fog",
  51: "light drizzle",
  53: "drizzle",
  55: "heavy drizzle",
  61: "light rain",
  63: "rain",
  65: "heavy rain",
  66: "freezing rain",
  67: "heavy freezing rain",
  71: "light snow",
  73: "snow",
  75: "heavy snow",
  77: "snow grains",
  80: "light showers",
  81: "showers",
  82: "violent showers",
  85: "snow showers",
  86: "heavy snow showers",
  95: "thunderstorm",
  96: "thunderstorm with hail",
  99: "thunderstorm with heavy hail",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export default async function (request: ZuploRequest): Promise<Response> {
  const city = new URL(request.url).searchParams.get("city")?.trim();
  if (!city) return json({ error: "city is required, e.g. 'Boston' or 'Boston, MA'" }, 400);

  // The geocoder matches on the bare place name; a trailing ", MA" or
  // ", Canada" is used to pick among same-named results instead.
  const [name, ...qualifiers] = city.split(",").map((s) => s.trim());
  const geoResp = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?count=10&name=${encodeURIComponent(name)}`,
  );
  if (!geoResp.ok) return json({ error: `Geocoding returned ${geoResp.status}` }, 502);
  const candidates: any[] = (await geoResp.json()).results ?? [];
  if (!candidates.length) return json({ error: `No location found for '${city}'` }, 404);

  const wanted = qualifiers.map((q) => q.toLowerCase());
  const place =
    candidates.find((c) =>
      wanted.every((q) =>
        [c.admin1, c.country, c.country_code, stateAbbreviation(c.admin1)].some((v) => v?.toLowerCase() === q),
      ),
    ) ?? candidates[0];

  const params = new URLSearchParams({
    latitude: String(place.latitude),
    longitude: String(place.longitude),
    current: "temperature_2m,apparent_temperature,precipitation,wind_speed_10m,wind_direction_10m,weather_code",
    hourly: "temperature_2m,precipitation_probability,wind_speed_10m,weather_code",
    forecast_hours: "24",
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    precipitation_unit: "inch",
    timezone: "auto",
  });
  const wxResp = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!wxResp.ok) return json({ error: `Open-Meteo returned ${wxResp.status}` }, 502);
  const wx = await wxResp.json();

  const hourly = wx.hourly ?? {};
  return json({
    location: [place.name, place.admin1, place.country].filter(Boolean).join(", "),
    timezone: wx.timezone,
    units: { temperature: "°F", wind: "mph", precipitation: "inch" },
    current: {
      time: wx.current?.time,
      conditions: WEATHER_CODES[wx.current?.weather_code] ?? "unknown",
      temperature: wx.current?.temperature_2m,
      feelsLike: wx.current?.apparent_temperature,
      precipitation: wx.current?.precipitation,
      windSpeed: wx.current?.wind_speed_10m,
      windDirectionDegrees: wx.current?.wind_direction_10m,
    },
    next24Hours: (hourly.time ?? []).map((time, i) => ({
      time,
      conditions: WEATHER_CODES[hourly.weather_code?.[i]] ?? "unknown",
      temperature: hourly.temperature_2m?.[i],
      precipitationChancePercent: hourly.precipitation_probability?.[i],
      windSpeed: hourly.wind_speed_10m?.[i],
    })),
  });
}

const US_STATES: Record<string, string> = {
  Alabama: "AL", Alaska: "AK", Arizona: "AZ", Arkansas: "AR", California: "CA", Colorado: "CO",
  Connecticut: "CT", Delaware: "DE", "District of Columbia": "DC", Florida: "FL", Georgia: "GA",
  Hawaii: "HI", Idaho: "ID", Illinois: "IL", Indiana: "IN", Iowa: "IA", Kansas: "KS", Kentucky: "KY",
  Louisiana: "LA", Maine: "ME", Maryland: "MD", Massachusetts: "MA", Michigan: "MI", Minnesota: "MN",
  Mississippi: "MS", Missouri: "MO", Montana: "MT", Nebraska: "NE", Nevada: "NV", "New Hampshire": "NH",
  "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND",
  Ohio: "OH", Oklahoma: "OK", Oregon: "OR", Pennsylvania: "PA", "Rhode Island": "RI",
  "South Carolina": "SC", "South Dakota": "SD", Tennessee: "TN", Texas: "TX", Utah: "UT", Vermont: "VT",
  Virginia: "VA", Washington: "WA", "West Virginia": "WV", Wisconsin: "WI", Wyoming: "WY",
};

function stateAbbreviation(admin1?: string): string | undefined {
  return admin1 ? US_STATES[admin1] : undefined;
}

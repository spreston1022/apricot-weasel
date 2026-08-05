import { mockStandings } from "./mock-standings-data";

export default async function (): Promise<Response> {
  return new Response(JSON.stringify(mockStandings), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

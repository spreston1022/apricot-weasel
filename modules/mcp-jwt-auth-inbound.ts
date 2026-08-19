import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

const ISSUER = "https://apricot-weasel-main-fc6ace1.zuplo.app";
const AUDIENCE = "apricot-weasel-mcp";

const JWK = {
  kty: "RSA",
  n: "vEj7nf6GD-FYg00CQ64Ymj0scHObkgB2wl5cV5IfQqv6jGlD2nd_YlCIeOhUP-CL2TrMX-jilte3f6u1OKCeTQNOHBLENyGdrDpMaukKLgtPDvKrVwU7p7bhHNiZJUvk9Pw15OzLR0bDVun5g0tpLy7wkFlFnGY2094PwlrdAWeA7x2eMYzSlX-Sa6b72NiRVFOGFg8UGMqPNKiUf5YaZYxsRdP5ATvWN95w_SzQdntBL4uix4IwJnnz-OS7UrJH4_UnfBoYioVxA7XAb4mntxDIkyhpNcZN_RGP97WJzaYsUTCwZszmusJSEe8Q8rGyg7uRKAflWYPLJzPxk92Ttw",
  e: "AQAB",
  alg: "RS256",
  kid: "mcp-worker-key-1",
};

function base64UrlToBytes(b64url: string): Uint8Array {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

let cachedKey: CryptoKey | undefined;

async function getVerifyKey(): Promise<CryptoKey> {
  if (cachedKey) return cachedKey;
  cachedKey = await crypto.subtle.importKey(
    "jwk",
    JWK,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"]
  );
  return cachedKey;
}

function unauthorized(detail: string): Response {
  return new Response(
    JSON.stringify({
      type: "https://httpproblems.com/http-status/401",
      title: "Unauthorized",
      status: 401,
      detail,
    }),
    { status: 401, headers: { "content-type": "application/problem+json" } }
  );
}

export default async function (request: ZuploRequest, context: ZuploContext) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return unauthorized("Missing or malformed Authorization header");
  }
  const token = authHeader.slice("Bearer ".length);
  const parts = token.split(".");
  if (parts.length !== 3) {
    return unauthorized("Malformed JWT");
  }
  const [encodedHeader, encodedPayload, encodedSignature] = parts;

  let header: { alg?: string; kid?: string };
  let payload: { iss?: string; aud?: string; exp?: number; sub?: string };
  try {
    header = JSON.parse(new TextDecoder().decode(base64UrlToBytes(encodedHeader)));
    payload = JSON.parse(new TextDecoder().decode(base64UrlToBytes(encodedPayload)));
  } catch {
    return unauthorized("Malformed JWT");
  }

  if (header.alg !== "RS256" || header.kid !== JWK.kid) {
    return unauthorized("Unrecognized JWT header");
  }
  if (payload.iss !== ISSUER || payload.aud !== AUDIENCE) {
    return unauthorized("Invalid issuer or audience");
  }
  if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) {
    return unauthorized("Expired JWT");
  }

  const key = await getVerifyKey();
  const signedContent = new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`);
  const signature = base64UrlToBytes(encodedSignature);
  const valid = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    key,
    signature,
    signedContent
  );
  if (!valid) {
    return unauthorized("Invalid JWT signature");
  }

  const sub = payload.sub ?? "unknown";
  request.user = { sub, data: payload };
  context.custom.mcpCallerSub = sub;
  return request;
}

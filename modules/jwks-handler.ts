import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

const JWKS = {
  keys: [
    {
      kty: "RSA",
      n: "vEj7nf6GD-FYg00CQ64Ymj0scHObkgB2wl5cV5IfQqv6jGlD2nd_YlCIeOhUP-CL2TrMX-jilte3f6u1OKCeTQNOHBLENyGdrDpMaukKLgtPDvKrVwU7p7bhHNiZJUvk9Pw15OzLR0bDVun5g0tpLy7wkFlFnGY2094PwlrdAWeA7x2eMYzSlX-Sa6b72NiRVFOGFg8UGMqPNKiUf5YaZYxsRdP5ATvWN95w_SzQdntBL4uix4IwJnnz-OS7UrJH4_UnfBoYioVxA7XAb4mntxDIkyhpNcZN_RGP97WJzaYsUTCwZszmusJSEe8Q8rGyg7uRKAflWYPLJzPxk92Ttw",
      e: "AQAB",
      alg: "RS256",
      use: "sig",
      kid: "mcp-worker-key-1",
    },
  ],
};

export default async function (request: ZuploRequest, context: ZuploContext) {
  return new Response(JSON.stringify(JWKS), {
    headers: { "content-type": "application/json" },
  });
}

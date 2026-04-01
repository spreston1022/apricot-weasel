// modules/rate-limit-tenant.ts
import {
  CustomRateLimitDetails,
  ZuploContext,
  ZuploRequest,
} from "@zuplo/runtime";

/**
 * Rate limits by the `tenant` claim in the JWT.
 * Assumes a JWT auth policy has already run and populated request.user.
 *
 * Adjust requestsAllowed / timeWindowMinutes to your needs.
 */
export function rateLimitByTenant(
  request: ZuploRequest,
  context: ZuploContext,
  policyName: string,
): CustomRateLimitDetails | undefined {
  const user = request.user;

  if (!user) {
    // No authenticated user — skip tenant rate limiting (or block upstream)
    context.log.warn(`[${policyName}] No authenticated user; skipping tenant rate limit`);
    return undefined;
  }

  // Read the tenant claim — adjust the key name to match your JWT shape,
  // e.g. "tenant_id", "org", "account", etc.
  const tenantId: string | undefined =
    user.data?.tenant ?? user.data?.tenant_id ?? user.data?.org;

  if (!tenantId) {
    context.log.warn(`[${policyName}] No tenant claim found for sub=${user.sub}; skipping tenant rate limit`);
    return undefined;
  }

  // Optionally vary limits by tier stored in the token
  const tier: string = user.data?.tier ?? "free";

  const limits: Record<string, { requestsAllowed: number; timeWindowMinutes: number }> = {
    enterprise: { requestsAllowed: 10_000, timeWindowMinutes: 1 },
    pro:        { requestsAllowed: 1_000,  timeWindowMinutes: 1 },
    free:       { requestsAllowed: 100,    timeWindowMinutes: 1 },
  };

  const { requestsAllowed, timeWindowMinutes } = limits[tier] ?? limits.free;

  context.log.debug(`[${policyName}] Tenant=${tenantId} tier=${tier} limit=${requestsAllowed}/${timeWindowMinutes}m`);

  return {
    key: `tenant::${tenantId}`,   // namespace key to avoid collisions with user bucket
    requestsAllowed,
    timeWindowMinutes,
  };
}
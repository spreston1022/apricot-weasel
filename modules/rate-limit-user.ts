// modules/rate-limit-user.ts
import {
  CustomRateLimitDetails,
  ZuploContext,
  ZuploRequest,
} from "@zuplo/runtime";

/**
 * Rate limits by the JWT `sub` claim (individual user).
 * Assumes a JWT auth policy has already run and populated request.user.
 *
 * Adjust requestsAllowed / timeWindowMinutes to your needs.
 */
export function rateLimitByUser(
  request: ZuploRequest,
  context: ZuploContext,
  policyName: string,
): CustomRateLimitDetails | undefined {
  const user = request.user;

  if (!user?.sub) {
    context.log.warn(`[${policyName}] No sub claim found; skipping user rate limit`);
    return undefined;
  }

  // Optionally give individual users a higher ceiling based on a claim
  const plan: string = user.data?.plan ?? user.data?.tier ?? "free";

  const limits: Record<string, { requestsAllowed: number; timeWindowMinutes: number }> = {
    enterprise: { requestsAllowed: 500,  timeWindowMinutes: 1 },
    pro:        { requestsAllowed: 100,  timeWindowMinutes: 1 },
    free:       { requestsAllowed: 20,   timeWindowMinutes: 1 },
  };

  const { requestsAllowed, timeWindowMinutes } = limits[plan] ?? limits.free;

  context.log.debug(`[${policyName}] User=${user.sub} plan=${plan} limit=${requestsAllowed}/${timeWindowMinutes}m`);

  return {
    key: `user::${user.sub}`,   // namespace key to avoid collisions with tenant bucket
    requestsAllowed,
    timeWindowMinutes,
  };
}
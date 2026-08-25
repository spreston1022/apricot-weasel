// modules/rate-limit-tool-call.ts
import {
  CustomRateLimitDetails,
  ZuploContext,
  ZuploRequest,
} from "@zuplo/runtime";

const REQUESTS_ALLOWED = 5;
const TIME_WINDOW_MINUTES = 1;

/**
 * Flat rate limit by the JWT `sub` claim, shared across all MCP tool
 * routes - 5 tool calls/minute per caller, regardless of which tool.
 * Assumes mcp-jwt-auth-inbound has already run and populated request.user.
 */
export function rateLimitByToolCall(
  request: ZuploRequest,
  context: ZuploContext,
  policyName: string,
): CustomRateLimitDetails | undefined {
  const sub = request.user?.sub;

  if (!sub) {
    context.log.warn(`[${policyName}] No sub claim found; skipping tool-call rate limit`);
    return undefined;
  }

  return {
    key: `tool-call::${sub}`,
    requestsAllowed: REQUESTS_ALLOWED,
    timeWindowMinutes: TIME_WINDOW_MINUTES,
  };
}

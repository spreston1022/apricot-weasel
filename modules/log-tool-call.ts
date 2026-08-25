import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

type RouteOperation = {
  operationId?: string;
  "x-zuplo-route"?: {
    mcp?: { name?: string };
  };
};

export default async function (request: ZuploRequest, context: ZuploContext) {
  const operation = context.route.raw<RouteOperation>();
  const tool = operation["x-zuplo-route"]?.mcp?.name ?? operation.operationId;

  const url = new URL(request.url);
  const parameters = {
    ...request.params,
    ...Object.fromEntries(url.searchParams),
  };

  const caller =
    request.user?.sub ??
    context.custom?.mcpCallerSub ??
    context.parentContext?.custom?.mcpCallerSub ??
    "unknown";

  const startedAt = Date.now();
  context.log.info({ tool, parameters, caller }, "MCP tool invoked");

  context.addResponseSendingHook(async (response) => {
    const durationMs = Date.now() - startedAt;
    const outcome = response.ok ? "success" : "error";

    if (response.ok) {
      context.log.info({ tool, caller, outcome, status: response.status, durationMs }, "MCP tool completed");
    } else {
      let detail: unknown;
      try {
        detail = await response.clone().json();
      } catch {
        detail = await response.clone().text().catch(() => undefined);
      }
      context.log.warn({ tool, caller, outcome, status: response.status, durationMs, detail }, "MCP tool failed");
    }

    return response;
  });

  return request;
}

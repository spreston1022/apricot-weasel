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

  context.log.info({ tool, parameters }, "MCP tool invoked");

  return request;
}

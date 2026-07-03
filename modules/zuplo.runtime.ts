import { OpenTelemetryPlugin } from "@zuplo/otel";
import { RuntimeExtensions } from "@zuplo/runtime";

export function runtimeInit(runtime: RuntimeExtensions) {
  runtime.addPlugin(new OpenTelemetryPlugin());
}

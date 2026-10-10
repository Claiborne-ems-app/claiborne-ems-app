import { register } from "node:module";
import { pathToFileURL } from "node:url";

register("./test-ts-resolver.mjs", pathToFileURL("./scripts/"));

const nextJest = require("next/jest");
const next = require("@next/env");

// https://github.com/prisma/prisma/issues/8558#issuecomment-1006100001
// fix bug with setImmediate is not defined
global.setImmediate = nextJest.useRealTimers;
global.clearImmediate = nextJest.useRealTimers;

// load environment variables the same way Next.js does.
// https://stackoverflow.com/a/68246076
next.loadEnvConfig(process.cwd());

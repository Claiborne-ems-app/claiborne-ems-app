/**
 * Lets Node's native TypeScript test runner follow the extensionless relative
 * imports used by the Next.js/TypeScript build. This loader is test-only; the
 * production build continues to use Next's resolver.
 */
export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context);
  } catch (error) {
    const isExtensionlessRelativeImport =
      error?.code === "ERR_MODULE_NOT_FOUND" &&
      (specifier.startsWith("./") || specifier.startsWith("../")) &&
      !/\.[a-zA-Z0-9]+(?:[?#].*)?$/.test(specifier);

    if (!isExtensionlessRelativeImport) {
      throw error;
    }

    for (const extension of [".ts", ".tsx", ".mts", ".cts"]) {
      try {
        return await nextResolve(`${specifier}${extension}`, context);
      } catch (candidateError) {
        if (candidateError?.code !== "ERR_MODULE_NOT_FOUND") {
          throw candidateError;
        }
      }
    }

    throw error;
  }
}

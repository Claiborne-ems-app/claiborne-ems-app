# Claiborne EMS Protocols

A responsive, offline-capable Next.js reference application for the 2025
Claiborne County EMS protocol catalog.

The source catalog is maintained in
`src/data/claiborne-protocols.json` and
`src/data/claiborneProtocols.ts`. Each catalog entry points to one PDF in
`public/protocols/claiborne`.

## Development

```bash
npm install
npm run dev
```

The development and production build commands generate the offline resource
manifest automatically. To generate it directly:

```bash
npm run generate:offline
```

Create a production build with:

```bash
npm run build
```

## Release gates

Every push and pull request to `main` runs the locked install, automated tests,
linting, and production build in GitHub Actions. Before changing the app from
beta to a clinical production release, run:

```bash
npm run release:check
```

The command exits non-zero until every protocol in the review inventory has an
explicit **Approved** state. It is intentionally separate from the technical
CI checks: a green build confirms the package is technically deployable, not
that the full clinical-governance review is complete. Finish the physical
iPhone/iPad offline workflow in
[`docs/offline-manual-test-checklist.md`](docs/offline-manual-test-checklist.md)
after the clinical gate is clear.

The app preserves favorites, recently viewed protocols, PDF viewing
preferences, responsive bottom navigation, and an opt-in downloadable offline
package.

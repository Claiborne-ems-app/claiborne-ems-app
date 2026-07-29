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

The app preserves favorites, recently viewed protocols, PDF viewing
preferences, responsive bottom navigation, and an opt-in downloadable offline
package.

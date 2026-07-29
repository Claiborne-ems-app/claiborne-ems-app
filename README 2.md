# Air Protocols

Air Protocols is a Next.js protocol reference app for Covenant Health Air. It
ships its protocol catalog and source PDF as static assets, with no backend or
environment variables required.

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Updating protocol data

After replacing `public/protocols/covenant-health-air-protocols.pdf` with an
updated source document, regenerate the protocol catalog:

```bash
npm run import:protocols
```

The importer reads the PDF table of contents and protocol headers, updates
`protocol-text.txt`, and generates `data/protocols.ts`. Review and commit the
updated PDF and generated data together.

## Deploying to Vercel

This repository is ready to deploy as a Next.js project. No `vercel.json`,
custom output directory, environment variables, or server configuration is
needed.

1. Push the committed project to GitHub, GitLab, Bitbucket, or Azure DevOps.
2. In Vercel, select **Add New → Project** and import the repository.
3. Keep the detected **Next.js** framework preset and repository root (`.`).
4. In **Settings → Build and Deployment**, use Node.js **24.x**. The same
   version is pinned in `package.json`.
5. Keep the default install command (`npm ci`) and build command
   (`npm run build`). Leave **Output Directory** unset so Vercel uses Next.js's
   build output.
6. Deploy. Pushes to the production branch create production deployments;
   other branches create preview deployments.

Run the same checks before deploying:

```bash
npm run lint
npx tsc --noEmit --incremental false
npm run build
```

### Protocol PDF

`public/protocols/covenant-health-air-protocols.pdf` is committed as a public
static asset. Its size is 47,052,971 bytes (about 47 MB decimal / 45 MiB),
which is below Vercel Hobby's 100 MB per-static-file upload limit (and Pro's
1 GB limit). It will be served from the Vercel CDN at:

```text
https://<deployment-domain>/protocols/covenant-health-air-protocols.pdf
```

The viewer appends `#page=<number>` in the browser, for example:

```text
https://<deployment-domain>/protocols/covenant-health-air-protocols.pdf#page=27
```

The fragment is handled by the browser's native PDF viewer; it is not sent to
Vercel. If the PDF grows to 100 MB or more, move it to external object storage
or use a Vercel plan with a larger static-file limit.

### Expected public URLs

- `/` — Home, search, favorites, and recently viewed protocols.
- `/protocols` — protocol categories.
- `/protocols/<category>` — a category's protocol list.
- `/protocols/<category>/<protocol>` — a protocol landing page.
- `/protocols/<category>/<protocol>/viewer` — embedded native PDF viewer.
- `/manifest.webmanifest` — PWA installation manifest.
- `/protocols/covenant-health-air-protocols.pdf#page=<number>` — direct PDF
  navigation.

Vercel provides HTTPS automatically, so the manifest can be used to add the
app to an iPhone Home Screen. This Phase 1 PWA does not add offline caching;
the app and PDF require a network connection after installation.

## Deployment notes

- The current production build statically generates 497 routes, below Vercel's
  2,048 routes-per-deployment limit.
- This project has no runtime environment variables or backend services to
  configure.
- The browser stores favorites and recently viewed protocols locally. They do
  not sync between devices or deployments.

## References

- [Vercel limits](https://vercel.com/docs/limits)
- [Vercel Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)
- [Next.js public folder](https://nextjs.org/docs/app/api-reference/file-conventions/public-folder)

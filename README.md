# Bipul's Web

Plain static redirector for https://go.bipul.in — no build step, no framework.

## How it works

- `index.html` loads `app.js` in the browser.
- The slug is read from the URL hash (e.g. `https://go.bipul.in/#abc`).
- The app fetches a published Google Sheet CSV with two columns: `Slug,Url`.
- If the slug is found, the browser is redirected to the matching `Url`.

To add a new redirect, just add a `Slug, Url` row to the sheet — no code changes or redeploy required.

## Deployment

| repository | branch | deployed to |
|---|---|---|
| `BipulRaman/go.bipul.in` | `main` | https://go.bipul.in |

GitHub Actions publishes the repo contents to the `gh-pages` branch on every push to `main`.

## Running Locally

Any static file server works. For example:

```bash
npx serve .
```

Then open http://localhost:3000/#<slug>

## License

All information contained herein is, and remains the property of BIPUL RAMAN. See the [LICENSE file](./LICENSE).

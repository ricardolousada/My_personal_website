# Deploy this site to Vercel

This guide publishes the site in this folder to the internet with [Vercel](https://vercel.com). Vercel is a host built for Next.js. You connect a Git repository, Vercel runs `next build`, and it gives you a public URL such as `https://ricardo-lousada.vercel.app`.

You do not need to rent a server. The home page is static enough to be cached, and `app/api/chat/route.ts` runs as a small server function when someone talks to the digital twin. That function is what reads `OPENROUTER_API_KEY`. The key stays on Vercel. Visitors never receive it.

Work in PowerShell, in this folder:

```powershell
cd "C:\Users\ricar\OneDrive\Documentos\Cursos\AI Coder\site"
```

This folder is inside OneDrive. That is fine for the files, but Git is happier if OneDrive is not mid-sync while you commit. If a command says a file is locked, wait for the OneDrive icon to finish and run it again.

---

## 1. What you are about to do

1. Confirm the secret key will not be uploaded.
2. Turn this folder into a Git repository and push it to GitHub.
3. Import that repository in Vercel and add the API key there.
4. Point the twin at the public URL instead of `localhost`.
5. Open the live site and ask the twin one question.

There is no Git repository here yet, and no GitHub remote. Vercel’s normal path is “watch a GitHub repo and rebuild on every push,” so the first job is putting the code on GitHub.

---

## 2. Keep the API key off GitHub

The key lives in `.env` in the project root. `.gitignore` already refuses to track it:

```
.env
.env*.local
```

Before any commit, this check must not list `.env`:

```powershell
git status
```

If `.env` appears as a file to be committed, stop. Do not continue until it is ignored. A key that reaches GitHub should be treated as public: revoke it in the OpenRouter dashboard and create a new one.

Vercel will not read your local `.env`. You paste the same variable into the Vercel project in step 6. Local development keeps using the file. The live site uses the value stored in Vercel.

---

## 3. Accounts and Git

Create two free accounts if you do not have them:

- [GitHub](https://github.com)
- [Vercel](https://vercel.com) — sign up with the same GitHub account so Vercel can see your repositories

Install Git for Windows if `git --version` fails: [https://git-scm.com/download/win](https://git-scm.com/download/win). Close and reopen PowerShell after installing.

Tell Git who you are, once per computer. Use the email on your GitHub account.

```powershell
git config --global user.name "Ricardo Lousada"
git config --global user.email "ricardo.lousada@gmail.com"
```

---

## 4. Make the first commit

From the site folder:

```powershell
git init
git add .
git status
```

Read the list. You want source files (`app`, `components`, `lib`, `public`, `package.json`, `tuiturial.md`, `vercel.md`). You do not want `.env`, `node_modules`, or `.next`. Those are ignored.

```powershell
git commit -m "Publish the personal site"
git branch -M main
```

---

## 5. Put it on GitHub

On GitHub, open [https://github.com/new](https://github.com/new).

- Repository name: `ricardo-lousada` (any name is fine)
- Leave it private if you prefer. Vercel can deploy a private repo.
- Do not add a README, a `.gitignore`, or a license. Those would be a second first commit and the push below would be rejected until the histories are joined.

Create the repository. GitHub shows a remote URL. Yours will look like `https://github.com/YOUR-USER/ricardo-lousada.git`. Then, in the site folder:

```powershell
git remote add origin https://github.com/YOUR-USER/ricardo-lousada.git
git push -u origin main
```

A browser or window will ask you to sign in to GitHub. After the push, refresh the repository page. The code should be there, and `.env` should not.

---

## 6. Import the project in Vercel

1. Open [https://vercel.com/new](https://vercel.com/new).
2. Choose the GitHub repository you just pushed. If the list is empty, use “Adjust GitHub App Permissions” and grant Vercel access to that repository.
3. Vercel should detect **Next.js**. Leave the defaults:
   - Framework preset: Next.js
   - Build command: `next build` (shown as `npm run build`)
   - Output directory: empty. This app is not a static export. The chat route has to run on the server.
   - Install command: `npm install`
4. Open **Environment Variables** and add one:

   | Name | Value | Environments |
   | --- | --- | --- |
   | `OPENROUTER_API_KEY` | the value from your local `.env`, with no quotes and no spaces around `=` | Production, and Preview if you want the twin on preview URLs |

5. Click **Deploy**.

The first build takes a minute or two. When it finishes, Vercel shows a URL like `https://ricardo-lousada.vercel.app`. Open it. The page should match what you see at `http://localhost:3001`.

The twin is not finished yet. The page will load, and a question may still fail or be attributed to your laptop, because the server route introduces itself as localhost.

---

## 7. Tell OpenRouter the public address

`app/api/chat/route.ts` sends this header today:

```ts
"HTTP-Referer": "http://localhost:3001",
```

OpenRouter uses that header as the site the request came from. On Vercel the site is no longer localhost. Change the header so it uses the address of the deployment. Above the `POST` function, read the URL Vercel provides, and fall back to localhost for `npm run dev`:

```ts
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";
```

Use it in the `fetch` headers:

```ts
"HTTP-Referer": siteUrl,
```

`NEXT_PUBLIC_SITE_URL` is public by design. It is only the site address, not the API key. Set it in two places.

**On your machine**, add a line to `.env` (the key line stays as it is):

```
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

**On Vercel**, Project → Settings → Environment Variables, add:

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://ricardo-lousada.vercel.app` |

Use the real URL from the deployment screen, including `https://`. Apply it to Production.

Commit and push. Vercel starts a new deployment by itself.

```powershell
git add app/api/chat/route.ts
git commit -m "Send the public site URL to OpenRouter"
git push
```

Wait until the Vercel dashboard says that deployment is Ready. The previous deployment is still the one without this change until the new one finishes.

---

## 8. Check the live site

On the Vercel URL, not on localhost:

1. The home page shows the name, the career journey, and the contact section.
2. A case-study link such as `/work/ai-consulting` opens.
3. **Ask the twin** opens the panel. Ask “What are you doing at DXC?”. The first reply can take about twenty seconds. The answer should mention Director of AI Consulting at DXC in Portugal.
4. If the panel says “The digital twin is not configured yet,” the key is missing or was added after the deployment. Add `OPENROUTER_API_KEY` and use Deployments → the latest one → Redeploy. Environment variables are copied in at build and runtime start, so a running deployment does not notice a variable you add later until you redeploy.

Local `npm run dev` is unchanged. Keep using [http://localhost:3001](http://localhost:3001) while you edit. Port 3000 may still be taken by another program; that only affects your machine.

---

## 9. Publish a later change

Edit the files, then:

```powershell
git add .
git status
git commit -m "Describe what you changed"
git push
```

Check `git status` whenever you are unsure. `.env` must stay unlisted. Every push to `main` builds a new production deployment. Vercel keeps the old ones, so you can roll back from the Deployments list if a build is wrong.

---

## 10. A custom domain, when you want one

Vercel’s free `*.vercel.app` address is enough to start. To use your own domain later: Project → Settings → Domains → add the domain and follow the DNS records Vercel shows. After the domain works, change `NEXT_PUBLIC_SITE_URL` to that `https://` address and redeploy.

---

## If something fails

| What you see | What it usually means |
| --- | --- |
| Build failed on Vercel | Open the failed deployment and read the log. A missing install or a TypeScript error fails the build the same way `npm run build` would fail locally. |
| Twin says it is not configured | `OPENROUTER_API_KEY` is absent on that environment, or you have not redeployed since adding it. |
| Twin says it is busy | The free Nemotron route returned HTTP 429. Wait and ask again. A public URL can hit that limit sooner than your laptop. |
| `git push` rejected | The GitHub repo was created with a README. Either delete that repo and make an empty one, or ask Git to combine the histories only if you understand the extra commit. An empty repo avoids this. |
| `.env` showed up on GitHub | Revoke the OpenRouter key, create a new one, put the new one in `.env` and in Vercel, and do not push the old key again. Removing a file in a later commit does not erase it from older commits. |

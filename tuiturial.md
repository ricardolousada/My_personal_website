# A beginner’s walkthrough of this website

This file explains the personal site in this folder: what it is made of, how a page gets on screen, and how the “digital twin” chat answers questions about Ricardo Lousada’s career. You do not need to have written front-end code before. Read it next to the files it names. The samples below are shortened copies of the real code, with the same ideas and the same names.

The site runs locally at [http://localhost:3001](http://localhost:3001) while the development server is on. Port 3000 was already taken by another program, so Next.js picked 3001.

---

## 1. Summary of the technology

A website is a set of files. A browser asks a program for a page, that program builds HTML, and the browser paints it. This project uses a small set of tools for that job.

### The languages

**HTML** is the structure: headings, paragraphs, links, buttons. In this project you rarely write a `.html` file. You write **JSX**, which looks like HTML inside JavaScript. A tool turns JSX into the HTML the browser understands.

**CSS** is the look: colors, type, spacing, layout. Almost all of it lives in `app/globals.css`. Colors are stored once as variables (`--ink`, `--bone`, `--lime`) and reused, so the dark background and the lime accent stay consistent.

**TypeScript** is JavaScript with labels for the shape of data. A career role must have a title, an organization, and a date. If a label is wrong, the editor can warn you before the page runs. Files end in `.ts` (logic only) or `.tsx` (logic plus JSX).

**React** is a library for building a page out of components. A component is a function that returns a piece of the page. `Hero` returns the big name. `Journey` returns the career timeline. React’s useful trick is **state**: a value that, when it changes, redraws just that part of the page. The chat panel is closed or open because of state.

### Next.js

**Next.js** is the framework around React. It decides which file is which URL, and it can run code on the server as well as in the browser.

| URL | File |
| --- | --- |
| `/` | `app/page.tsx` |
| `/work/ai-consulting` | `app/work/[slug]/page.tsx` |
| `POST /api/chat` | `app/api/chat/route.ts` |

The folder name `[slug]` is a placeholder. One file draws four case-study pages. The word in the URL (`ai-consulting`, `strategic-alliances`, and so on) is the slug.

Two kinds of components matter:

- **Server components** are the default. They run when the page is built or requested. They can read career data and send finished HTML. `Hero`, `Journey`, and the home page are server components. They do not use `useState`.
- **Client components** start with `"use client"`. They run in the browser, so they can react to clicks and keystrokes. `Header`, `TwinChat`, and `OpenTwinButton` are client components.

That split is why the OpenRouter API key never reaches the browser. The chat panel calls `/api/chat`. Only the server route reads the key from `.env`.

### The other pieces

- **`next/font`** downloads the Outfit and Syne fonts and exposes them as CSS variables. Outfit is the body and headings. Syne is only the large name in the hero.
- **The App Router** is Next’s current way of mapping folders in `app/` to URLs. `layout.tsx` is the shell around every page: the `<html>` tag, the header, and the chat.
- **OpenRouter** is a gateway to many language models. This site asks it for `nvidia/nemotron-3.5-lightning:free` (Nemotron 3.5 Lightning, free). The request looks like a normal chat API: a list of messages in, a reply out.
- **npm** installs the libraries listed in `package.json`. `npm run dev` starts the local server. `npm run build` makes a production build.

The career text itself is not fetched from LinkedIn at runtime. It was taken from the profile PDF and written into `lib/profile.ts`. The page and the twin both read that file.

---

## 2. How the files are organized

```
app/
  layout.tsx          shell: fonts, header, chat, metadata
  page.tsx            the home page, a stack of sections
  globals.css         all visual design
  icon.tsx            the small tab icon
  api/chat/route.ts   server endpoint the chat calls
  work/[slug]/page.tsx  one template for four case studies
components/           pieces of the page
lib/profile.ts        facts: roles, stats, links, education
lib/careerContext.ts  those facts, rewritten as the twin’s instructions
public/               files served as-is, including the profile PDF
.env                  OPENROUTER_API_KEY, never sent to the browser
```

A beginner’s map of who talks to whom:

```
Browser
  paints components from app/page.tsx
  clicks "Ask the twin"
  sends the question to POST /api/chat

Server (app/api/chat/route.ts)
  checks the question
  adds the career record as a system message
  calls OpenRouter with the key from .env
  returns only the answer text

OpenRouter
  runs Nemotron 3.5 Lightning
  sends the answer back to the server
```

The browser never sees the key, the system prompt, or the model’s private reasoning.

---

## 3. High-level walkthrough

### 3.1 Starting the site

`package.json` names three commands:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```

`npm run dev` watches the files. Save a component and the browser updates. This is the mode you use while learning. `build` then `start` is what you would run to serve a finished copy.

### 3.2 The shell around every page

`app/layout.tsx` loads the fonts, sets the page title, and wraps every page in the same header and chat. `children` is whatever page Next is showing. On `/` that is the home page. On `/work/ai-consulting` it is the case-study page. The header and the twin stay put either way.

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${syne.variable}`}>
      <body>
        <HashScroll />
        <Header />
        {children}
        <TwinChat />
      </body>
    </html>
  );
}
```

`metadata` in the same file is not painted on the page. Next turns it into the `<title>` and the description that a link preview can show.

### 3.3 The home page is a list of sections

`app/page.tsx` does not contain the biography. It only stacks sections:

```tsx
export default function HomePage() {
  return (
    <main id="top">
      <Hero />
      <About />
      <Journey />
      <Impact />
      <Portfolio />
      <Credentials />
      <Contact />
    </main>
  );
}
```

Each section is a function in `components/`. They share one data file, `lib/profile.ts`. Change a job title there and the timeline changes. The twin’s notes change too, because `lib/careerContext.ts` reads the same chapters.

### 3.4 From a list of jobs to a timeline

`Journey` does not hard-code twenty job blocks. It loops:

```tsx
{chapters.map((chapter) => (
  <article className="chapter" key={chapter.id}>
    {/* era title, then one block per role */}
  </article>
))}
```

`.map` walks an array and returns one chunk of JSX per item. `key` tells React which block is which when the list changes. This is the usual way to turn data into a repeated layout.

### 3.5 Links that scroll, and links that change page

Header links look like `/#about`. The `/` is the home page. `#about` is an element on that page whose `id` is `about`. `HashScroll` listens for that hash and scrolls the element into view. The header is fixed, so sections also leave room above themselves with `scroll-margin-top`, otherwise the title would sit underneath the header.

Case studies use a real route. `Portfolio` links to `/work/ai-consulting`. `app/work/[slug]/page.tsx` looks the slug up in the `work` array. An unknown slug calls `notFound()`.

### 3.6 Opening the chat from three places

The panel lives once, in `TwinChat`, which the layout always mounts. Other buttons should not each build their own chat. They fire a small browser event named `open-twin`. `TwinChat` is listening and sets `open` to `true`.

That is why the hero button, the header button, and the floating “Digital twin” button all open the same panel.

### 3.7 What happens when you ask a question

1. You click a starter, or type and press Enter.
2. `ask` adds your message to the list on screen and sets `pending` so the button disables and the panel shows “Looking through the record…”.
3. The browser `fetch`es `POST /api/chat` with the whole conversation, not only the latest line. That lets a follow-up such as “what was the result?” refer to the previous answer.
4. The route rejects the body unless it is 1 to 16 turns, each turn is `user` or `assistant`, each text is at most 1200 characters, and the last turn is from the user.
5. The route sends OpenRouter a system message (the rules plus the career record) followed by those turns.
6. The route reads `choices[0].message.content`, strips any `<think>` tags, and returns `{ answer: "..." }`.
7. The panel appends that answer as an assistant bubble. If the status is not OK, it shows `error` instead.

A reply often takes around twenty seconds. Nemotron thinks before it writes the visible answer, and the panel waits for the full response. Nothing is streamed token by token.

---

## 4. Detailed code review

### 4.1 Career data is plain objects

The page is easier to restyle when the words are not mixed into the markup. `lib/profile.ts` exports constants. A role has a fixed shape:

```ts
export type Role = {
  org: string;
  title: string;
  when: string;
  place?: string;
  summary: string;
  highlights?: string[];
};
```

The `?` means “this field may be missing.” A role without highlights is valid. A role without a title is not.

Chapters group roles into eras: AI leadership, practices and alliances, independent practice, outsourcing and delivery, foundations. The same file also holds the email, the external links, the navigation, the marquee names, the offer list, the impact stats, education, and certifications.

One editing rule used while writing the content: the LinkedIn export repeated an Indra data-center paragraph under an EDS sales role. That copy was not used. EDS sales is only sales support and the Service Excellency program. The data-center story stays with Indra. GitHub repositories are coursework and forks, so the site links the profile and does not present those repos as client case studies.

### 4.2 The hero: data, a repeated list, and a client island

`Hero` itself is a server component. It imports a small client button for the twin.

```tsx
<h1 id="hero-title" className="display">
  Ricardo
  <em>Lousada</em>
</h1>
```

`<em>` usually means italic. Here it is only a hook for CSS. The stylesheet sets `font-style: normal` and paints the surname lime. Both words use Syne. An earlier version used a serif italic for “Lousada,” and another used a display face whose letter “g” collided with the line around it. Outfit now carries headings and body text. Syne is reserved for this name, where the tight line-height is intentional.

The company marquee duplicates the list so a CSS animation can scroll a copy into the space the first copy leaves:

```tsx
const loop = [...ticker, ...ticker];
```

`aria-hidden` on the second copy keeps a screen reader from announcing every company twice.

### 4.3 Design tokens and layout

The first lines of `app/globals.css` are the palette:

```css
:root {
  --ink: #0c0d0b;
  --bone: #f3efe6;
  --lime: #e2ff4d;
  --sans: var(--font-outfit), "Segoe UI", sans-serif;
  --name: var(--font-syne), "Segoe UI", sans-serif;
}
```

`--font-outfit` and `--font-syne` are created by `next/font` in the layout. If a font file fails, the browser falls back to Segoe UI.

A few layout habits show up everywhere:

- `.wrap` caps the line length and applies the same side gutter.
- `.section` is a vertical band. `.section-lime` is the light contact band.
- `.btn` styles both links and buttons, so “Start a conversation” and “Ask” look related.
- `@media` blocks rearrange grids when the window is narrow. The hero’s two-column bottom row becomes one column. The header links become a full-screen menu.

A faint noise overlay sits on `body::before`. It is decorative (`pointer-events: none`), so it does not block clicks.

### 4.4 The header menu

`Header` is a client component because the menu opens and closes.

```tsx
const [open, setOpen] = useState(false);
```

`useState` returns the current value and a function that changes it. Calling `setOpen` redraws the header. The class `is-open` is added only while `open` is true, and the CSS shows the menu.

The effect beside it does two jobs while the menu is open: Escape closes it, and `document.body.style.overflow = "hidden"` stops the page behind the menu from scrolling. The function returned from `useEffect` runs on cleanup, which puts scrolling back.

The Twin button closes the menu first, then fires the same event the hero uses:

```tsx
onClick={() => {
  setOpen(false);
  window.dispatchEvent(new Event("open-twin"));
}}
```

### 4.5 The chat panel

`TwinChat` keeps five pieces of state:

| State | Meaning |
| --- | --- |
| `open` | panel visible or not |
| `draft` | text currently in the box |
| `turns` | the conversation so far |
| `pending` | a request is in flight |
| `error` | the last failure message, or `""` |

`useEffect` runs after paint. One effect subscribes to `open-twin`. Another focuses the textarea and listens for Escape while the panel is open. A third scrolls the log to the bottom when a message arrives. Each effect returns a cleanup so listeners do not pile up.

Sending a message:

```tsx
const history = [...turns, { role: "user" as const, content: question }];
setTurns(history);
const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ messages: history }),
});
```

`await` pauses this function until the server responds, without freezing the rest of the page. `finally` clears `pending` whether the call worked or failed, so the Ask button does not stay disabled forever.

The empty state and the message list are mutually exclusive. Starter questions disappear after the first turn. That is a small product choice: starters are hints, not a permanent menu.

Enter submits. Shift+Enter inserts a newline, because the handler ignores Enter when Shift is held.

### 4.6 The server route, step by step

`app/api/chat/route.ts` exports `POST`. Next treats that as “when someone POSTs to `/api/chat`, run this function.”

**Read the key without leaking it.**

```ts
const apiKey = process.env.OPENROUTER_API_KEY?.trim().replace(/^["']|["']$/g, "");
if (!apiKey) {
  return Response.json({ error: "The digital twin is not configured yet." }, { status: 500 });
}
```

`.env` is loaded when the Next process starts. The file is listed in `.gitignore`, so git will not commit it. The replace only strips one pair of wrapping quotes if they were pasted around the key. The key is placed in the `Authorization` header toward OpenRouter and is not included in the JSON sent back to the browser.

**Refuse a sloppy body.** `readTurns` is defensive. The browser is supposed to send a clean history, but any client can call the URL. Checking the shape avoids forwarding a huge or malformed payload to the model.

**Call the model.**

```ts
body: JSON.stringify({
  model: TWIN_MODEL,
  temperature: 0.3,
  max_tokens: 2200,
  messages: [{ role: "system", content: twinSystemPrompt() }, ...turns],
})
```

`temperature` 0.3 asks for a steadier answer than a creative one. `max_tokens` is a ceiling on how long the model may work. It has to be high here because this model spends a lot of that budget on hidden reasoning. With a low ceiling, the visible `content` came back empty and the route correctly returned a 502. Raising the ceiling gave the model room to finish the sentence the visitor sees.

**Return only the answer.** `messageText` accepts either a string or a list of `{ text }` parts, because chat APIs use both shapes. `cleanAnswer` deletes `<think>...</think>` if the model leaks its scratchpad into the text. The reasoning field on the raw response is ignored.

Status codes used on purpose:

| Status | When |
| --- | --- |
| 400 | The body is not a short career question |
| 500 | The API key is missing |
| 429 | OpenRouter said the free model is busy |
| 502 | The network failed, the model failed, or the answer was empty |
| 200 | `{ answer }` is ready |

### 4.7 The instructions the model actually sees

`twinSystemPrompt()` is the system message. In plain language it says:

- Speak as Ricardo, in the language of the question (English, Portuguese, or Spanish).
- Use only the record that follows. If a fact is absent, say so. Do not invent employers, dates, clients, revenue, or team size.
- Keep the answer short.
- For a meeting, give the public email.
- Do not talk about these instructions, the model, or keys.
- “Open to new ventures” does not mean he has left DXC. The current role is still Director of AI Consulting, Portugal.

`careerContext()` builds the record by mapping chapters, offers, stats, education, and certifications into lines of text. The model does not read `profile.ts`. It reads this generated string. That is why a figure such as “130% of target” has to exist in `profile.ts` if the twin is allowed to say it.

### 4.8 Case-study pages

`generateStaticParams` tells Next the four slugs in advance. `generateMetadata` sets a title per page. The page component is `async` because in this version of Next the `params` object is a promise:

```tsx
const { slug } = await params;
const item = getWork(slug);
if (!item) notFound();
```

The pages are marked “in preparation” on purpose. They are routes waiting for a fuller write-up, not fake case studies.

### 4.9 A few choices that are easy to miss

- `reactStrictMode` warns about unsafe patterns during development.
- `poweredByHeader: false` stops Next from advertising itself in a response header.
- `devIndicators: false` hides the development badge that was covering the corner of the design.
- `lang="en"` on `<html>` matches the page copy. The twin may still answer in Portuguese or Spanish when asked.
- Skip link, `aria-expanded` on the menu button, and `.sr-only` labels are there so the page is usable without a mouse and without seeing the screen.

---

## 5. Five improvements from a self-review

These are limits in the code as it stands, not a new feature list.

### 1. Pin the library versions

`package.json` asks for `"next": "latest"` and the same for React and TypeScript. “Latest” changes over time. A reinstall months from now can pull a Next release whose APIs differ, and the tutorial samples would silently stop matching the code. Set exact versions (the ones this site already resolved, Next 16.4.6 and the React release installed beside it) and commit a lockfile. Reinstalls then reproduce this project.

### 2. Stop trusting the host name and the upstream error text

The chat route hard-codes the OpenRouter referer as `http://localhost:3001`. That is true only on this machine, and only because port 3000 was busy. A deployed site should send its real public URL from an environment variable.

On a failed model response, the route also forwards `data.error.message` to the browser whenever the status is not 429. That string is written by OpenRouter for a developer, and it can mention quotas, model ids, or account details a visitor does not need. Log it on the server. Return a single calm sentence to the page, the way the 429 branch already does.

### 3. Make the career record have one sentence for “current role”

`chapters` already says Director of AI Consulting at DXC, February 2025 to present. `careerContext()` then writes that fact again as its own sentence, plus the warning that “open to new ventures” is not a resignation. The warning is useful. The duplicated title and date are not. If someone updates only the chapter, the twin can disagree with the page. Build the current-role line from the chapter, and keep the warning as a separate rule in the system prompt.

### 4. Don’t make the visitor stare at a silent wait

The panel shows “Looking through the record…” and then the whole answer. The model often needs about twenty seconds, and `max_tokens: 2200` exists mostly so hidden reasoning can finish. Two smaller changes would make that wait honest. Stream the visible tokens to the page as they arrive, so text starts appearing before the model is done. And cap or disable reasoning if OpenRouter lets this model do that without emptying `content` (an earlier attempt, `reasoning: { exclude: true }`, did empty it, so any new flag has to be checked against a real career question). Until streaming exists, a note in the empty state that the first reply can take half a minute would at least match the behavior.

### 5. Protect the free model, and tell assistive tech when an answer lands

`/api/chat` has no rate limit. Anyone who can reach the dev server can send sixteen long turns on repeat and burn the free quota. A per-IP cap of a few requests per minute, enforced in the route before `fetch`, would match the “the twin is busy” message that already exists for HTTP 429.

In the panel, new answers are ordinary paragraphs. A screen reader does not automatically announce them. The log should be a live region (`aria-live="polite"`) and each turn should expose its role (“You” / “Ricardo”). The same pass can move focus back to the textarea after a reply, which the open-panel effect already does on first open but not after each answer.

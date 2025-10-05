# 🌌 AuroraCast Studio

AuroraCast Studio is a reimagined audio workspace for creators who want AI-native tooling without losing editorial control. The interface blends a strategic "Creator Cockpit" with momentum insights, trending voice textures, and a refreshed listening surface so you can move from idea to published show in a single flow.

> **Why this rebuild?** The original Podcastr template has been redesigned from the ground up: new branding, navigation, information architecture, and data visualisations turn it into a creator-first dashboard rather than a simple listing app.

---

## ✨ Highlights
- **Creator Cockpit:** A glassmorphism toolbar summarises output velocity, listener minutes, and gives jump-in shortcuts to the AI studio.
- **Momentum Insights:** A context panel surfaces trending episodes, rising creators, and session blueprints tailored to your account state.
- **Voice Texture Board:** Discover the standout episodes for each AI voice model with one-click previews.
- **Heroic Launchpad:** The homepage hero spotlights the strongest performing story while giving instant access to creation tools.
- **Responsive top navigation:** Consolidated control centre with global search, quick actions, and Clerk authentication.

---

## 🧭 User Flow
1. **Sign in** with Clerk to unlock the cockpit metrics and the collaborative studio.
2. **Browse the overview** dashboard for trending releases, fresh uploads, and voice highlights.
3. **Jump into the Studio** (`/create-podcast`) to script with AI prompts, upload narration, and craft cover art.
4. **Share or manage episodes** from the profile view—listener stats update in real time from Convex.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router, client components for interactive surfaces)
- **Backend & storage:** Convex for serverless data, actions, and file storage
- **Auth:** Clerk (multi-tenant ready)
- **Styling:** Tailwind CSS with a custom Aurora palette + shadcn/ui primitives
- **AI Integrations:** OpenAI (voice + image generation hooks)
- **Utilities:** React Hook Form, Zod, UploadStuff for asset ingestion

---

## 🚀 Getting Started
```bash
# 1. Clone under your namespace
git clone https://github.com/Spandan-2002/Podcastr auroracast
cd auroracast

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local   # create this file with the keys below

# 4. Run the dev server
npm run dev
```
Visit <http://localhost:3000> to explore the dashboard.

### Required Environment Variables
| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key for the client SDK |
| `CLERK_SECRET_KEY` | Server-side Clerk key (used by Convex tasks) |
| `CLERK_WEBHOOK_SECRET` | Validates Clerk webhooks routed through Convex |
| `NEXT_PUBLIC_CONVEX_URL` | Convex deployment URL |
| `CONVEX_DEPLOYMENT` | Convex deployment identifier (used by CLI) |
| `OPENAI_API_KEY` | Enables AI voice + image generation |

---

## 🧱 Project Structure
```
app/                   # Next.js routes and layouts
components/            # Reusable UI (CreatorToolbar, InsightsPanel, etc.)
convex/                # Convex mutations/queries (podcast workflow, auth glue)
providers/             # Audio + Convex/Clerk context providers
public/                # Icons, imagery, static assets
types/                 # Shared TypeScript contracts
```

Key UX modules introduced in this redesign:
- `components/MainHeader.tsx` – sticky top navigation with global search and auth controls.
- `components/CreatorToolbar.tsx` – creator metrics and quick actions.
- `components/InsightsPanel.tsx` – momentum insights, trending shows, and blueprint tips.
- `convex/podcasts.ts` – new queries (`getRecentlyPublishedPodcasts`, `getVoiceTypeHighlights`) supporting the homepage surfaces.

---

## 🧪 Suggested QA Checklist
- Sign in/out with Clerk and confirm the cockpit metrics update after publishing a show.
- Record or upload a sample episode, then refresh the overview to see it in "Fresh uploads".
- Test the global search in the header and the Discover page debounce search.
- Verify the audio player still pins to the bottom across routes.

---

## 🗺️ Roadmap Ideas
- Inline episode edits with waveform annotations in the studio.
- Collaborative sessions with presence indicators driven by Convex actions.
- Advanced analytics (retention curves, top listener segments).
- Native theming (light mode / accent presets) with persisted preference.

---

## 📬 Contact
- Issues & feature ideas: [GitHub Issues](https://github.com/Spandan-2002/AuroraCast/issues)
- Direct email: [spandan.rout@nyu.edu](mailto:spandan.rout@nyu.edu)

Enjoy crafting immersive audio stories! 🎧

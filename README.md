# 🌌 AuroraCast Studio

**AuroraCast Studio** is an **AI-native audio creation platform** built entirely from scratch — designed for creators who want the power of generative tools **without losing editorial control**.  
It merges **Next.js 15**, **Convex**, **Clerk**, and **OpenAI** into a fluid, responsive workspace that lets you move seamlessly from idea → narration → analytics → publication.

AuroraCast redefines what an audio dashboard can be — not just a list of episodes, but an intelligent, data-driven environment that adapts to the creator’s momentum.

---

## ✨ Highlights

- **🎛️ Creator Cockpit:** Real-time metrics summarizing listener minutes, publishing velocity, and engagement rate — all at a glance.
- **📈 Momentum Insights:** Smart analytics surfacing trending episodes, rising creators, and AI-generated blueprint suggestions.
- **🎙️ Voice Texture Board:** Explore, preview, and compare standout AI voice models with one-click playback.
- **🚀 Heroic Launchpad:** A dynamic homepage spotlighting your top-performing story with instant access to creation tools.
- **🧭 Unified Navigation:** A global command bar with search, quick actions, and secure Clerk authentication — fully responsive and glassmorphic.

---

## 🧭 User Flow

1. **Sign in** securely with Clerk to unlock cockpit metrics and collaborative studio features.  
2. **Browse the dashboard** to discover trending releases, recent uploads, and personalized voice insights.  
3. **Jump into the Studio (`/create-podcast`)** to script using AI prompts, record or upload narration, and design custom cover art.  
4. **Publish and manage** your episodes from the profile view — listener stats update in real time through Convex.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-------------|----------|
| **Framework** | [Next.js 15](https://nextjs.org/) | Modern React App Router + Client Components |
| **Backend / Data** | [Convex](https://www.convex.dev/) | Serverless database, mutations, file storage |
| **Authentication** | [Clerk](https://clerk.com/) | Multi-tenant auth and user management |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) | Custom Aurora palette + design primitives |
| **AI Integrations** | [OpenAI API](https://platform.openai.com/) | Voice synthesis, script assist, image generation |
| **Utilities** | React Hook Form, Zod, UploadStuff | Schema validation + media ingestion |

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Spandan-2002/AuroraCast-Studio.git
cd AuroraCast-Studio

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local   # create local env file

# 4. Run the development server
npm run dev
```


---

Visit <http://localhost:3000> to explore the AuroraCast dashboard.

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

## ChangeWander — MVP Requirements

### 1) Context and Goal
- **Problem**: People want to discover and share places where positive environmental or social change is visible (e.g., new bike lanes, tree planting, community cleanups), but these are scattered across personal feeds and are hard to find later.
- **Goal**: Ship an MVP mobile app (Expo/React Native) that lets users explore a map/feed of “changes,” view details, and contribute new changes with lightweight metadata and photos.
- **Primary Outcome**: Weekly active contributions (adds or meaningful reactions) and successful place discovery sessions.

### 2) MVP Scope (What’s In)
- **Explore**: Map/list of changes near the user; search by keyword/location.
- **Change Details**: Title, description, photos, tags, location, timestamp, author; basic reactions and comments.
- **Contribute**: Add a new change with geolocation, photo upload (from gallery or camera), tags, and description.
- **Accounts (Lightweight)**: Email or social sign-in; anonymous browse allowed; attribution required to post.
- **Profile**: Minimal profile with user’s contributions.
- **Notifications (Optional v1.1)**: Local reminder to contribute; push deferred.

### 3) Out of Scope (For Later)
- Advanced moderation workflows, admin dashboard.
- Complex gamification (badges, points), advanced social graph.
- Offline-first sync, drafts.
- Complex collections/routes and multi-language i18n.

### 4) Target Platforms
- **iOS** and **Android** via Expo. Web support is nice-to-have for read-only explore.

### 5) Core User Personas
- **Explorer**: Wants to find inspiring local changes quickly.
- **Contributor**: Wants to document and share a change on the spot.
- **Community Organizer**: Wants to show impact and direct people to locations.

### 6) Core User Stories
- As an Explorer, I can see a map/list of nearby changes so I can discover what’s new.
- As an Explorer, I can search by keyword or area so I can plan a visit.
- As a Contributor, I can add a change with photo, title, description, tags, and location.
- As a Contributor, I can edit or delete my own change.
- As a User, I can react (like/🌱) and comment on a change to show support.
- As a User, I can view my contributions on my profile.
- As an Anonymous visitor, I can browse explore and details without signing in.

### 7) Functional Requirements
- **Explore**
  - Map with markers clustered at higher zoom levels.
  - List view with infinite scroll; toggle between map/list.
  - Filters: tags, timeframe (e.g., last 30 days), distance radius.
  - Search: free-text (title/description/tags) and by location.
- **Change Details**
  - Fields: id, title, description, tags, geocoordinates, address (reverse geocode), createdAt, updatedAt, author, photos[] (first as cover), reactionsCount, commentsCount.
  - Actions: react/unreact, add comment, report content.
- **Create/Edit Change**
  - Attach photo from camera or gallery; compress before upload.
  - Auto-capture GPS location; allow map pin adjust.
  - Tagging via predefined tags + freeform (max 3 tags total).
  - Client-side validation: required fields, photo size/format.
- **Auth**
  - Sign in with email link or OAuth (Google/Apple) if available; anonymous browsing allowed.
  - Users must be signed in to create, react, or comment.
- **Profile**
  - Show display name, avatar (optional), and user’s changes.

### 8) Non-Functional Requirements
- **Performance**: First contentful explore screen < 2.5s on mid-tier device; map pan update < 400ms.
- **Availability**: 99.5% for backend services during MVP.
- **Privacy**: Store only necessary PII; allow account deletion; redact EXIF geolocation from images server-side if not needed beyond coordinates field.
- **Accessibility**: WCAG AA color contrast, scalable fonts, VoiceOver labels.
- **Security**: JWT-based auth; server validates all writes; rate limit create/comment/react endpoints.

### 9) Screens (Minimum)
- **Tabs**: Home/Explore, Add, Profile, Settings (basic)
- **Explore**: Map + List toggle; filters; search bar.
- **Change Details**: Photo carousel, metadata, actions.
- **Create/Edit Change**: Form + map picker + camera/gallery.
- **Auth**: Minimal sign-in/up flow; fallback email link.
- **Profile**: User info + contributions.

### 10) Navigation
- **Bottom Tabs**: Explore, Add, Profile.
- **Stacks**: ExploreStack (Explore → Details), AddStack (Create/Edit), ProfileStack.

### 11) Data Model (v0)
- **User**: id, displayName, avatarUrl?, createdAt.
- **Change**: id, userId, title, description, tags[], lat, lon, address?, photos[], createdAt, updatedAt, reactionsCount, commentsCount, status (active/flagged/removed).
- **Reaction**: id, changeId, userId, type (like/seed), createdAt.
- **Comment**: id, changeId, userId, text, createdAt.

### 12) API (MVP)
- `GET /changes?lat,lon,radius,search,tags,after` → list
- `GET /changes/:id` → detail
- `POST /changes` → create (auth)
- `PATCH /changes/:id` → update (owner)
- `DELETE /changes/:id` → delete (owner/admin)
- `POST /changes/:id/react` and `DELETE /changes/:id/react`
- `GET/POST /changes/:id/comments`
- `GET /users/:id` and `GET /users/:id/changes`

### 13) Analytics (MVP)
- AppOpen, ExploreViewed, MapMoved, SearchExecuted, FilterApplied
- ChangeViewed, ChangeCreated, ReactionAdded, CommentAdded
- SignInStarted, SignInCompleted

### 14) Content and Moderation
- Basic profanity filter on client and server.
- Report flow: `POST /changes/:id/report` with reason.
- Admin moderation is manual/out-of-band in MVP; auto-hide when flagged ≥ N times.

### 15) Image Handling
- Client-side compression; max 2048px longest edge.
- Accept JPEG/PNG/HEIC; convert to web-friendly on server; strip EXIF except orientation.

### 16) Performance/Tech Notes
- Use map clustering; debounce map queries; paginate list.
- Cache recent changes locally; optimistic updates for reactions/comments.

### 17) Success Metrics (North-star and Guardrails)
- ≥30% of signed-in weekly users contribute at least one action (create/react/comment).
- Median time-to-first-result on Explore < 2.5s.
- Day-7 retention ≥ 20% of first-week contributors.
- < 2% content flagged as inappropriate per week.

### 18) Release Plan
- v0.1: Read-only Explore + Details.
- v0.2: Create Change + basic auth.
- v0.3: Reactions + Comments + Profile.
- v1.0: Polishing, accessibility, performance, light moderation.

### 19) Risks and Mitigations
- Low-quality/duplicate posts → Add lightweight guidance, de-dup check by location/time.
- Privacy concerns with precise locations → Round coords to ~10–30m when displayed.
- Abuse/spam → Rate limiting, profanity filters, reporting threshold auto-hide.

### 20) Open Questions
- Preferred auth providers for target audience?
- Tag taxonomy: fixed list vs community-driven?
- Do we need routes/collections in MVP or post-MVP?



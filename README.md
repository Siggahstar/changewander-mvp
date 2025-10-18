# 🌍 ChangeWander — Wander Without Worry, Change Handled

### 🚀 Version: v0.2.0 — Teal Revamp & Page Redesign (October 2025)

ChangeWander is a **cashless travel companion** for Portugal’s 29–33 million annual tourists and 50,000+ local vendors.  
Our MVP simplifies payments, AR exploration, and eco-donations — all through a no-NIF wallet.

Built with **Expo SDK 54**, **React Native**, and a sleek **teal UI**, ChangeWander empowers visitors to travel, pay, and explore without friction.

---

## 🧭 **Current Build Overview (v0.2.0)**

### ✨ **Screens**
| Screen | Description | Status |
|:-------|:-------------|:--------|
| 🏠 **Home** | Entry screen with hero image, quick links, and featured vendors. | ✅ Stable |
| 💳 **Wallet** | Displays balance, top-up button, and transaction list. | ✅ Revamped |
| 🚌 **Transport** | Shows QR ticket placeholder, active passes, and upcoming routes. | ✅ Revamped |
| 🏛️ **AR Guide** | Explorable cultural landmarks with “View in AR” CTA. | ✅ New |
| 🧭 **Navigation** | Minimal bottom tab bar with teal theme and icons. | ✅ Polished |

---

## 🎨 **Design Highlights**
- Teal-accented minimal layout (inline React Native styles).
- Cross-platform tested on Expo Go (iOS, Android, Web).
- Material and Ionicons used for crisp UI icons.
- No Tailwind or Babel overhead — smooth and portable setup.

---

## ⚙️ **Tech Stack**
| Layer | Framework / Tool | Purpose |
|:------|:-----------------|:---------|
| UI / UX | React Native (Expo SDK 54) | Cross-platform mobile/web app |
| Routing | Expo Router | Tab navigation and page transitions |
| Icons | Ionicons, MaterialCommunityIcons | Navigation icons |
| Styling | Inline React Native Styles | Lightweight, Babel-free setup |
| Future | Supabase / Stripe / ARKit | Payments, auth, AR integration |

---

## 🧩 **Folder Structure**


app/
├─ (tabs)/
│ ├─ index.tsx → Home screen
│ ├─ wallet.tsx → Wallet screen
│ ├─ transport.tsx → Transport screen
│ ├─ ar-guide.tsx → AR Guide screen
│ └─ _layout.tsx → Bottom navigation layout
├─ assets/ → App icons & images
metro.config.js
package.json
CHANGELOG.md



---

## 🧪 **Testing**
**Verified on:**
- ✅ Expo Go (Android, iOS)
- ✅ Expo Web (`expo start --web`)
- ✅ Clean bundling, no Babel or Tailwind conflicts

---

## 🧱 **Installation**

```bash
# 1️⃣ Clone the repo
git clone https://github.com/Siggahstar/changewander-mvp.git
cd changewander-mvp

# 2️⃣ Install dependencies
npm install

# 3️⃣ Start the project
npx expo start

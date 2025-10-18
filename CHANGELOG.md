# 🧭 ChangeWander Changelog

## v0.2.0 — Teal Revamp & Page Redesign (October 2025)
**Status:** Released on `main`

### ✨ Overview
This version introduces a full **UI/UX revamp** of the ChangeWander MVP — simplifying navigation, improving screen consistency, and unifying the color scheme with the ChangeWander teal brand identity.

---

### 🔹 Added
- **AR Guide Page** — interactive screen showcasing Portugal’s cultural landmarks (Belém Tower, Sintra Palace, Porto Ribeira) with “View in AR” CTA.  
- **Wallet Page** — redesigned wallet view with teal header card, balance display, and transaction list.  
- **Transport Page** — new transport pass overview with bus icon and QR placeholder.  
- **Teal Bottom Navigation** — unified tab bar for Home, Wallet, Transport, and AR Guide using Ionicons + MaterialCommunityIcons.  

---

### 🔹 Improved
- Inline styling replaces Tailwind/Babel configs for faster iteration and Expo SDK 54 compatibility.  
- Clean typography and consistent spacing across all screens.  
- Polished app bar height, shadows, and rounded corners for a minimalist teal aesthetic.  
- Web bundling errors resolved by simplifying Metro configuration.

---

### 🔹 Fixed
- Previous layout inconsistencies between iOS, Android, and Web builds.  
- Removed unused Tailwind dependencies causing Babel conflicts.  
- Navigation label misalignment and icon scaling on small devices.  

---

### 📦 Technical Notes
- Based on **Expo SDK 54**
- Tested on **Expo Go (Android, iOS, Web)**
- No external styling libraries required (pure React Native inline styles)
- Branch: `main` → `backup-main`
- Git commit: `revamp: updated Wallet, Transport, and AR Guide pages with clean teal design and layout fixes`

---

### 🚀 Next Planned Update (v0.3.0)
- Add **No-NIF Wallet onboarding flow**
- Integrate **AR camera & map overlay**
- Implement **shared theme constants** for color and spacing
- Add **user authentication screen (Supabase)**

---

**© 2025 ChangeWander Team**  
_“Wander Without Worry — Change Handled.”_

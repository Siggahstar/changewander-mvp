This workspace has a new TypeScript + Expo scaffold for ChangeWander.

Files added under `src/`:
- `api/supabaseClient.ts` - Supabase client using EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY
- `navigation/AppNavigator.tsx` - Bottom tabs navigator (Home, Wallet, AR, Transit, Profile)
- `components/shared` - ThemedView, Button, QRScanner
- `hooks/useWallet.ts` - React Query hook to fetch wallet data from Supabase
- `contexts/AuthContext.tsx` - Lightweight Supabase auth context
- `screens/*` - HomeScreen, WalletScreen, ProfileScreen, ARScreen, TransitScreen
- `utils/formatCurrency.ts` - Small helper
- `store/useZustand.ts` - Minimal Zustand store
- `App.tsx` - App entrypoint wiring QueryClient and AuthProvider

Recommended installs:

npm install @supabase/supabase-js react-query zustand @react-navigation/native @react-navigation/bottom-tabs expo-barcode-scanner

Note: Add TypeScript types and any peer dependencies for React Navigation and Expo as needed.

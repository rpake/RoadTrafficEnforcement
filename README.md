# Road Traffic Enforcement — UNITECH Semester Project

Student demonstration only. No government verification, official fine issuance, or payment collection.

## Setup
1. Install Node.js LTS, Expo Go compatible with the **class-approved SDK**. This project currently pins Expo SDK 54; change it only if your lecturer requires another version.
2. `npm install` then `npx expo install --check`.
3. Create a Supabase project. Run `supabase/schema.sql` in its SQL editor. Enable email/password authentication; configure email verification/reset URLs as appropriate.
4. Copy `.env.example` to `.env` and set `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` (publishable key only; NEVER service-role key).
5. `npx expo start --clear`, scan on physical Android with Expo Go.
6. Register with email, confirm if required, log in, create records. Test from a second device with the same account.
7. Run `npm run typecheck` and `npm test`. For web, note maps and native camera are primarily Android targets.

## Features
- Supabase registration/login/logout with persisted session and password reset email.
- Protected tabs; remote CRUD with ownership enforced by PostgreSQL RLS.
- QR/barcode scanning and local fine calculator (demonstration amounts only).
- GPS location and remote record markers on a map.
- Camera/photo capture and upload to private Supabase Storage, short-lived signed URLs.
- Local SQLite functionality retained from earlier starter as optional offline demo draft feature; remote CRUD requires network.
- Loading, error, retry, and empty states for main record list; basic validation on record form.

## External APIs
- expo-location (device location, permission request) + react-native-maps (map).
- expo-image-picker (camera capture) + Supabase Storage (cross-device photo persistence).
- Supabase Auth and PostgREST (authentication/database; not counted as the two extra APIs).

## Android builds
`npm install -g eas-cli`
`eas login`
`eas init`
`eas build --platform android --profile preview` (APK)
`eas build --platform android --profile production` (AAB)
Configure EXPO_PUBLIC variables for each EAS build profile using Expo EAS environment settings. Builds require an Expo account and network; they are NOT included in the source ZIP.

## Known limitations
- No official licence/vehicle registry, OCR number-plate recognition, payments, official infringement issuance, or administrator approval workflow.
- Fine amounts are illustrative; they must never be represented as official PNG penalties.
- Some original demo screens still use local-only records; use **Records** tab for assessable remote CRUD.
- Offline remote-write synchronization, comprehensive automated tests, and cross-platform web compatibility need further work.
- Remote fine amounts are calculated client-side for class demonstration, not trusted for real enforcement.
- Production-ready privacy review, signed APK/AAB testing, and stronger security controls remain required.

## Assessment documentation
See `TECHNICAL_REPORT_TEMPLATE.md`. Add your own student number, screenshots, EAS build IDs, test account and demonstration video. Use feature branches and commits over time.

## AI assistance declaration
ChatGPT was used to help generate and refactor TypeScript, Supabase schema, Expo navigation, and documentation. The student must review, test, understand, and take responsibility for submitted code.

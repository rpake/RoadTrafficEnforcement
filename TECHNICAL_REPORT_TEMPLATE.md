# Road Traffic Enforcement — Technical Report Draft

## Requirements / user stories
- MUST: As an officer, I want to register and log in so that I can access my records securely.
- MUST: As an officer, I want to create, read, edit, and delete offence records so that I can manage field reports.
- MUST: As an officer, I want to capture GPS and view recorded locations on a map so that I can review incident geography.
- MUST: As an officer, I want to upload photographs so that evidence is accessible on another device.
- SHOULD: As an officer, I want to scan QR codes so that I can populate driver details more quickly.
- COULD: As an administrator, I want to configure official offence codes after regulatory approval.

## Data model
Auth user (Supabase auth.users, id UUID) 1 → many violations (id UUID, user_id UUID FK, plate TEXT, driver_name TEXT, licence_number TEXT, fine_ids TEXT[], total_pgk NUMERIC, location TEXT, latitude FLOAT, longitude FLOAT, evidence_path TEXT, notes TEXT, created_at TIMESTAMPTZ).
Evidence is stored in a private Supabase Storage bucket, referenced by evidence_path.

## Screen flow
Unauthenticated → login / register / reset password → authenticated tabs → dashboard, scan, violations list, vehicles, profile. Violations list → create / detail → edit, upload evidence, delete. Dashboard → map → offence markers.

## API integration table
| Integration | API | Use | Failure handling |
|---|---|---|---|
| Device location | expo-location | GPS for offence record + map user marker | Permission denial shown, fallback map region |
| Camera and remote upload | expo-image-picker / Supabase Storage | Photograph evidence available on second device | Error text + retry action |
| Supabase | Auth, PostgREST, Storage | Authentication, CRUD, secure evidence | Loading, error, empty, success states |

## Build record — complete after EAS builds
- APK build ID: [fill in]
- AAB build ID: [fill in]
- EAS dashboard screenshot: [attach]
- APK installed and tested on physical Android: [date/device]

## Reflection (500–800 words)
Write your own account of implementation decisions, failures, removed scope, testing, and learning.

## Screenshots
Insert actual screenshots captured from your phone, not mockups.

# Specification

## Summary
**Goal:** Fix the admin redirect after login so that admin users are automatically redirected to /admin after successful Internet Identity authentication.

**Planned changes:**
- Debug and fix the authentication flow in LoginButton.tsx to ensure proper redirect timing
- Ensure the useIsAdmin hook correctly fetches admin status after authentication completes
- Fix the redirect logic to wait for admin status verification before executing the redirect
- Eliminate race conditions between authentication completion and admin status check

**User-visible outcome:** Admin users will be automatically redirected to the /admin page immediately after logging in via Internet Identity, while non-admin users remain on their current page.

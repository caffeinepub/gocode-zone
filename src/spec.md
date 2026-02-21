# Specification

## Summary
**Goal:** Implement a dual authentication system with a secret admin login at /admin and a regular user login in the header.

**Planned changes:**
- Create a dedicated admin login page at the /admin route with its own Internet Identity authentication interface
- Remove automatic admin redirect logic from the header Login button so regular users stay on their current page after authenticating
- Remove the Admin navigation link from the site navigation to keep /admin hidden
- Update the Admin page to show the admin login interface directly instead of redirecting unauthenticated users

**User-visible outcome:** Regular users authenticate via the header Login button and stay on their current page. Admins access a secret login at /admin by typing the URL directly, which is not visible in the navigation.

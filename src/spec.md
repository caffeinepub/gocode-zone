# Specification

## Summary
**Goal:** Add a comprehensive admin panel with course management, announcements, lesson uploads, VIP access control, and member viewing capabilities.

**Planned changes:**
- Create an /admin route accessible only to authenticated admin users
- Add course content editing functionality for all 4 units (titles, descriptions, topics)
- Add announcement posting system with title, content, and timestamps
- Add lesson upload functionality with unit association and ordering
- Add VIP access management to grant/revoke VIP status by principal ID
- Add member viewing to display all registered users with join dates
- Implement role-based access control restricting admin features to designated admin principals

**User-visible outcome:** Administrators can log in to access an admin panel where they can edit course content, post announcements visible on the home page, upload and organize new lessons, manage VIP memberships, and view all registered members.

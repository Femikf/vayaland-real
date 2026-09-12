# VAYALAND — Admin & Content Management Guide

Welcome to the **VAYALAND** Content Management System (CMS) guide. The VAYALAND website is powered by Payload CMS 3.x embedded inside the Next.js application.

---

## 1. Accessing the Admin Panel

- **URL**: [http://localhost:3000/admin](http://localhost:3000/admin) (or `https://your-domain.com/admin` in production)
- **First Time Setup**: When you first launch the admin panel on a new database, you will be prompted to create the primary administrator account (email and password).

---

## 2. Managing Collections

### Properties
Manage all land parcels, estates, houses, and villa listings.
- **Title & Description**: Provide localized title and editorial description (English and Malayalam).
- **Property Type**: Choose from `Land / Plot`, `House / Villa`, `Plantation / Estate`, or `Commercial`.
- **Status**: Set property status to `Available`, `Under Offer`, or `Sold`.
- **Pricing & Dimensions**: Enter price in INR, property area (cents/acres/sq.ft), and location within Wayanad.
- **Featured**: Toggle to feature the property prominently on the homepage hero and showcase grid.
- **Images**: Upload high-resolution architectural and landscape photos.

### Services
Manage the service offerings displayed across the site (e.g., Land Title Verification, Property Development, Architectural Advisory).
- **Service Name & Slug**: Localized in both English and Malayalam.
- **Key Features**: Bulleted breakdown of what the service entails.
- **Display Order**: Controls sorting on the `/services` page.

### Hero Slides
Manage the high-impact visual banners on the homepage.
- **Headline & Subtitle**: Editorial architectural copywriting in English and Malayalam.
- **Background Image**: High-resolution cinematic imagery of Wayanad land and properties.
- **Order & Active Status**: Control visibility and sequence.

### Media Library
Direct access to all uploaded photos, architectural diagrams, and documents.
- Automatically handles responsive sizing and WebP optimization.

### Enquiries
Inquiries submitted by prospective buyers via the website contact form or property inquiry buttons are captured here for tracking and follow-up.

---

## 3. Bilingual Support (English & Malayalam)

Payload CMS fields with translation support have a locale selector in the upper corner of the editor.
- Always fill both **English (EN)** and **Malayalam (ML)** versions to ensure a seamless bilingual experience for site visitors.
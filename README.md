# VAYALAND — Next.js + Payload CMS + MongoDB

VAYALAND is a premium real estate and architectural land platform tailored for Wayanad, Kerala. Built with Next.js 15 (App Router), Payload CMS 3.x embedded in the application, MongoDB for database persistence, `next-intl` for seamless English & Malayalam bilingual routing, and S3-ready media management.

---

## Brand & Architecture Direction

VAYALAND communicates:
- **Premium Real Estate**: Exclusive land parcels, plantation estates, and contemporary villas in Wayanad.
- **Modern Kerala Sophistication**: Clean, architectural, editorial aesthetic with earthy tones (Ivory, Olive, Charcoal).
- **Permanence & Trust**: End-to-end verified titles, clear legal documentation, and local expertise.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack compatible)
- **CMS**: Payload CMS 3.x (embedded, auto-generated admin panel at `/admin`)
- **Database**: MongoDB (via `@payloadcms/db-mongodb` / Mongoose)
- **Localization**: `next-intl` with dedicated `/en` and `/ml` (Malayalam) routes
- **Styling**: Vanilla CSS Design System with custom properties (`tokens.css`, `globals.css`)
- **Image Processing**: `sharp` (v0.33+)
- **Storage**: Local disk (`/public/media`) with AWS S3 ready plugin (`@payloadcms/storage-s3`)

---

## Project Structure

```
src/
  app/
    (frontend)/[locale]/     # Public pages (Home, About, Gallery, Services, Contact)
    (payload)/               # Payload CMS Admin & API routes
    api/enquiry/             # Contact & inquiry form handler
    ping/                    # Health check endpoint
  collections/               # Payload collections: Properties, Services, HeroSlides, Media, Users, Enquiries
  components/                # UI: Nav, Footer, HeroCarousel, GalleryGrid, BrandMark, ContactForm
  i18n/                      # next-intl localization routing and request configuration
  lib/site.ts                # Site constants, contact details, WhatsApp & email deep links
  middleware.ts              # Route localization middleware
  payload.config.ts          # Payload CMS configuration (MongoDB, S3, localization)
messages/
  en.json                    # English translations
  ml.json                    # Malayalam translations
```

---

## Getting Started

### 1. Environment Setup
Copy the example environment file and configure your credentials:

```bash
cp .env.example .env
```

Set the following variables in `.env`:
- `DATABASE_URI`: MongoDB connection string (e.g. `mongodb://localhost:27017/vayaland` or MongoDB Atlas URI)
- `PAYLOAD_SECRET`: Random 32+ character string (generate via `openssl rand -base64 32`)
- `NEXT_PUBLIC_SERVER_URL`: `http://localhost:3000`

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

- **Frontend (English)**: [http://localhost:3000/en](http://localhost:3000/en)
- **Frontend (Malayalam)**: [http://localhost:3000/ml](http://localhost:3000/ml)
- **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin) (Create your initial admin user on first visit)

---

## Content Management (Admin Panel)

1. **Hero Slides**: Manage hero banners, headlines, subheadings, and localized English & Malayalam typography.
2. **Properties**: Add land plots, plantation acreage, houses, or villas with status (`Available`, `Under Offer`, `Sold`), price, dimensions, and image galleries.
3. **Services**: Manage architectural consultation, property verification, and land development services.
4. **Enquiries**: View and manage customer inquiries submitted through the contact and property detail forms.

---

## Media & Production Storage

- In development, uploads are stored locally in `/public/media`.
- For production, enable AWS S3 storage by configuring `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, and `S3_SECRET_ACCESS_KEY` in `.env` and activating the plugin in `src/payload.config.ts`.

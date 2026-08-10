# Signature Admin — Content Management Guide

Access the admin panel at: `https://your-domain.com/admin`

---

## Logging In

- Go to `/admin/login`
- Enter your email and password
- After login you land on the dashboard

---

## Language Switcher

Every screen in the admin has an **English / മലയാളം** dropdown at the top right of the form. Use this to switch between languages when filling in content.

Fields marked as bilingual must be filled in separately for each language — switch the dropdown and re-enter the value in Malayalam (or English).

### How Malayalam works on the website

The website automatically shows the correct language based on what the visitor selects (EN or ML toggle in the top navigation).

- When a visitor selects **English** → the website shows the English version of all content
- When a visitor selects **Malayalam** → the website shows the Malayalam version of all content

**This only works if you have filled in the Malayalam content in the admin panel.** If a field is left empty in Malayalam, the website will fall back and show the English version for that field.

### Step-by-step: Adding Malayalam content

1. Open any Property, Service, or Hero Slide in the admin
2. Fill in all fields in **English** first
3. Find the **English / മലയാളം** dropdown at the top right of the form
4. Switch it to **മലയാളം**
5. All the same fields appear again — fill them in Malayalam
6. Save

Repeat this for every item (every property, every service, every hero slide) to ensure the full website is available in Malayalam.

---

## Collections

### 1. Properties

**Location:** Admin → Content → Properties

Used for all property listings that appear in the Gallery page (Houses for Sale, Land for Sale, Commercial Buildings & Properties, Sold Properties tabs).

| Field | Type | Notes |
|---|---|---|
| Title | Text | Bilingual (EN / ML) |
| Property Type | Select | House for Sale / Land for Sale / Commercial Buildings & Properties |
| Status | Select | Available / Sold — changing to Sold moves it to the Sold tab |
| Price | Text | Bilingual. e.g. `₹ 1.8 Cr` |
| Location | Text | Bilingual. e.g. `Calicut, Kerala` |
| Description | Textarea | Bilingual. Shown on the property detail page |
| Specs | Repeating list | Bilingual. e.g. `4 Beds`, `2400 sqft`, `2 Baths` — add as many as needed |
| Images | Image upload | Multiple images allowed. First image is used as the gallery card thumbnail |
| Google Earth Link | URL | Only for Land / Commercial. Paste the **full** Google Earth or Google Maps URL (not a short `goo.gl` link) so the map preview works on the property page |
| Show on homepage | Checkbox | Tick to feature this property in the Featured Listings section on the homepage |

**How the tabs work:**
- Property Type = House + Status = Available → **Houses for Sale** tab
- Property Type = Land + Status = Available → **Land for Sale** tab
- Property Type = Commercial + Status = Available → **Commercial Buildings & Properties** tab
- Status = Sold (any type) → **Sold Properties** tab

### Uploading images for properties — important

Images are displayed in a fixed-size card area on the gallery grid. The system crops the image to fill the card. To avoid important parts of the photo being cut off:

- **Use landscape (horizontal) photos** — ideally 4:3 ratio (e.g. 1200×900px) or 16:9 (e.g. 1600×900px)
- **Avoid portrait (vertical) photos** for the main/thumbnail image — the top and bottom will be cut
- **The first image** in the list is used as the card thumbnail on the gallery page — make it the best exterior shot
- **Minimum recommended size:** 800×600px. Larger is better for the detail page hero view
- If a photo looks cut on the website, re-upload a wider/landscape version of the same image

---

### 2. Services

**Location:** Admin → Content → Services

Controls what appears on the Services page and the homepage services preview.

| Field | Type | Notes |
|---|---|---|
| Name | Text | Bilingual |
| Short description | Textarea | Bilingual. Used on the homepage preview cards (keep it brief) |
| Full description | Textarea | Bilingual. Used on the full Services page |
| Features | Repeating list | Bilingual. Bullet points shown on the Services page |
| Image | Image upload | Single image for this service |
| Order | Number | Controls display order — lower number appears first |
| Active | Checkbox | Untick to hide the service from the website without deleting it |
| Show on homepage | Checkbox | Tick to show this service in the homepage preview section (up to 4 recommended) |

---

### 3. Hero Slides

**Location:** Admin → Content → Hero Slides

Controls the full-screen image carousel on the homepage hero section.

| Field | Type | Notes |
|---|---|---|
| Headline | Text | Bilingual. Large text shown over the image |
| Eyebrow | Text | Bilingual. Small text shown above the headline |
| Subtitle | Textarea | Bilingual. Supporting text below the headline |
| Image | Image upload | Required. Full-width background image for the slide |
| Button text | Text | Bilingual. Optional. Label for the CTA button on this slide |
| Button link | Text | Optional. URL the button points to e.g. `/en/gallery` |
| Order | Number | Controls slide order — lower number plays first |
| Active | Checkbox | Untick to hide a slide without deleting it |

**Tip:** Use high-resolution landscape images (minimum 1600×900px) for best results on desktop screens. Portrait images will be cropped on the sides.

---

### 4. Media

**Location:** Admin → Media

Central image library. All images uploaded here are stored in S3 and reused across Properties, Services, and Hero Slides.

| Field | Type | Notes |
|---|---|---|
| File | Image upload | Accepts any image format. Automatically resized to two sizes: card (800×600) and hero (1600×900) |
| Alt text | Text | Bilingual. Describes the image for accessibility and SEO |

**How to upload:**
1. Click **Create New** in the Media collection
2. Drag and drop your image or click to browse
3. Fill in the Alt text in English, then switch to Malayalam and fill it again
4. Save — the image is now available to select in Properties, Services, and Hero Slides

You can also upload directly from within a Property or Service form — click the image field and it opens the media library inline.

---

### 5. Enquiries

**Location:** Admin → Leads → Enquiries

Read-only log of contact enquiries submitted through the website contact form. Only visible to logged-in admins.

| Field | What it shows |
|---|---|
| Name | Visitor's name |
| Phone | Visitor's phone number |
| Email | Visitor's email address |
| Message | Their message |
| Created At | Date and time of the enquiry |

---

## Image Upload Guidelines

Understanding how images are displayed prevents photos from appearing cropped or showing dark bars around them.

### Why photos sometimes look cropped or have empty space

Every image slot on the website has a **fixed shape** (its aspect ratio). Your uploaded photo also has a shape — determined by how it was taken or cropped. When the two shapes don't match, the website has to choose one of two compromises:

| Situation | Result |
|---|---|
| Photo fills the box completely | Edges of the photo are cropped off |
| Photo fits inside the box fully | Dark bars appear where the shapes don't align |

**The solution:** Crop your photo to the correct ratio before uploading. When the shapes match, there is no cropping and no bars — the photo fills the slot perfectly.

---

### Recommended ratios by image type

| Where the image is used | Recommended ratio | Example pixel size |
|---|---|---|
| Property photos (gallery cards, detail page) | **4:3** | 1200 × 900 px |
| Service images | **4:3** | 1200 × 900 px |
| Hero slides (homepage carousel) | **16:9** | 1600 × 900 px |

**4:3** is the standard photo ratio used by most DSLR cameras and many phones. If you photograph properties on a phone, check your camera settings — most phones allow switching between 4:3, 16:9, and square modes.

---

### How to crop a photo before uploading

**On Android:**
1. Open the photo in Gallery
2. Tap the Edit (pencil) icon
3. Tap **Crop** → select **4:3**
4. Adjust the frame and save

**On iPhone:**
1. Open the photo in Photos
2. Tap **Edit** → tap the crop icon (bottom right)
3. Tap the ratio icon → select **4:3**
4. Adjust and tap **Done**

**On a computer (Windows):**
1. Open the photo in Photos app
2. Click the crop icon → select **Aspect ratio → 4:3**
3. Save a copy

---

### File format and size

- **Format:** JPEG (.jpg) is preferred. PNG is accepted but creates larger files.
- **Maximum file size:** Keep images under **3 MB** per photo for fast loading.
- **Minimum size:** 800 × 600 px. Smaller images look blurry on large screens.
- **Ideal size:** 1200 × 900 px (4:3) for property images, 1600 × 900 px (16:9) for hero slides.

---

### Tips for property photos specifically

- **First image = thumbnail** — the first image you upload for a property is used as the card thumbnail on the gallery grid. Make it the best exterior shot of the property.
- **Order matters** — arrange images so the most important shots come first (exterior, then interior rooms, then land/surroundings).
- **Portrait photos (vertical)** — if you only have portrait photos (taller than wide), crop them to 4:3 before uploading. Without cropping, a portrait photo uploaded to a landscape slot will show dark bars on both sides.
- **WhatsApp photos** — photos shared on WhatsApp are compressed and sometimes resized. Use the original photo from the camera whenever possible.

---

## Tips

- **Deleting vs hiding:** Use the `Active` checkbox to hide content rather than deleting it. Deleted records cannot be recovered.
- **Homepage featured properties:** Only properties with **Show on homepage** ticked appear in the Featured Listings section. There is no limit enforced, but 3–4 cards look best.
- **Homepage featured services:** Only services with both **Active** and **Show on homepage** ticked appear on the homepage. 4 cards is the recommended maximum.
- **Sold properties:** Change Status to `Sold` on any property to move it to the Sold tab. The price will show with a strikethrough on the detail page.
- **Slide order:** If two slides have the same Order number, they appear in the order they were created.
- **Google Earth link:** Go to earth.google.com or Google Maps, navigate to the land location, switch to Satellite view, and copy the URL from the browser address bar. Paste it into the Google Earth Link field.
  - **Important — do not use short links:** If someone shares the location as a short link (e.g. `maps.app.goo.gl/abc123`), open that link in your browser first. The address bar will then show the full URL. Copy that full URL and paste it into the field. Short links do not contain coordinates so the map preview will not appear on the property page.
- **Malayalam fallback:** If any field is left empty in Malayalam, the English text will show instead. Always fill both languages for complete bilingual support.

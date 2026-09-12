# Vercel Deployment Guide for VAYALAND

This project is fully optimized and configured for continuous deployment on [Vercel](https://vercel.com).

---

## 1. Import Repository into Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard) → **Add New...** → **Project**.
2. Select your GitHub repository: `Femikf/vayaland`.
3. Framework Preset: **Next.js** (automatically detected).
4. Root Directory: `./` (leave default).

---

## 2. Configure Environment Variables in Vercel
In the Vercel project configuration screen, add the following Environment Variables under **Settings → Environment Variables**:

### Required:
| Key | Value Description | Example |
|---|---|---|
| `DATABASE_URI` | Your MongoDB Atlas connection URI with database name `/vayaland` | `mongodb+srv://femikf60_db_user:vBdMLGrHCSZGJUEI@vayaland.dcncnap.mongodb.net/vayaland?retryWrites=true&w=majority` |
| `PAYLOAD_SECRET` | A secure random 32+ character string | `9f3c7b2e1a8d4f6c5b0e2a3d7c9e1f5a8b2d4c6e0a` |
| `NEXT_PUBLIC_SERVER_URL` | Your production Vercel URL (without trailing slash) | `https://vayaland.vercel.app` (or your custom domain) |

### Optional (For Persistent AWS S3 Media Uploads):
| Key | Value Description |
|---|---|
| `AWS_S3_BUCKET_NAME` | `coodylabs-s3-bucket-2026-778900739767-eu-north-1-an` |
| `AWS_REGION` | `eu-north-1` |
| `AWS_ACCESS_KEY_ID` | Your AWS IAM Access Key ID |
| `AWS_SECRET_ACCESS_KEY` | Your AWS IAM Secret Access Key |

> **Note**: The application is resilient: if S3 credentials are not set initially, the website and Payload admin panel will still build and run smoothly.

---

## 3. Build & Output Settings
The project's `package.json` specifies:
- **Build Command**: `npm run build` (executes `payload generate:importmap && next build`)
- **Install Command**: `npm install`
- **Output Directory**: `.next` (default)

---

## 4. First Login to Admin Panel
Once deployed on Vercel:
1. Visit `https://your-domain.vercel.app/admin`
2. Since it's a fresh database, Payload will prompt you to create your initial **Super Admin Account** (email + password).
3. Log in to manage property listings, services, and enquiries.

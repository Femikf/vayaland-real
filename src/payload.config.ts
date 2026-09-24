import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Properties } from './collections/Properties'
import { Services } from './collections/Services'
import { HeroSlides } from './collections/HeroSlides'
import { Enquiries } from './collections/Enquiries'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      title: 'Vayaland Admin',
      titleSuffix: '— Vayaland Admin',
      icons: [{ rel: 'icon', url: '/assets/logo-icon.png' }],
    },
    components: {
      graphics: {
        Logo: '@/components/admin/AdminLogo#AdminLogo',
        Icon: '@/components/admin/AdminIcon#AdminIcon',
      },
      actions: [
        '@/components/admin/PostSaveRedirect#PostSaveRedirect',
      ],
    },
  },

  // ---- The two languages the CLIENT edits content in ----
  // Every field marked `localized: true` gets an EN + ML value, with
  // an EN/ML switcher in the admin. Missing ML falls back to EN.
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'മലയാളം', code: 'ml' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },

  collections: [
    Users,
    Media,
    Properties,
    Services,
    HeroSlides,
    Enquiries,
  ],

  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  sharp,

  plugins: [
    ...(process.env.AWS_S3_BUCKET_NAME
      ? [
          s3Storage({
            collections: { media: { prefix: 'vayaland' } },
            bucket: process.env.AWS_S3_BUCKET_NAME,
            config: {
              region: process.env.AWS_REGION || 'eu-north-1',
              credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
              },
            },
          }),
        ]
      : []),
  ],
})

import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024 // 10MB

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    disableLocalStorage: true,
    imageSizes: [
      { name: 'card', width: 800, height: 600, position: 'centre' },
      { name: 'hero', width: 1600, height: 900, position: 'centre' },
    ],
    mimeTypes: ['image/*'],
  },
  access: { read: () => true },
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        const file = (req as any)?.file || (req as any)?.files?.file
        const fileSize = file?.size || (data as any)?.filesize
        if (fileSize && fileSize > MAX_IMAGE_SIZE_BYTES) {
          const mb = (fileSize / (1024 * 1024)).toFixed(1)
          throw new APIError(
            `Image upload failed: File size (${mb} MB) exceeds the 10MB limit. Please compress or resize your image before uploading.`,
            400,
          )
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'alt', type: 'text', localized: true, label: 'Alt text (EN/ML)' },
  ],
}

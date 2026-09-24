import type { CollectionConfig } from 'payload'

// SERVICES page rows. Client adds new services here → they auto-appear.
export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order', 'active', 'featured'],
    group: 'Content',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'shortDesc', type: 'textarea', localized: true, label: 'Short description' },
    { name: 'fullDesc', type: 'textarea', localized: true, label: 'Full description' },
    {
      name: 'features',
      type: 'array',
      labels: { singular: 'Feature', plural: 'Features' },
      fields: [{ name: 'value', type: 'text', localized: true }],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'order', type: 'number', defaultValue: 0, admin: { description: 'Display priority: lower number = shown first' } },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active (Visible on website)',
      admin: {
        description: 'Uncheck this box to completely hide this service discipline from the public /services page.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Show on homepage',
      defaultValue: false,
      admin: {
        description: 'Highlight this service on key homepage overview sections.',
      },
    },
  ],
}

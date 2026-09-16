import type { CollectionConfig } from 'payload'

// GALLERY listings. The 4 gallery sections are just filters on this one
// collection: propertyType=house, propertyType=land, propertyType=commercial, status=sold.
export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'propertyType', 'status', 'price'],
    group: 'Content',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'propertyType',
      type: 'select',
      required: true,
      defaultValue: 'house',
      options: [
        { label: 'House for Sale', value: 'house' },
        { label: 'Land for Sale', value: 'land' },
        { label: 'Commercial Buildings & Properties', value: 'commercial' },
        { label: 'Resort for Sale', value: 'resort' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'ongoing',
      options: [
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Completed', value: 'completed' },
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Available', value: 'available' },
        { label: 'Sold', value: 'sold' },
      ],
    },
    { name: 'price', type: 'text', localized: true, admin: { description: 'e.g. ₹ 1.8 Cr' } },
    { name: 'location', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'specs',
      type: 'array',
      labels: { singular: 'Spec', plural: 'Specs' },
      admin: { description: 'e.g. "4 Beds", "2400 sqft"' },
      fields: [{ name: 'value', type: 'text', localized: true }],
    },
    { name: 'images', type: 'upload', relationTo: 'media', hasMany: true },
    {
      name: 'googleEarthLink',
      type: 'text',
      label: 'Google Earth / Maps Link',
      admin: {
        description: 'Paste the Google Earth or Google Maps satellite URL for this land/commercial plot. Leave blank for houses.',
        condition: (data) => data.propertyType === 'land' || data.propertyType === 'commercial' || data.propertyType === 'resort',
      },
    },
    { name: 'featured', type: 'checkbox', label: 'Show on homepage', defaultValue: false },
  ],
}

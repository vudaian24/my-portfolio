// collections/Projects.ts
import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true, // có thể chỉnh sửa quyền tùy nhu cầu
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "technologies",
      type: "array",
      fields: [
        {
          name: "technology",
          type: "text",
        },
      ],
    },
    {
      name: "startDate",
      type: "date",
    },
    {
      name: "endDate",
      type: "date",
    },
    {
      name: "link",
      type: "text",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media", // hoặc collection media của bạn
    },
    {
      name: "isFeatured",
      type: "checkbox",
      label: "Featured Project",
    },
  ],
};

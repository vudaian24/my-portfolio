// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { vi } from "@payloadcms/translations/languages/vi";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Projects } from "./collections/Projects";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Projects],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  localization: {
    locales: [
      {
        label: "English",
        code: "en",
      },
      {
        label: "Tiếng Việt",
        code: "vi",
      },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  i18n: {
    supportedLanguages: { vi },
    fallbackLanguage: "en",
  },
  plugins: [
    payloadCloudPlugin(),
    // s3Storage({
    //   collections: {
    //     media: {
    //       prefix: "media",
    //       generateFileURL: ({ filename }) => {
    //         return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION || "ap-southeast-1"}.amazonaws.com/media/${filename}`;
    //       },
    //     },
    //   },
    //   bucket: process.env.AWS_S3_BUCKET || "",
    //   config: {
    //     credentials: {
    //       accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    //       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    //     },
    //     region: process.env.AWS_REGION || "ap-southeast-1",
    //   },
    // }),
  ],
});

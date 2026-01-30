import { v2 as cloudinary } from "cloudinary";

let isConfigured = false;

function ensureConfigured() {
  if (isConfigured) return;

  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  if (!cloudinaryUrl) {
    throw new Error("CLOUDINARY_URL is not set");
  }

  cloudinary.config({ cloudinary_url: cloudinaryUrl });
  isConfigured = true;
}

export function hasCloudinaryConfig() {
  return Boolean(process.env.CLOUDINARY_URL);
}

export async function uploadImageBufferToCloudinary(params: {
  buffer: Buffer;
  folder: string;
  publicId?: string;
}) {
  ensureConfigured();

  const { buffer, folder, publicId } = params;

  return await new Promise<{
    secureUrl: string;
    publicId: string;
    format?: string;
    bytes?: number;
    width?: number;
    height?: number;
  }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        public_id: publicId,
        overwrite: Boolean(publicId),
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }

        resolve({
          secureUrl: result.secure_url,
          publicId: result.public_id,
          format: result.format,
          bytes: result.bytes,
          width: result.width,
          height: result.height,
        });
      },
    );

    stream.end(buffer);
  });
}

export async function deleteCloudinaryImage(publicId: string) {
  ensureConfigured();
  await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
}

export function tryParseCloudinaryPublicIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (!u.hostname.includes("res.cloudinary.com")) return null;

    // Typical: /<cloud_name>/image/upload/v123/folder/name.jpg
    const parts = u.pathname.split("/upload/");
    if (parts.length < 2) return null;

    let afterUpload = parts[1];
    afterUpload = afterUpload.replace(/^v\d+\//, "");

    // Strip extension
    afterUpload = afterUpload.replace(/\.[a-zA-Z0-9]+$/, "");

    // Decode any URL encodings
    return decodeURIComponent(afterUpload);
  } catch {
    return null;
  }
}

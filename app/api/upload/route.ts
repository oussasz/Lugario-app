import { NextResponse } from "next/server";
import path from "path";
import crypto from "crypto";
import { mkdir, writeFile, unlink } from "fs/promises";
import { existsSync } from "fs";

export const runtime = "nodejs";

const UPLOADS_BASE_URL = "/uploads";
const UPLOADS_BASE_DIR = path.join(process.cwd(), "public", "uploads");

function sanitizeFolder(folder: string) {
  const safe = folder.trim();
  if (!safe) return "products";
  if (!/^[a-zA-Z0-9_-]+$/.test(safe)) return "products";
  return safe;
}

function safeUnlinkIfLocalUpload(replacePath: string | null) {
  if (!replacePath) return Promise.resolve();
  if (!replacePath.startsWith(`${UPLOADS_BASE_URL}/`)) return Promise.resolve();
  if (replacePath.includes("..")) return Promise.resolve();

  const absolute = path.join(process.cwd(), "public", replacePath);
  if (!absolute.startsWith(UPLOADS_BASE_DIR)) return Promise.resolve();
  if (!existsSync(absolute)) return Promise.resolve();

  return unlink(absolute).catch(() => undefined);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    const folderRaw = formData.get("folder");
    const replacePath = formData.get("replacePath");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image uploads are allowed" },
        { status: 400 },
      );
    }

    const folder = sanitizeFolder(
      typeof folderRaw === "string" ? folderRaw : "products",
    );
    const uploadDir = path.join(UPLOADS_BASE_DIR, folder);
    await mkdir(uploadDir, { recursive: true });

    const originalName = file.name || "upload";
    const ext = path.extname(originalName).slice(1).toLowerCase();
    const safeExt = ext && /^[a-z0-9]+$/.test(ext) ? ext : "jpg";

    const filename = `${Date.now()}-${crypto.randomUUID()}.${safeExt}`;
    const absolutePath = path.join(uploadDir, filename);

    const bytes = await file.arrayBuffer();
    await writeFile(absolutePath, new Uint8Array(bytes));

    await safeUnlinkIfLocalUpload(
      typeof replacePath === "string" ? replacePath : null,
    );

    const publicPath = `${UPLOADS_BASE_URL}/${folder}/${filename}`;
    return NextResponse.json({ path: publicPath }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Upload failed",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
}

import { Request } from 'express';
import { access, mkdir, unlink } from 'fs/promises';
import { diskStorage, type FileFilterCallback } from 'multer';
import path from 'path';
import sharp from 'sharp';

type ThumbnailPaths = {
  '800x600': string;
  '640x480': string;
  '400x300': string;
};

async function ensureUploadDir(dir: string): Promise<void> {
  try {
    await access(dir);
  } catch {
    await mkdir(dir, { recursive: true });
  }
}

const storage = diskStorage({
  destination: (_req, _file, cb) => {
    const uploadPath = path.join(process.cwd(), 'uploads', 'pets');
    ensureUploadDir(uploadPath)
      .then(() => {
        cb(null, uploadPath);
      })
      .catch((error: unknown) => {
        cb(error as Error, uploadPath);
      });
  },
  filename: (_req, file, cb) => {
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueSuffix = `${Date.now().toString()}-${Math.round(Math.random() * 1e9).toString()}`;
    const filename = `${file.fieldname}-${uniqueSuffix}-${sanitizedName}`;
    cb(null, filename);
  },
});

function fileFilter(_req: Request, file: Express.Multer.File, cb: FileFilterCallback): void {
  if (file.fieldname === 'documents') {
    cb(null, true);
    return;
  }

  const allowedImages = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/bmp',
    'image/webp',
    'image/avif',
  ];

  if (allowedImages.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed: ${allowedImages.join(', ')}`));
  }
}

export const uploadConfig = {
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 5,
  },
};

export async function processImage(filePath: string): Promise<ThumbnailPaths> {
  const sizes: { name: keyof ThumbnailPaths; width: number; height: number }[] = [
    { name: '800x600', width: 800, height: 600 },
    { name: '640x480', width: 640, height: 480 },
    { name: '400x300', width: 400, height: 300 },
  ];

  const fileDir = path.dirname(filePath);
  const thumbnailsDir = path.join(fileDir, 'thumbnails');
  await ensureUploadDir(thumbnailsDir);

  const filename = path.basename(filePath);
  const baseFilename = filename.replace(/\.(jpg|jpeg|png|bmp|webp|avif)$/i, '');

  const out: Partial<ThumbnailPaths> = {};

  await Promise.all(
    sizes.map(async ({ name, width, height }) => {
      const thumbnailPath = path.join(thumbnailsDir, `${baseFilename}_${name}.webp`);
      await sharp(filePath)
        .resize(width, height, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(thumbnailPath);
      out[name] = thumbnailPath;
    }),
  );

  await unlink(filePath);

  return out as ThumbnailPaths;
}

export async function cleanupFiles(files: Express.Multer.File[]): Promise<void> {
  if (!files.length) {
    throw new Error('No files to clean up');
  }

  const deletions = files.map(file => {
    unlink(file.path).catch((err: unknown) => {
      if (err instanceof Error) {
        return err.toString();
      }
      return String(err);
    });
  });

  await Promise.all(deletions);
}

import type { MulterFilesObject } from '#src/shared';

export const multerUtils = {
  /**
   * Checks if a property exists and is defined in the files object
   */
  isDefined: <T extends string>(
    filesObj: MulterFilesObject,
    key: T,
  ): filesObj is MulterFilesObject & Record<T, Express.Multer.File[]> => {
    return key in filesObj && Array.isArray(filesObj[key]);
  },

  /**
   * Safely gets files for a specific field, returning empty array if not found
   */
  getFiles: (filesObj: MulterFilesObject, fieldname: string): Express.Multer.File[] => {
    return multerUtils.isDefined(filesObj, fieldname) ? filesObj[fieldname] : [];
  },

  /**
   * Gets all files from a MulterFilesObject as a flat array
   */
  getAllFiles: (filesObj: MulterFilesObject): Express.Multer.File[] => {
    return Object.values(filesObj)
      .filter((files): files is Express.Multer.File[] => Boolean(files))
      .flat();
  },

  /**
   * Extracts photos and documents from files object
   */
  extractPhotosDocs: (filesObj: MulterFilesObject) => {
    const photos = multerUtils.getFiles(filesObj, 'photos');
    const documents = multerUtils.getFiles(filesObj, 'documents');
    const allFiles = [...photos, ...documents];

    return { photos, documents, allFiles };
  },

  /**
   * Type guard to check if files is an array or object
   */
  isFilesArray: (
    files: Express.Multer.File[] | MulterFilesObject,
  ): files is Express.Multer.File[] => {
    return Array.isArray(files);
  },

  /**
   * Main utility to process files regardless of format (array or object)
   */
  processFiles: (files: Express.Multer.File[] | MulterFilesObject | null) => {
    if (!files) {
      return { photos: [], documents: [], allFiles: [] };
    }

    if (multerUtils.isFilesArray(files)) {
      // Handle array format
      const allFiles = files;
      const photos = allFiles.filter(f => f.fieldname === 'photos');
      const documents = allFiles.filter(f => f.fieldname === 'documents');
      return { photos, documents, allFiles };
    } else {
      // Handle object format
      return multerUtils.extractPhotosDocs(files);
    }
  },
};

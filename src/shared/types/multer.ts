export type MulterFilesObject = {
  [fieldname: string]: Express.Multer.File[] | undefined;
};

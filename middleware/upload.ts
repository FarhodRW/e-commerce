import multer from 'multer'

export const upload = multer({
  limits: {
    fileSize: 10000000
  },
  fileFilter(req: any, file: any, cb: any) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'))
    }

    cb(undefined, true)
  }
})

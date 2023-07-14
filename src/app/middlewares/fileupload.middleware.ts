import { Request, Response, NextFunction } from 'express';
import multer, { Multer } from 'multer';
import path from 'path';
// // Create Multer instance with desired configuration
// const filePath = path.join(__dirname, '../../public');
// // const storage = multer.diskStorage({
// //   destination: (req: Request, file: Express.Multer.File, cb: Function) => {
// //     cb(null, filePath);
// //   },
// //   filename: (req: Request, file: Express.Multer.File, cb: Function) => {
// //     cb(null, `${file.originalname}-${Date.now()}`);
// //   },
// // });
// const storage = multer.memoryStorage();
// const upload: Multer = multer({ storage });

// // Middleware function that handles file upload and form data parsing
// export const uploadFileMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   // Use Multer middleware to upload single file with name 'file'
//     const uploadFile = upload.single('file');

//     uploadFile(req, res, (err: any) => {
//     if (err) {
//       return next(err);
//     }

//     // Parse form data and add file information to request body
//     req.body = {
//       ...req.body,
//       ...{ file: req.file },
//     };

//     return next();
//   });
// };

export const uploadFile= (storageType:string) =>{
    let storage
    let upload:Multer
    switch(storageType) {
        case 'memory':
             storage = multer.memoryStorage();
             upload = multer({ storage });
            break;
        case 'local':
            // Create Multer instance with desired configuration
            const filePath = path.join(__dirname, '../../public');
             storage = multer.diskStorage({
              destination: (req: Request, file: Express.Multer.File, cb: Function) => {
                cb(null, filePath);
              },
              filename: (req: Request, file: Express.Multer.File, cb: Function) => {
                cb(null, `${file.originalname}-${Date.now()}`);
              },
            });
             upload = multer({ storage });
            break;
    }
     return async (req: Request, res: Response, next: NextFunction) => {
    // Use Multer middleware to upload single file with name 'file'
        const uploadFile = upload.single('file');

        uploadFile(req, res, (err: any) => {
        if (err) {
        next(err);
        }

        // Parse form data and add file information to request body
        req.body = {
        ...req.body,
        ...{ file: req.file },
        };

        next();
    });
}
}

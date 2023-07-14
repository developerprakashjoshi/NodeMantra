"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
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
const uploadFile = (storageType) => {
    let storage;
    let upload;
    switch (storageType) {
        case 'memory':
            storage = multer_1.default.memoryStorage();
            upload = (0, multer_1.default)({ storage });
            break;
        case 'local':
            // Create Multer instance with desired configuration
            const filePath = path_1.default.join(__dirname, '../../public');
            storage = multer_1.default.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, filePath);
                },
                filename: (req, file, cb) => {
                    cb(null, `${file.originalname}-${Date.now()}`);
                },
            });
            upload = (0, multer_1.default)({ storage });
            break;
    }
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Use Multer middleware to upload single file with name 'file'
        const uploadFile = upload.single('file');
        uploadFile(req, res, (err) => {
            if (err) {
                next(err);
            }
            // Parse form data and add file information to request body
            req.body = Object.assign(Object.assign({}, req.body), { file: req.file });
            next();
        });
    });
};
exports.uploadFile = uploadFile;

import { Router } from 'express';
import multer from 'multer';
import { uploadFile, uploadPublicFile } from '../controllers/uploadController';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Single public file upload
router.post('/public', upload.single('file'), uploadPublicFile);

// Multi-file upload
router.post('/file', upload.array('files'), uploadFile);

// General upload endpoint handling either single 'file' or multiple 'files'
router.post('/', upload.any(), (req, res, next) => {
  const files = (req.files as Express.Multer.File[]) || (req.file ? [req.file] : []);
  if (files.length === 1) {
    req.file = files[0];
    return uploadPublicFile(req, res);
  }
  return uploadFile(req, res);
});

export default router;

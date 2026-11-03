import { Request, Response } from 'express';
import axios from 'axios';
import FormData from 'form-data';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

// Public endpoint: upload a single file (used by users and admin panel)
export const uploadPublicFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file || (Array.isArray(req.files) ? (req.files as Express.Multer.File[])[0] : undefined);
    if (!file) {
      res.status(400).json({ success: false, message: 'No file uploaded' });
      return;
    }

    const ANTRYK_ACCESS_KEY = process.env.ANTRYK_ACCESS_KEY;
    const ANTRYK_SECRET_KEY = process.env.ANTRYK_SECRET_KEY;
    const ANTRYK_BUCKET_NAME = process.env.ANTRYK_BUCKET_NAME;
    const ANTRYK_BASE_URL = process.env.ANTRYK_BASE_URL;

    const folder = req.body.folder || 'uploads';
    const key = `${folder}/${uuidv4()}_${file.originalname.replace(/\s+/g, '_')}`;

    // If Antryk credentials are provided, upload to Antryk object storage
    if (ANTRYK_ACCESS_KEY && ANTRYK_SECRET_KEY && ANTRYK_BUCKET_NAME) {
      const formData = new FormData();
      formData.append('bucket', ANTRYK_BUCKET_NAME);
      formData.append('key', key);
      formData.append('accessKey', ANTRYK_ACCESS_KEY);
      formData.append('secretKey', ANTRYK_SECRET_KEY);
      formData.append('file', file.buffer, file.originalname);

      const response = await axios.post('https://storage.apis.antryk.com/api/v1/objects', formData, {
        headers: formData.getHeaders(),
      });

      if (response.data && response.data.success) {
        const returnedKey = response.data.key || key;
        const baseUrl = (ANTRYK_BASE_URL || 'https://storage.apis.antryk.com').replace(/\/$/, '');
        const publicUrl = `${baseUrl}/${String(returnedKey).replace(/^\/+/, '')}`;

        res.status(200).json({
          success: true,
          files: [{ key: returnedKey, url: publicUrl }],
          url: publicUrl,
        });
        return;
      }

      throw new Error('Antryk upload failed: ' + JSON.stringify(response.data));
    } else {
      // Local fallback in development when Antryk keys are not set
      const uploadDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const fileName = `${uuidv4()}_${file.originalname.replace(/\s+/g, '_')}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, file.buffer);

      const host = req.get('host') || 'localhost:5000';
      const protocol = req.protocol || 'http';
      const localUrl = `${protocol}://${host}/uploads/${fileName}`;

      res.status(200).json({
        success: true,
        files: [{ key: `uploads/${fileName}`, url: localUrl }],
        url: localUrl,
      });
    }
  } catch (error: any) {
    console.error('Public upload error:', error);
    res.status(500).json({ success: false, message: error.message || 'Upload failed' });
  }
};

// Multi-file upload endpoint
export const uploadFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = (req.files as Express.Multer.File[]) || (req.file ? [req.file] : []);
    if (!files || files.length === 0) {
      res.status(400).json({ success: false, message: 'No files uploaded' });
      return;
    }

    const ANTRYK_ACCESS_KEY = process.env.ANTRYK_ACCESS_KEY;
    const ANTRYK_SECRET_KEY = process.env.ANTRYK_SECRET_KEY;
    const ANTRYK_BUCKET_NAME = process.env.ANTRYK_BUCKET_NAME;
    const ANTRYK_BASE_URL = process.env.ANTRYK_BASE_URL;

    const uploadResults: Array<{ key: string; url: string }> = [];

    for (const file of files) {
      const key = `uploads/${uuidv4()}_${file.originalname.replace(/\s+/g, '_')}`;

      if (ANTRYK_ACCESS_KEY && ANTRYK_SECRET_KEY && ANTRYK_BUCKET_NAME) {
        const formData = new FormData();
        formData.append('bucket', ANTRYK_BUCKET_NAME);
        formData.append('key', key);
        formData.append('accessKey', ANTRYK_ACCESS_KEY);
        formData.append('secretKey', ANTRYK_SECRET_KEY);
        formData.append('file', file.buffer, file.originalname);

        const response = await axios.post('https://storage.apis.antryk.com/api/v1/objects', formData, {
          headers: formData.getHeaders(),
        });

        if (response.data && response.data.success) {
          const returnedKey = response.data.key || key;
          const baseUrl = (ANTRYK_BASE_URL || 'https://storage.apis.antryk.com').replace(/\/$/, '');
          const publicUrl = `${baseUrl}/${String(returnedKey).replace(/^\/+/, '')}`;
          uploadResults.push({
            key: returnedKey,
            url: publicUrl,
          });
        } else {
          throw new Error('Antryk upload failed: ' + JSON.stringify(response.data));
        }
      } else {
        const uploadDir = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const fileName = `${uuidv4()}_${file.originalname.replace(/\s+/g, '_')}`;
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, file.buffer);

        const host = req.get('host') || 'localhost:5000';
        const protocol = req.protocol || 'http';
        const localUrl = `${protocol}://${host}/uploads/${fileName}`;

        uploadResults.push({
          key: `uploads/${fileName}`,
          url: localUrl,
        });
      }
    }

    res.status(200).json({
      success: true,
      files: uploadResults,
      url: uploadResults[0]?.url || '',
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: error.message || 'Upload failed' });
  }
};

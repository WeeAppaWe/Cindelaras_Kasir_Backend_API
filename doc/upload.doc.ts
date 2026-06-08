/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: Upload gambar ke Supabase Storage
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UploadFolderTarget:
 *       type: string
 *       enum:
 *         - menu
 *         - logo
 *       description: Target folder upload. menu memakai SUPABASE_FOLDER_MENU, logo memakai SUPABASE_FOLDER_LOGO.
 *       example: menu
 *
 *     UploadImageData:
 *       type: object
 *       properties:
 *         filename:
 *           type: string
 *           description: Nama file unik yang dibuat sistem tanpa prefix folder.
 *           example: "019b1e1e-96d5-73d4-9c78-93ccdfc5412f.webp"
 *         folder:
 *           type: string
 *           description: Folder Supabase Storage yang dipakai.
 *           example: "menus"
 *         path:
 *           type: string
 *           description: Object path lengkap di dalam bucket Supabase Storage.
 *           example: "menus/019b1e1e-96d5-73d4-9c78-93ccdfc5412f.webp"
 *         originalname:
 *           type: string
 *           description: Nama file asli dari request multipart.
 *           example: "nasi-goreng.webp"
 *         mimetype:
 *           type: string
 *           description: MIME type file.
 *           example: "image/webp"
 *         size:
 *           type: integer
 *           description: Ukuran file dalam byte.
 *           example: 245760
 *         url:
 *           type: string
 *           format: uri
 *           description: Public URL object dari Supabase Storage.
 *           example: "https://project.supabase.co/storage/v1/object/public/images/menus/019b1e1e-96d5-73d4-9c78-93ccdfc5412f.webp"
 *
 *     UploadImageResponse:
 *       type: object
 *       properties:
 *         response:
 *           $ref: '#/components/schemas/UploadImageData'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Gambar berhasil diupload"
 *                 code:
 *                   example: 201
 *                 response_code:
 *                   example: "0001"
 *
 *     DeleteUploadImageData:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         filename:
 *           type: string
 *           description: Nama file yang dihapus tanpa prefix folder.
 *           example: "019b1e1e-96d5-73d4-9c78-93ccdfc5412f.webp"
 *         path:
 *           type: string
 *           description: Object path lengkap yang dihapus dari bucket Supabase Storage.
 *           example: "menus/019b1e1e-96d5-73d4-9c78-93ccdfc5412f.webp"
 *         message:
 *           type: string
 *           example: "File berhasil dihapus"
 *
 *     DeleteUploadImageResponse:
 *       type: object
 *       properties:
 *         response:
 *           $ref: '#/components/schemas/DeleteUploadImageData'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Gambar berhasil dihapus"
 *                 code:
 *                   example: 200
 *                 response_code:
 *                   example: "0000"
 */

/**
 * @swagger
 * /upload/image/{folder}:
 *   post:
 *     summary: Upload gambar ke folder tertentu
 *     description: |
 *       Upload gambar ke Supabase Storage sesuai target folder.
 *
 *       Mapping folder:
 *       - `menu` -> env `SUPABASE_FOLDER_MENU`, default `menus`
 *       - `logo` -> env `SUPABASE_FOLDER_LOGO`, default `logos`
 *
 *       Field `path` pada response adalah object path lengkap di dalam bucket.
 *       Simpan `url` untuk ditampilkan di FE, dan simpan `path` atau kombinasi `folder + filename` jika file perlu dihapus kembali.
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: folder
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/UploadFolderTarget'
 *         description: Target folder upload.
 *         example: menu
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: File gambar. Format yang didukung JPEG, PNG, GIF, WebP. Maksimal 5MB.
 *     responses:
 *       201:
 *         description: Gambar berhasil diupload
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadImageResponse'
 *       400:
 *         description: Target folder tidak valid, file tidak valid, atau ukuran file lebih dari 5MB
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               InvalidFolder:
 *                 summary: Target folder tidak valid
 *                 value:
 *                   response:
 *                     - location: "params"
 *                       field: "folder"
 *                       message: "Target folder tidak valid. Gunakan menu atau logo."
 *                   metaData:
 *                     message: "Target folder tidak valid. Gunakan menu atau logo."
 *                     code: 400
 *                     response_code: "400"
 *               InvalidFile:
 *                 summary: File bukan gambar yang didukung
 *                 value:
 *                   response: null
 *                   metaData:
 *                     message: "Tipe file tidak diizinkan. Hanya JPEG, PNG, GIF, dan WebP yang diperbolehkan."
 *                     code: 400
 *                     response_code: "0001"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - hanya ADMIN
 *
 * /upload/image:
 *   post:
 *     summary: Upload gambar ke folder menu default
 *     description: |
 *       Endpoint kompatibilitas lama. Target default adalah `menu`, sehingga object akan disimpan ke env `SUPABASE_FOLDER_MENU` atau default `menus`.
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: File gambar. Format yang didukung JPEG, PNG, GIF, WebP. Maksimal 5MB.
 *     responses:
 *       201:
 *         description: Gambar berhasil diupload ke folder menu default
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadImageResponse'
 *       400:
 *         description: File tidak valid atau ukuran file lebih dari 5MB
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - hanya ADMIN
 *
 * /upload/image/{folder}/{filename}:
 *   delete:
 *     summary: Hapus gambar dari folder tertentu
 *     description: |
 *       Menghapus object dari Supabase Storage berdasarkan target folder dan filename.
 *       Parameter `filename` tidak memakai prefix folder. Contoh benar: `uuid.webp`, bukan `menus/uuid.webp`.
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: folder
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/UploadFolderTarget'
 *         example: menu
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[a-zA-Z0-9_-]+\\.(jpg|jpeg|png|gif|webp)$'
 *         description: Nama file tanpa prefix folder.
 *         example: "019b1e1e-96d5-73d4-9c78-93ccdfc5412f.webp"
 *     responses:
 *       200:
 *         description: Gambar berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteUploadImageResponse'
 *       400:
 *         description: Target folder atau filename tidak valid
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - hanya ADMIN
 *       404:
 *         description: File tidak ditemukan
 *
 * /upload/image/{filename}:
 *   delete:
 *     summary: Hapus gambar dari folder menu default
 *     description: |
 *       Endpoint kompatibilitas lama. Target default adalah `menu`, sehingga object akan dihapus dari env `SUPABASE_FOLDER_MENU` atau default `menus`.
 *       Parameter `filename` tidak memakai prefix folder.
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[a-zA-Z0-9_-]+\\.(jpg|jpeg|png|gif|webp)$'
 *         description: Nama file tanpa prefix folder.
 *         example: "019b1e1e-96d5-73d4-9c78-93ccdfc5412f.webp"
 *     responses:
 *       200:
 *         description: Gambar berhasil dihapus dari folder menu default
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteUploadImageResponse'
 *       400:
 *         description: Filename tidak valid
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - hanya ADMIN
 *       404:
 *         description: File tidak ditemukan
 */

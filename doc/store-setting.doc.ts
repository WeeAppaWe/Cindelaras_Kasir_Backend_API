/**
 * @swagger
 * tags:
 *   name: Store Setting
 *   description: Manajemen pengaturan toko (profil, kontak, sosial media, struk)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     StoreSettingData:
 *       type: object
 *       properties:
 *         store_setting_id:
 *           type: string
 *           format: uuid
 *         setting_key:
 *           type: string
 *           example: "store_name"
 *         setting_value:
 *           type: string
 *           example: "Cindelaras Resto"
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *
 *     StoreSettingsMapResponse:
 *       type: object
 *       additionalProperties:
 *         type: string
 *       example:
 *         store_name: "Cindelaras Resto"
 *         store_address: "Jl. Ringroad Utara, Yogyakarta"
 *         store_phone: "08123456789"
 *         store_instagram: "@cindelaras_jogja"
 *
 *     StoreSettingListResponse:
 *       type: object
 *       properties:
 *         records:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/StoreSettingData'
 *         total:
 *           type: integer
 *           example: 10
 *
 *     UpsertSettingRequest:
 *       type: object
 *       required:
 *         - setting_key
 *         - setting_value
 *       properties:
 *         setting_key:
 *           type: string
 *           pattern: '^[a-z_]+$'
 *           example: "store_name"
 *         setting_value:
 *           type: string
 *           example: "Cindelaras Resto"
 *
 *     UpdateSettingRequest:
 *       type: object
 *       required:
 *         - setting_value
 *       properties:
 *         setting_value:
 *           type: string
 *           example: "Cindelaras Resto"
 *
 *     BatchUpdateSettingsRequest:
 *       type: object
 *       required:
 *         - settings
 *       properties:
 *         settings:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - setting_key
 *               - setting_value
 *             properties:
 *               setting_key:
 *                 type: string
 *                 example: "store_name"
 *               setting_value:
 *                 type: string
 *                 example: "Cindelaras Resto"
 */

/**
 * @swagger
 * /store-setting:
 *   get:
 *     summary: Get all store settings (array format)
 *     description: Mengambil semua pengaturan toko dalam format array
 *     tags: [Store Setting]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Store settings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/StoreSettingListResponse'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Berhasil mengambil data pengaturan toko"
 *
 *   post:
 *     summary: Create or update a setting (upsert)
 *     description: Membuat atau memperbarui pengaturan toko berdasarkan key
 *     tags: [Store Setting]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpsertSettingRequest'
 *     responses:
 *       200:
 *         description: Setting saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                     message:
 *                       type: string
 *                     data:
 *                       $ref: '#/components/schemas/StoreSettingData'
 *
 * /store-setting/map:
 *   get:
 *     summary: Get all store settings (key-value map format)
 *     description: Mengambil semua pengaturan toko dalam format key-value object (lebih mudah untuk FE)
 *     tags: [Store Setting]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Store settings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/StoreSettingsMapResponse'
 *
 * /store-setting/batch:
 *   put:
 *     summary: Batch update multiple settings
 *     description: Memperbarui beberapa pengaturan sekaligus dalam satu request
 *     tags: [Store Setting]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BatchUpdateSettingsRequest'
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                     message:
 *                       type: string
 *                     updated_count:
 *                       type: integer
 *
 * /store-setting/{setting_key}:
 *   get:
 *     summary: Get single setting by key
 *     description: Mengambil satu pengaturan berdasarkan key
 *     tags: [Store Setting]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: setting_key
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[a-z_]+$'
 *         example: store_name
 *     responses:
 *       200:
 *         description: Setting retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/StoreSettingData'
 *       404:
 *         description: Setting not found
 *
 *   put:
 *     summary: Update single setting by key
 *     description: Memperbarui satu pengaturan berdasarkan key (akan membuat baru jika belum ada)
 *     tags: [Store Setting]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: setting_key
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[a-z_]+$'
 *         example: store_name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSettingRequest'
 *     responses:
 *       200:
 *         description: Setting updated successfully
 *
 *   delete:
 *     summary: Delete setting by key
 *     description: Menghapus pengaturan berdasarkan key (soft delete)
 *     tags: [Store Setting]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: setting_key
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[a-z_]+$'
 *         example: store_instagram
 *     responses:
 *       200:
 *         description: Setting deleted successfully
 *       404:
 *         description: Setting not found
 */

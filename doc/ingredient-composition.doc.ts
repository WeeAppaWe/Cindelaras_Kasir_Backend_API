/**
 * @swagger
 * tags:
 *   name: Ingredient Composition
 *   description: Manajemen komposisi bahan setengah jadi (resep bahan)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCompositionInput:
 *       type: object
 *       required:
 *         - child_id
 *         - qty_needed
 *       properties:
 *         child_id:
 *           type: string
 *           format: uuid
 *           description: ID bahan baku yang menjadi komposisi
 *         qty_needed:
 *           type: number
 *           minimum: 0.01
 *           description: Jumlah yang dibutuhkan
 *           example: 0.5
 *
 *     UpdateCompositionInput:
 *       type: object
 *       required:
 *         - qty_needed
 *       properties:
 *         qty_needed:
 *           type: number
 *           minimum: 0.01
 *           example: 0.75
 *
 *     BulkAddCompositionsInput:
 *       type: object
 *       required:
 *         - compositions
 *       properties:
 *         compositions:
 *           type: array
 *           minItems: 1
 *           items:
 *             type: object
 *             required:
 *               - child_id
 *               - qty_needed
 *             properties:
 *               child_id:
 *                 type: string
 *                 format: uuid
 *               qty_needed:
 *                 type: number
 *                 minimum: 0.01
 *         target_yield:
 *           type: number
 *           minimum: 0.01
 *           default: 1
 *           description: Target hasil produksi
 *           example: 10
 *
 *     HPPPreviewInput:
 *       type: object
 *       required:
 *         - compositions
 *       properties:
 *         compositions:
 *           type: array
 *           minItems: 1
 *           items:
 *             type: object
 *             properties:
 *               ingredient_id:
 *                 type: string
 *                 format: uuid
 *               qty_needed:
 *                 type: number
 *         target_yield:
 *           type: number
 *           default: 1
 *
 *     CompositionWithDetails:
 *       type: object
 *       properties:
 *         ingredient_composition_id:
 *           type: string
 *           format: uuid
 *         parent_id:
 *           type: string
 *           format: uuid
 *         child_id:
 *           type: string
 *           format: uuid
 *         qty_needed:
 *           type: number
 *         subtotal:
 *           type: number
 *           description: qty_needed * avg_cost
 *         child_ingredient:
 *           type: object
 *           properties:
 *             ingredient_id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *               example: "Bawang Merah"
 *             type:
 *               type: string
 *               example: "raw"
 *             avg_cost:
 *               type: number
 *               example: 35000
 *             stock_qty:
 *               type: number
 *               example: 10
 *             unit:
 *               type: object
 *               properties:
 *                 unit_measure_id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                   example: "Kg"
 *
 *     CompositionListResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             parent_ingredient:
 *               type: object
 *               properties:
 *                 ingredient_id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                   example: "Bumbu Racik"
 *             total_hpp:
 *               type: number
 *               example: 50000
 *             compositions:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CompositionWithDetails'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil data komposisi"
 *
 *     HPPPreviewResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             total_hpp:
 *               type: number
 *               example: 50000
 *             target_yield:
 *               type: number
 *               example: 10
 *             hpp_per_unit:
 *               type: number
 *               example: 5000
 *             compositions:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ingredient_id:
 *                     type: string
 *                     format: uuid
 *                   ingredient_name:
 *                     type: string
 *                   qty_needed:
 *                     type: number
 *                   unit_name:
 *                     type: string
 *                   unit_cost:
 *                     type: number
 *                   subtotal:
 *                     type: number
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Preview HPP berhasil dihitung"
 *
 *     AvailableIngredientResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               ingredient_id:
 *                 type: string
 *                 format: uuid
 *               name:
 *                 type: string
 *               avg_cost:
 *                 type: number
 *               stock_qty:
 *                 type: number
 *               unit:
 *                 type: object
 *                 properties:
 *                   unit_measure_id:
 *                     type: string
 *                     format: uuid
 *                   name:
 *                     type: string
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil daftar bahan baku"
 */

/**
 * @swagger
 * /ingredient/semi/composition/available-ingredients:
 *   get:
 *     summary: Get available raw ingredients for composition dropdown
 *     description: Mengambil daftar bahan baku yang bisa dijadikan komposisi
 *     tags: [Ingredient Composition]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Available ingredients retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AvailableIngredientResponse'
 *
 * /ingredient/semi/composition/preview-hpp:
 *   post:
 *     summary: Preview HPP calculation before saving
 *     description: Menghitung preview HPP tanpa menyimpan ke database
 *     tags: [Ingredient Composition]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HPPPreviewInput'
 *     responses:
 *       200:
 *         description: HPP preview calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HPPPreviewResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /ingredient/semi/{ingredient_id}/composition:
 *   get:
 *     summary: Get all compositions for a semi ingredient
 *     description: Mengambil semua komposisi bahan dari bahan setengah jadi
 *     tags: [Ingredient Composition]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: ingredient_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID bahan setengah jadi
 *     responses:
 *       200:
 *         description: Compositions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompositionListResponse'
 *       404:
 *         description: Ingredient not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   post:
 *     summary: Add single composition to semi ingredient
 *     description: Menambahkan satu bahan ke komposisi bahan setengah jadi
 *     tags: [Ingredient Composition]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: ingredient_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCompositionInput'
 *     responses:
 *       201:
 *         description: Composition added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/CompositionWithDetails'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Komposisi berhasil ditambahkan"
 *       400:
 *         description: Validation error or duplicate composition
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               Duplicate:
 *                 summary: Bahan sudah ada dalam komposisi
 *                 value:
 *                   response: []
 *                   metaData:
 *                     message: "Bahan sudah ada dalam komposisi"
 *                     code: 409
 *                     response_code: "409"
 *
 * /ingredient/semi/{ingredient_id}/composition/bulk:
 *   post:
 *     summary: Bulk add or replace all compositions
 *     description: Mengganti semua komposisi dengan data baru (replace all)
 *     tags: [Ingredient Composition]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: ingredient_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BulkAddCompositionsInput'
 *     responses:
 *       200:
 *         description: Compositions replaced successfully
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
 *                       example: true
 *                     message:
 *                       type: string
 *                       example: "Komposisi berhasil diperbarui"
 *                     total_compositions:
 *                       type: integer
 *                       example: 5
 *                     total_hpp:
 *                       type: number
 *                       example: 50000
 *                     hpp_per_unit:
 *                       type: number
 *                       example: 5000
 *       400:
 *         description: Validation error
 *       404:
 *         description: Ingredient not found
 *
 * /ingredient/semi/{ingredient_id}/composition/{composition_id}:
 *   patch:
 *     summary: Update composition quantity
 *     description: Mengupdate jumlah bahan dalam komposisi
 *     tags: [Ingredient Composition]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: ingredient_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: composition_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCompositionInput'
 *     responses:
 *       200:
 *         description: Composition updated successfully
 *       404:
 *         description: Composition not found
 *
 *   delete:
 *     summary: Delete composition
 *     description: Menghapus bahan dari komposisi
 *     tags: [Ingredient Composition]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: ingredient_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: composition_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Composition deleted successfully
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
 *                       example: true
 *                     message:
 *                       type: string
 *                       example: "Komposisi berhasil dihapus"
 *       404:
 *         description: Composition not found
 */

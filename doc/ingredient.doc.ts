/**
 * @swagger
 * tags:
 *   - name: Ingredient
 *     description: Referensi bahan untuk dropdown
 *   - name: Ingredient Raw
 *     description: Manajemen bahan baku mentah
 *   - name: Ingredient Semi
 *     description: Manajemen bahan setengah jadi dengan komposisi dan HPP
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateRawIngredientInput:
 *       type: object
 *       required:
 *         - name
 *         - unit_id
 *         - min_stock
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: "Beras Premium"
 *         unit_id:
 *           type: string
 *           format: uuid
 *         stock_qty:
 *           type: number
 *           minimum: 0
 *           default: 0
 *           example: 50
 *         min_stock:
 *           type: number
 *           minimum: 0
 *           example: 10
 *         avg_cost:
 *           type: number
 *           minimum: 0
 *           default: 0
 *           example: 15000
 *
 *     UpdateRawIngredientInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *         unit_id:
 *           type: string
 *           format: uuid
 *         min_stock:
 *           type: number
 *           minimum: 0
 *         avg_cost:
 *           type: number
 *           minimum: 0
 *
 *     IngredientData:
 *       type: object
 *       properties:
 *         ingredient_id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         type:
 *           type: string
 *           enum: [RAW, SEMI]
 *         stock_qty:
 *           type: number
 *         min_stock:
 *           type: number
 *         avg_cost:
 *           type: number
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         unit:
 *           type: object
 *           properties:
 *             unit_measure_id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *               example: "Kg"
 *
 *     IngredientReference:
 *       type: object
 *       properties:
 *         ingredient_id:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           example: "Tepung Terigu"
 *         type:
 *           type: string
 *           enum: [RAW, SEMI]
 *           example: "RAW"
 *         unit:
 *           type: object
 *           properties:
 *             unit_measure_id:
 *               type: string
 *               format: uuid
 *               example: "660e8400-e29b-41d4-a716-446655440001"
 *             name:
 *               type: string
 *               example: "Kilogram"
 *
 *     IngredientReferenceListResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IngredientReference'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil data pilihan bahan"
 *
 *     CreateSemiIngredientInput:
 *       type: object
 *       required:
 *         - name
 *         - unit_id
 *         - min_stock
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: "Bumbu Racik"
 *         unit_id:
 *           type: string
 *           format: uuid
 *         min_stock:
 *           type: number
 *           minimum: 0
 *           example: 5
 *         target_yield:
 *           type: number
 *           minimum: 1
 *           default: 1
 *           description: Target hasil produksi
 *           example: 10
 *
 *     SemiIngredientWithCompositions:
 *       allOf:
 *         - $ref: '#/components/schemas/IngredientData'
 *         - type: object
 *           properties:
 *             child_compositions:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ingredient_composition_id:
 *                     type: string
 *                     format: uuid
 *                   child_id:
 *                     type: string
 *                     format: uuid
 *                   qty_needed:
 *                     type: number
 *                   child_ingredient:
 *                     type: object
 *                     properties:
 *                       ingredient_id:
 *                         type: string
 *                         format: uuid
 *                       name:
 *                         type: string
 *                       avg_cost:
 *                         type: number
 *                       unit:
 *                         type: object
 *                         properties:
 *                           unit_measure_id:
 *                             type: string
 *                             format: uuid
 *                           name:
 *                             type: string
 *             total_hpp:
 *               type: number
 *               description: Total HPP dari semua komposisi
 *             target_yield:
 *               type: number
 *               description: Target hasil produksi
 *
 *     HPPCalculationResult:
 *       type: object
 *       properties:
 *         total_hpp:
 *           type: number
 *           description: Total HPP dari semua komposisi
 *           example: 50000
 *         target_yield:
 *           type: number
 *           description: Target hasil produksi
 *           example: 10
 *         hpp_per_unit:
 *           type: number
 *           description: HPP per unit hasil
 *           example: 5000
 *         composition_count:
 *           type: integer
 *           description: Jumlah bahan dalam komposisi
 *           example: 3
 *         compositions:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               ingredient_name:
 *                 type: string
 *               qty_needed:
 *                 type: number
 *               unit_name:
 *                 type: string
 *               unit_cost:
 *                 type: number
 *               subtotal:
 *                 type: number
 *
 *     ProduceSemiIngredientInput:
 *       type: object
 *       required:
 *         - qty
 *       properties:
 *         qty:
 *           type: number
 *           minimum: 0.01
 *           example: 5
 *           description: Jumlah unit bahan semi yang diproduksi
 *         notes:
 *           type: string
 *           maxLength: 500
 *           example: "Produksi siang"
 *
 *     ProduceSemiIngredientResult:
 *       type: object
 *       properties:
 *         ingredient_id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: "Bumbu Dasar"
 *         type:
 *           type: string
 *           example: "SEMI"
 *         stock_qty:
 *           type: number
 *           example: 55
 *         min_stock:
 *           type: number
 *           example: 10
 *         avg_cost:
 *           type: number
 *           example: 13000
 *         unit:
 *           type: object
 *           properties:
 *             unit_measure_id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *               example: "Porsi"
 *         produced_qty:
 *           type: number
 *           example: 5
 *         deducted_ingredients:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               ingredient_id:
 *                 type: string
 *                 format: uuid
 *               ingredient_name:
 *                 type: string
 *                 example: "Bawang Merah"
 *               qty_deducted:
 *                 type: number
 *                 example: 10
 *               remaining_stock:
 *                 type: number
 *                 example: 90
 *
 *     LowStockAlertResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             total_count:
 *               type: integer
 *             records:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IngredientData'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil data bahan dengan stok rendah"
 *
 *     IngredientListResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             page:
 *               type: object
 *               properties:
 *                 total_record_count:
 *                   type: integer
 *                 batch_number:
 *                   type: integer
 *                 batch_size:
 *                   type: integer
 *                 max_batch_size:
 *                   type: integer
 *             records:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IngredientData'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil data bahan"
 */

/**
 * @swagger
 * /ingredient/options:
 *   get:
 *     summary: Get all ingredient references for dropdown
 *     description: Mengambil semua bahan aktif, baik RAW maupun SEMI, tanpa pagination untuk kebutuhan dropdown.
 *     tags: [Ingredient]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Ingredient references retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IngredientReferenceListResponse'
 *             example:
 *               response:
 *                 - ingredient_id: "550e8400-e29b-41d4-a716-446655440000"
 *                   name: "Tepung Terigu"
 *                   type: "RAW"
 *                   unit:
 *                     unit_measure_id: "660e8400-e29b-41d4-a716-446655440001"
 *                     name: "Kilogram"
 *                 - ingredient_id: "550e8400-e29b-41d4-a716-446655440003"
 *                   name: "Adonan Pizza"
 *                   type: "SEMI"
 *                   unit:
 *                     unit_measure_id: "660e8400-e29b-41d4-a716-446655440002"
 *                     name: "Porsi"
 *               metaData:
 *                 message: "Berhasil mengambil data pilihan bahan"
 *                 code: 200
 *                 response_code: "0000"
 *
 * /ingredient/raw/options:
 *   get:
 *     summary: Get raw ingredient references for dropdown
 *     description: Mengambil semua bahan baku aktif (type RAW) tanpa pagination untuk kebutuhan dropdown.
 *     tags: [Ingredient Raw]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Raw ingredient references retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IngredientReferenceListResponse'
 *             example:
 *               response:
 *                 - ingredient_id: "550e8400-e29b-41d4-a716-446655440000"
 *                   name: "Tepung Terigu"
 *                   type: "RAW"
 *                   unit:
 *                     unit_measure_id: "660e8400-e29b-41d4-a716-446655440001"
 *                     name: "Kilogram"
 *                 - ingredient_id: "550e8400-e29b-41d4-a716-446655440002"
 *                   name: "Gula Pasir"
 *                   type: "RAW"
 *                   unit:
 *                     unit_measure_id: "660e8400-e29b-41d4-a716-446655440001"
 *                     name: "Kilogram"
 *               metaData:
 *                 message: "Berhasil mengambil data pilihan bahan baku"
 *                 code: 200
 *                 response_code: "0000"
 *
 * /ingredient/raw/units:
 *   get:
 *     summary: Get unit measures for dropdown
 *     tags: [Ingredient Raw]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Unit measures retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnitMeasureReferenceListResponse'
 *
 * /ingredient/raw/low-stock:
 *   get:
 *     summary: Get raw ingredients with low stock alerts
 *     tags: [Ingredient Raw]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Low stock alerts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LowStockAlertResponse'
 *
 * /ingredient/raw:
 *   get:
 *     summary: Get all raw ingredients
 *     tags: [Ingredient Raw]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: batch
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *           maximum: 100
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by ingredient name
 *       - in: query
 *         name: unit_id
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: low_stock
 *         schema:
 *           type: boolean
 *         description: Filter hanya stok rendah
 *     responses:
 *       200:
 *         description: Raw ingredients retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IngredientListResponse'
 *
 *   post:
 *     summary: Create new raw ingredient
 *     tags: [Ingredient Raw]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRawIngredientInput'
 *     responses:
 *       201:
 *         description: Raw ingredient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/IngredientData'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Bahan baku berhasil dibuat"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /ingredient/raw/{ingredient_id}:
 *   get:
 *     summary: Get raw ingredient detail
 *     tags: [Ingredient Raw]
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
 *     responses:
 *       200:
 *         description: Raw ingredient detail retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/IngredientData'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Berhasil mengambil detail bahan baku"
 *       404:
 *         description: Ingredient not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                 message: "Bahan baku tidak ditemukan"
 *                 code: 404
 *                 response_code: "404"
 *
 *   patch:
 *     summary: Update raw ingredient
 *     tags: [Ingredient Raw]
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
 *             $ref: '#/components/schemas/UpdateRawIngredientInput'
 *     responses:
 *       200:
 *         description: Raw ingredient updated successfully
 *       404:
 *         description: Ingredient not found
 *
 *   delete:
 *     summary: Soft delete raw ingredient
 *     tags: [Ingredient Raw]
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
 *     responses:
 *       200:
 *         description: Raw ingredient deleted successfully
 *       404:
 *         description: Ingredient not found
 */

/**
 * @swagger
 * /ingredient/semi/units:
 *   get:
 *     summary: Get unit measures for dropdown
 *     tags: [Ingredient Semi]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Unit measures retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnitMeasureReferenceListResponse'
 *
 * /ingredient/semi:
 *   get:
 *     summary: Get all semi ingredients
 *     tags: [Ingredient Semi]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: batch
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: unit_id
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Semi ingredients retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IngredientListResponse'
 *
 *   post:
 *     summary: Create new semi ingredient
 *     tags: [Ingredient Semi]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSemiIngredientInput'
 *     responses:
 *       201:
 *         description: Semi ingredient created successfully
 *       400:
 *         description: Validation error
 *
 * /ingredient/semi/{ingredient_id}:
 *   get:
 *     summary: Get semi ingredient detail with compositions
 *     tags: [Ingredient Semi]
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
 *     responses:
 *       200:
 *         description: Semi ingredient detail with compositions retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/SemiIngredientWithCompositions'
 *       404:
 *         description: Ingredient not found
 *
 *   patch:
 *     summary: Update semi ingredient
 *     tags: [Ingredient Semi]
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
 *             $ref: '#/components/schemas/CreateSemiIngredientInput'
 *     responses:
 *       200:
 *         description: Semi ingredient updated successfully
 *       404:
 *         description: Ingredient not found
 *
 *   delete:
 *     summary: Soft delete semi ingredient
 *     tags: [Ingredient Semi]
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
 *     responses:
 *       200:
 *         description: Semi ingredient deleted successfully
 *       404:
 *         description: Ingredient not found
 *
 * /ingredient/semi/{ingredient_id}/hpp:
 *   get:
 *     summary: Get HPP calculation for semi ingredient
 *     description: Menghitung HPP (Harga Pokok Produksi) berdasarkan komposisi bahan
 *     tags: [Ingredient Semi]
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
 *     responses:
 *       200:
 *         description: HPP calculation retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/HPPCalculationResult'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Berhasil menghitung HPP"
 *       404:
 *         description: Ingredient not found
 *
 * /ingredient/semi/{ingredient_id}/recalculate-hpp:
 *   post:
 *     summary: Recalculate and update HPP for semi ingredient
 *     description: Menghitung ulang HPP dan mengupdate avg_cost bahan setengah jadi
 *     tags: [Ingredient Semi]
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
 *     responses:
 *       200:
 *         description: HPP recalculated and updated successfully
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
 *                       example: "HPP berhasil diupdate"
 *                     previous_hpp:
 *                       type: number
 *                       example: 4500
 *                     new_hpp:
 *                       type: number
 *                       example: 5000
 *       404:
 *         description: Ingredient not found
 *
 * /ingredient/semi/{ingredient_id}/produce:
 *   post:
 *     summary: Produksi bahan setengah jadi
 *     description: Memotong stok bahan penyusun dan menambah stok bahan setengah jadi, lalu menghitung ulang avg_cost berdasarkan produksi ini.
 *     tags: [Ingredient Semi]
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
 *             $ref: '#/components/schemas/ProduceSemiIngredientInput'
 *           example:
 *             qty: 5
 *             notes: "Produksi siang"
 *     responses:
 *       200:
 *         description: Produksi berhasil dicatat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/ProduceSemiIngredientResult'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Produksi berhasil dicatat"
 *       400:
 *         description: Stok bahan penyusun tidak mencukupi atau bahan belum memiliki komposisi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Bahan setengah jadi tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

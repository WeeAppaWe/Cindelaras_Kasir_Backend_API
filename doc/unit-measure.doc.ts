/**
 * @swagger
 * tags:
 *   name: Unit Measure
 *   description: Manajemen satuan ukur bahan
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUnitMeasureInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Nama satuan ukur
 *           minLength: 1
 *           maxLength: 50
 *           example: "Kilogram"
 *
 *     UpdateUnitMeasureInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nama satuan ukur
 *           minLength: 1
 *           maxLength: 50
 *           example: "Gram"
 *
 *     UnitMeasureReference:
 *       type: object
 *       properties:
 *         unit_measure_id:
 *           type: string
 *           format: uuid
 *           example: "660e8400-e29b-41d4-a716-446655440001"
 *         name:
 *           type: string
 *           example: "Kilogram"
 *
 *     UnitMeasureData:
 *       allOf:
 *         - $ref: '#/components/schemas/UnitMeasureReference'
 *         - type: object
 *           properties:
 *             created_at:
 *               type: string
 *               format: date-time
 *             updated_at:
 *               type: string
 *               format: date-time
 *               nullable: true
 *
 *     UnitMeasureListResponse:
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
 *                   example: 25
 *                 batch_number:
 *                   type: integer
 *                   example: 1
 *                 batch_size:
 *                   type: integer
 *                   example: 10
 *                 max_batch_size:
 *                   type: integer
 *                   example: 10
 *             records:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UnitMeasureData'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil data satuan"
 *
 *     UnitMeasureReferenceListResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UnitMeasureReference'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil data satuan"
 *
 *     UnitMeasureDetailResponse:
 *       type: object
 *       properties:
 *         response:
 *           $ref: '#/components/schemas/UnitMeasureData'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil detail satuan"
 *
 *     DeleteUnitMeasureResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: "Satuan berhasil dihapus"
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Satuan berhasil dihapus"
 */

/**
 * @swagger
 * /unit-measure/options:
 *   get:
 *     summary: Get unit measure references for dropdown
 *     description: Mengambil semua satuan ukur aktif tanpa pagination untuk kebutuhan dropdown.
 *     tags: [Unit Measure]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Unit measure references retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnitMeasureReferenceListResponse'
 *             example:
 *               response:
 *                 - unit_measure_id: "660e8400-e29b-41d4-a716-446655440001"
 *                   name: "Kilogram"
 *                 - unit_measure_id: "660e8400-e29b-41d4-a716-446655440002"
 *                   name: "Liter"
 *               metaData:
 *                 message: "Berhasil mengambil data pilihan satuan"
 *                 code: 200
 *                 response_code: "0000"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /unit-measure:
 *   get:
 *     summary: Get all unit measures
 *     description: Mengambil daftar satuan ukur dengan pagination dan pencarian.
 *     tags: [Unit Measure]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: batch
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *           maximum: 100
 *         description: Page size
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by unit measure name
 *     responses:
 *       200:
 *         description: Unit measures retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnitMeasureListResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   post:
 *     summary: Create new unit measure
 *     tags: [Unit Measure]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUnitMeasureInput'
 *     responses:
 *       201:
 *         description: Unit measure created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/UnitMeasureData'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Satuan berhasil dibuat"
 *                         code:
 *                           example: 201
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Unit measure name already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                 message: "Nama satuan sudah digunakan"
 *                 code: 409
 *                 response_code: "409"
 *
 * /unit-measure/{unit_measure_id}:
 *   get:
 *     summary: Get unit measure detail
 *     tags: [Unit Measure]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: unit_measure_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unit measure ID
 *     responses:
 *       200:
 *         description: Unit measure detail retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnitMeasureDetailResponse'
 *       404:
 *         description: Unit measure not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                 message: "Satuan tidak ditemukan"
 *                 code: 404
 *                 response_code: "404"
 *
 *   patch:
 *     summary: Update unit measure
 *     tags: [Unit Measure]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: unit_measure_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unit measure ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUnitMeasureInput'
 *     responses:
 *       200:
 *         description: Unit measure updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/UnitMeasureData'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Satuan berhasil diperbarui"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Unit measure not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Unit measure name already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                 message: "Nama satuan sudah digunakan"
 *                 code: 409
 *                 response_code: "409"
 *
 *   delete:
 *     summary: Soft delete unit measure
 *     tags: [Unit Measure]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: unit_measure_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unit measure ID
 *     responses:
 *       200:
 *         description: Unit measure deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteUnitMeasureResponse'
 *       400:
 *         description: Unit measure still has related ingredients
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response:
 *                 - location: "params"
 *                   field: "unit_measure_id"
 *                   message: "Satuan masih memiliki bahan terkait"
 *               metaData:
 *                 message: "Satuan tidak dapat dihapus karena masih digunakan oleh bahan"
 *                 code: 400
 *                 response_code: "400"
 *       404:
 *         description: Unit measure not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                 message: "Satuan tidak ditemukan"
 *                 code: 404
 *                 response_code: "404"
 */

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCategoryInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Category name
 *           minLength: 2
 *           maxLength: 50
 *           example: "Minuman"
 *
 *     UpdateCategoryInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Category name
 *           minLength: 2
 *           maxLength: 50
 *           example: "Makanan Ringan"
 *
 *     CategoryData:
 *       type: object
 *       properties:
 *         category_id:
 *           type: string
 *           format: uuid
 *           example: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d"
 *         name:
 *           type: string
 *           example: "Minuman"
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *
 *     CategoryWithCount:
 *       allOf:
 *         - $ref: '#/components/schemas/CategoryData'
 *         - type: object
 *           properties:
 *             _count:
 *               type: object
 *               properties:
 *                 menus:
 *                   type: integer
 *                   description: Number of menus in this category
 *                   example: 12
 *
 *     CategoryListResponse:
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
 *                 $ref: '#/components/schemas/CategoryWithCount'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil data kategori"
 *
 *     CategoryDetailResponse:
 *       type: object
 *       properties:
 *         response:
 *           $ref: '#/components/schemas/CategoryData'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil detail kategori"
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
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
 *         description: Page size
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by category name
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryListResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                 message: "Unauthorized"
 *                 code: 401
 *                 response_code: "401"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   post:
 *     summary: Create new category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryInput'
 *     responses:
 *       200:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                    $ref: '#/components/schemas/CategoryData'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Kategori berhasil dibuat"
 *                         code:
 *                           example: 201
 *       400:
 *         description: Validation error or Name already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               ValidationError:
 *                 summary: Validation Error
 *                 value:
 *                   response:
 *                     - location: "body"
 *                       field: "name"
 *                       message: "Required"
 *                   metaData:
 *                      message: "Validation Error"
 *                      code: 400
 *                      response_code: "400"
 *               NameExists:
 *                 summary: Name already exists
 *                 value:
 *                   response: []
 *                   metaData:
 *                      message: "Nama kategori sudah digunakan"
 *                      code: 409
 *                      response_code: "409"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /category/{category_id}:
 *   get:
 *     summary: Get category detail
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category detail retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryDetailResponse'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                  message: "Kategori tidak ditemukan"
 *                  code: 404
 *                  response_code: "404"
 *
 *   patch:
 *     summary: Update category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategoryInput'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                    $ref: '#/components/schemas/CategoryData'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Kategori berhasil diperbarui"
 *       400:
 *         description: Validation error or Name already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               ValidationError:
 *                 summary: Validation Error
 *                 value:
 *                   response:
 *                     - location: "body"
 *                       field: "name"
 *                       message: "Invalid value"
 *                   metaData:
 *                      message: "Validation Error"
 *                      code: 400
 *                      response_code: "400"
 *               NameExists:
 *                 summary: Name already exists
 *                 value:
 *                   response: []
 *                   metaData:
 *                      message: "Nama kategori sudah digunakan"
 *                      code: 409
 *                      response_code: "409"
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                  message: "Kategori tidak ditemukan"
 *                  code: 404
 *                  response_code: "404"
 *
 *   delete:
 *     summary: Soft delete category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
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
 *                       example: "Category deleted"
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Kategori berhasil dihapus"
 *       400:
 *         description: Category has menus
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response:
 *                 - location: "params"
 *                   field: "category_id"
 *                   message: "Kategori masih memiliki menu terkait"
 *               metaData:
 *                  message: "Kategori tidak dapat dihapus karena masih memiliki menu"
 *                  code: 400
 *                  response_code: "400"
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                  message: "Kategori tidak ditemukan"
 *                  code: 404
 *                  response_code: "404"
 */

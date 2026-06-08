/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: Menu management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateMenuInput:
 *       type: object
 *       required:
 *         - name
 *         - category_id
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: Menu name
 *           minLength: 2
 *           maxLength: 100
 *           example: "Nasi Goreng Spesial"
 *         category_id:
 *           type: string
 *           format: uuid
 *           description: Category ID
 *           example: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d"
 *         price:
 *           type: number
 *           description: Menu price
 *           minimum: 0
 *           example: 25000
 *         description:
 *           type: string
 *           maxLength: 500
 *           example: "Nasi goreng dengan topping lengkap"
 *         image_url:
 *           type: string
 *           format: uri
 *           maxLength: 255
 *           example: "https://example.com/image.jpg"
 *         is_available:
 *           type: boolean
 *           default: true
 *           example: true
 *
 *     UpdateMenuInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *         category_id:
 *           type: string
 *           format: uuid
 *         price:
 *           type: number
 *           minimum: 0
 *         description:
 *           type: string
 *           maxLength: 500
 *         image_url:
 *           type: string
 *           format: uri
 *           maxLength: 255
 *         is_available:
 *           type: boolean
 *
 *     MenuData:
 *       type: object
 *       properties:
 *         menu_id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         cost:
 *           type: number
 *         description:
 *           type: string
 *           nullable: true
 *         image_url:
 *           type: string
 *           nullable: true
 *         is_available:
 *           type: boolean
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         category:
 *           type: object
 *           properties:
 *             category_id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *
 *     MenuWithDetails:
 *       allOf:
 *         - $ref: '#/components/schemas/MenuData'
 *         - type: object
 *           properties:
 *             _count:
 *               type: object
 *               properties:
 *                 recipes:
 *                   type: integer
 *             margin_percent:
 *               type: number
 *             profit:
 *               type: number
 *
 *     MenuDetailResponseData:
 *       allOf:
 *         - $ref: '#/components/schemas/MenuData'
 *         - type: object
 *           properties:
 *             recipes:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   menu_recipe_id:
 *                     type: string
 *                     format: uuid
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
 *             cost_summary:
 *               type: object
 *               properties:
 *                 hpp:
 *                   type: number
 *                 price:
 *                   type: number
 *                 margin_percent:
 *                   type: number
 *                 profit:
 *                   type: number
 *
 *     MenuListResponse:
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
 *                 $ref: '#/components/schemas/MenuWithDetails'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil data menu"
 *
 *     MenuDetailResponse:
 *       type: object
 *       properties:
 *         response:
 *           $ref: '#/components/schemas/MenuDetailResponseData'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil detail menu"
 */

/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Get all menus
 *     tags: [Menu]
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
 *         description: Search by menu name
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by category
 *       - in: query
 *         name: is_available
 *         schema:
 *           type: boolean
 *         description: Filter by availability
 *     responses:
 *       200:
 *         description: List of menus retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuListResponse'
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
 *
 *   post:
 *     summary: Create new menu
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMenuInput'
 *     responses:
 *       200:
 *         description: Menu created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                    $ref: '#/components/schemas/MenuDetailResponseData'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Menu berhasil dibuat"
 *                         code:
 *                           example: 201
 *       400:
 *         description: Validation error or Data conflict
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               ValidationError:
 *                 summary: Validation Error (e.g. Category not found)
 *                 value:
 *                   response:
 *                     - location: "body"
 *                       field: "category_id"
 *                       message: "Kategori tidak ditemukan"
 *                   metaData:
 *                      message: "Kategori tidak ditemukan"
 *                      code: 400
 *                      response_code: "400"
 *               NameExists:
 *                 summary: Name already exists
 *                 value:
 *                   response: []
 *                   metaData:
 *                      message: "Nama menu sudah digunakan"
 *                      code: 409
 *                      response_code: "409"
 *
 * /menu/{menu_id}:
 *   get:
 *     summary: Get menu detail
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: menu_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Menu detail retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuDetailResponse'
 *       404:
 *         description: Menu not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                  message: "Menu tidak ditemukan"
 *                  code: 404
 *                  response_code: "404"
 *
 *   patch:
 *     summary: Update menu
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: menu_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMenuInput'
 *     responses:
 *       200:
 *         description: Menu updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                    $ref: '#/components/schemas/MenuDetailResponseData'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Menu berhasil diperbarui"
 *       400:
 *         description: Validation error or Data conflict
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
 *                       field: "category_id"
 *                       message: "Kategori tidak ditemukan"
 *                   metaData:
 *                      message: "Kategori tidak ditemukan"
 *                      code: 400
 *                      response_code: "400"
 *               NameExists:
 *                 summary: Name already exists
 *                 value:
 *                   response: []
 *                   metaData:
 *                      message: "Nama menu sudah digunakan"
 *                      code: 409
 *                      response_code: "409"
 *       404:
 *          description: Menu not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *              example:
 *                response: []
 *                metaData:
 *                   message: "Menu tidak ditemukan"
 *                   code: 404
 *                   response_code: "404"
 *
 *   delete:
 *     summary: Soft delete menu
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: menu_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Menu deleted successfully
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
 *                       example: "Menu deleted"
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Menu berhasil dihapus"
 *       400:
 *         description: Menu has orders
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response:
 *                 - location: "params"
 *                   field: "menu_id"
 *                   message: "Menu sudah memiliki riwayat pesanan"
 *               metaData:
 *                  message: "Menu tidak dapat dihapus karena sudah pernah dipesan"
 *                  code: 400
 *                  response_code: "400"
 *       404:
 *         description: Menu not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                  message: "Menu tidak ditemukan"
 *                  code: 404
 *                  response_code: "404"
 *
 * /menu/{menu_id}/toggle-availability:
 *   patch:
 *     summary: Toggle menu availability
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: menu_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Menu availability toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                    $ref: '#/components/schemas/MenuDetailResponseData'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Menu diaktifkan"
 *       404:
 *         description: Menu not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                  message: "Menu tidak ditemukan"
 *                  code: 404
 *                  response_code: "404"
 */

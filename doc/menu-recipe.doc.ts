/**
 * @swagger
 * tags:
 *   name: MenuRecipe
 *   description: Menu Recipe management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateRecipeInput:
 *       type: object
 *       required:
 *         - ingredient_id
 *         - qty_needed
 *       properties:
 *         ingredient_id:
 *           type: string
 *           format: uuid
 *         qty_needed:
 *           type: number
 *           minimum: 0.01
 *           example: 0.5
 *
 *     UpdateRecipeInput:
 *       type: object
 *       required:
 *         - qty_needed
 *       properties:
 *         qty_needed:
 *           type: number
 *           minimum: 0.01
 *           example: 0.75
 *
 *     BulkRecipeInput:
 *       type: object
 *       required:
 *         - recipes
 *       properties:
 *         recipes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateRecipeInput'
 *
 *     RecipeData:
 *       type: object
 *       properties:
 *         menu_recipe_id:
 *           type: string
 *           format: uuid
 *         menu_id:
 *           type: string
 *           format: uuid
 *         ingredient_id:
 *           type: string
 *           format: uuid
 *         qty_needed:
 *           type: number
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *
 *     RecipeWithIngredient:
 *       allOf:
 *         - $ref: '#/components/schemas/RecipeData'
 *         - type: object
 *           properties:
 *             ingredient:
 *               type: object
 *               properties:
 *                 ingredient_id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                 stock_qty:
 *                   type: number
 *                 avg_cost:
 *                   type: number
 *                 unit:
 *                   type: object
 *                   properties:
 *                     unit_measure_id:
 *                       type: string
 *                     name:
 *                       type: string
 *             subtotal:
 *               type: number
 *
 *     RecipeListResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             menu_id:
 *               type: string
 *               format: uuid
 *             recipes:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RecipeWithIngredient'
 *             total_hpp:
 *               type: number
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil data resep"
 *
 *     AddRecipeResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             recipe:
 *               $ref: '#/components/schemas/RecipeWithIngredient'
 *             new_hpp:
 *               type: number
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Bahan berhasil ditambahkan ke resep"
 *
 *     DeleteRecipeResponse:
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
 *               example: "Bahan berhasil dihapus dari resep"
 *             new_hpp:
 *               type: number
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Bahan berhasil dihapus dari resep"
 */

/**
 * @swagger
 * /menu/{menu_id}/recipe:
 *   get:
 *     summary: Get all recipes for a menu
 *     tags: [MenuRecipe]
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
 *         description: List of recipes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeListResponse'
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
 *   post:
 *     summary: Add recipe to menu
 *     tags: [MenuRecipe]
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
 *             $ref: '#/components/schemas/CreateRecipeInput'
 *     responses:
 *       200:
 *         description: Recipe added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                    $ref: '#/components/schemas/AddRecipeResponse'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Bahan berhasil ditambahkan ke resep"
 *                         code:
 *                           example: 201
 *       400:
 *         description: Validation error or Ingredient conflict
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               IngredientNotFound:
 *                  summary: Ingredient not found
 *                  value:
 *                    response:
 *                      - location: "body"
 *                        field: "ingredient_id"
 *                        message: "Bahan baku tidak ditemukan"
 *                    metaData:
 *                       message: "Bahan baku tidak ditemukan"
 *                       code: 400
 *                       response_code: "400"
 *               IngredientExists:
 *                  summary: Ingredient already in recipe
 *                  value:
 *                    response: []
 *                    metaData:
 *                       message: "Bahan baku sudah ada dalam resep"
 *                       code: 409
 *                       response_code: "409"
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
 *     summary: Bulk update/replace all recipes
 *     tags: [MenuRecipe]
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
 *             $ref: '#/components/schemas/BulkRecipeInput'
 *     responses:
 *       200:
 *         description: Recipes updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                    $ref: '#/components/schemas/RecipeListResponse'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Resep berhasil diperbarui"
 *       400:
 *         description: Validation error (Duplicate ingredients or Ingredient not found)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               Validation:
 *                 summary: Validation Error
 *                 value:
 *                   response:
 *                     - location: "body"
 *                       field: "recipes"
 *                       message: "Terdapat bahan baku duplikat dalam permintaan"
 *                   metaData:
 *                      message: "Terdapat bahan baku duplikat"
 *                      code: 400
 *                      response_code: "400"
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
 * /menu/{menu_id}/recipe/{recipe_id}:
 *   patch:
 *     summary: Update specific recipe quantity
 *     tags: [MenuRecipe]
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
 *       - in: path
 *         name: recipe_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRecipeInput'
 *     responses:
 *       200:
 *         description: Recipe updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                    $ref: '#/components/schemas/AddRecipeResponse'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Jumlah bahan berhasil diperbarui"
 *       404:
 *         description: Recipe not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *                response: []
 *                metaData:
 *                   message: "Resep tidak ditemukan"
 *                   code: 404
 *                   response_code: "404"
 *       400:
 *          description: Validation error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *              example:
 *                response:
 *                  - location: "params"
 *                    field: "recipe_id"
 *                    message: "Resep tidak ditemukan pada menu ini"
 *                metaData:
 *                   message: "Resep tidak ditemukan pada menu ini"
 *                   code: 400
 *                   response_code: "400"
 *
 *   delete:
 *     summary: Remove recipe from menu
 *     tags: [MenuRecipe]
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
 *       - in: path
 *         name: recipe_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/DeleteRecipeResponse'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Bahan berhasil dihapus dari resep"
 *       404:
 *         description: Recipe not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *                response: []
 *                metaData:
 *                   message: "Resep tidak ditemukan"
 *                   code: 404
 *                   response_code: "404"
 *       400:
 *          description: Validation error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *              example:
 *                response:
 *                  - location: "params"
 *                    field: "recipe_id"
 *                    message: "Resep tidak ditemukan pada menu ini"
 *                metaData:
 *                   message: "Resep tidak ditemukan pada menu ini"
 *                   code: 400
 *                   response_code: "400"
 */

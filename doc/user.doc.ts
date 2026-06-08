/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUserInput:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - name
 *         - role_id
 *       properties:
 *         username:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           pattern: '^[a-zA-Z0-9_]+$'
 *           example: "kasir1"
 *         password:
 *           type: string
 *           minLength: 6
 *           maxLength: 255
 *           example: "password123"
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: "Kasir Satu"
 *         phone_number:
 *           type: string
 *           description: Nomor WhatsApp user, digunakan untuk fitur lupa password
 *           minLength: 9
 *           maxLength: 20
 *           pattern: '^[0-9+\-\s]+$'
 *           example: "081234567890"
 *         role_id:
 *           type: string
 *           format: uuid
 *         user_status_id:
 *           type: string
 *           format: uuid
 *
 *     UpdateUserInput:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *         password:
 *           type: string
 *           minLength: 6
 *           maxLength: 255
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *         phone_number:
 *           type: string
 *           description: Nomor WhatsApp user, digunakan untuk fitur lupa password
 *           minLength: 9
 *           maxLength: 20
 *           pattern: '^[0-9+\-\s]+$'
 *         role_id:
 *           type: string
 *           format: uuid
 *         user_status_id:
 *           type: string
 *           format: uuid
 *
 *     UserData:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           format: uuid
 *         username:
 *           type: string
 *         name:
 *           type: string
 *         phone_number:
 *           type: string
 *           nullable: true
 *         last_login:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         role:
 *           type: object
 *           properties:
 *             role_id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *         user_status:
 *           type: object
 *           properties:
 *             user_status_id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *
 *     RoleReference:
 *       type: object
 *       properties:
 *         role_id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *
 *     UserStatusReference:
 *       type: object
 *       properties:
 *         user_status_id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *
 *     UserListResponse:
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
 *                 $ref: '#/components/schemas/UserData'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil data user"
 *
 *     UserDetailResponse:
 *       type: object
 *       properties:
 *         response:
 *           $ref: '#/components/schemas/UserData'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil detail user"
 *
 *     RoleListResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RoleReference'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil data role"
 *
 *     UserStatusListResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserStatusReference'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil data status user"
 */

/**
 * @swagger
 * /user/roles:
 *   get:
 *     summary: Get all roles for dropdown
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Roles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleListResponse'
 *
 * /user/statuses:
 *   get:
 *     summary: Get all user statuses for dropdown
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: User statuses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserStatusListResponse'
 *
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
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
 *         name: role_id
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: user_status_id
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserListResponse'
 *
 *   post:
 *     summary: Create new user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                    $ref: '#/components/schemas/UserDetailResponse'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "User berhasil dibuat"
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
 *                 summary: Role not found
 *                 value:
 *                   response:
 *                     - location: "body"
 *                       field: "role_id"
 *                       message: "Role tidak ditemukan"
 *                   metaData:
 *                      message: "Role tidak ditemukan"
 *                      code: 400
 *                      response_code: "400"
 *               UsernameExists:
 *                 summary: Username already exists
 *                 value:
 *                   response: []
 *                   metaData:
 *                      message: "Username sudah digunakan"
 *                      code: 409
 *                      response_code: "409"
 *               PhoneNumberExists:
 *                 summary: Phone number already exists
 *                 value:
 *                   response: []
 *                   metaData:
 *                      message: "Nomor WhatsApp sudah digunakan"
 *                      code: 409
 *                      response_code: "409"
 *
 * /user/{user_id}:
 *   get:
 *     summary: Get user detail
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User detail retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetailResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                  message: "User tidak ditemukan"
 *                  code: 404
 *                  response_code: "404"
 *
 *   patch:
 *     summary: Update user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserInput'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                    $ref: '#/components/schemas/UserDetailResponse'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "User berhasil diperbarui"
 *       400:
 *         description: Validation error or Data conflict
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               ValidationError:
 *                 summary: Role not found
 *                 value:
 *                   response:
 *                     - location: "body"
 *                       field: "role_id"
 *                       message: "Role tidak ditemukan"
 *                   metaData:
 *                      message: "Role tidak ditemukan"
 *                      code: 400
 *                      response_code: "400"
 *               UsernameExists:
 *                 summary: Username already exists
 *                 value:
 *                   response: []
 *                   metaData:
 *                      message: "Username sudah digunakan"
 *                      code: 409
 *                      response_code: "409"
 *               PhoneNumberExists:
 *                 summary: Phone number already exists
 *                 value:
 *                   response: []
 *                   metaData:
 *                      message: "Nomor WhatsApp sudah digunakan"
 *                      code: 409
 *                      response_code: "409"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                  message: "User tidak ditemukan"
 *                  code: 404
 *                  response_code: "404"
 *
 *   delete:
 *     summary: Soft delete user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User deleted successfully
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
 *                       example: "User deleted"
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "User berhasil dihapus"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                  message: "User tidak ditemukan"
 *                  code: 404
 *                  response_code: "404"
 */

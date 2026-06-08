/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MetaData:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Response message
 *           example: "Success"
 *         code:
 *           type: integer
 *           description: HTTP status code
 *           example: 200
 *         response_code:
 *           type: string
 *           description: Internal response code
 *           example: "0000"
 *
 *     LoginInput:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: User's username
 *           minLength: 3
 *           maxLength: 50
 *           example: "admin"
 *         password:
 *           type: string
 *           description: User's password
 *           minLength: 6
 *           maxLength: 255
 *           example: "password123"
 *
 *     LoginData:
 *       type: object
 *       properties:
 *         token:
 *           type: object
 *           properties:
 *             access_token:
 *               type: string
 *               description: JWT Access token
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *             api_key:
 *               type: string
 *               description: API Key for the session
 *               example: "550e8400-e29b-41d4-a716-446655440000"
 *             token_type:
 *               type: string
 *               description: Token type
 *               example: "Bearer"
 *             expires_in:
 *               type: integer
 *               description: Token expiration time in seconds
 *               example: 3600
 *         user:
 *           type: object
 *           properties:
 *             user_id:
 *               type: string
 *               description: User ID
 *               example: "123e4567-e89b-12d3-a456-426614174000"
 *             username:
 *               type: string
 *               description: Username
 *               example: "admin"
 *             name:
 *               type: string
 *               description: User's full name
 *               example: "Administrator"
 *             role:
 *               type: object
 *               properties:
 *                 role_id:
 *                   type: integer
 *                   description: Role ID
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Role name
 *                   example: "ADMIN"
 *             status:
 *               type: object
 *               properties:
 *                 user_status_id:
 *                   type: integer
 *                   description: Status ID
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Status name
 *                   example: "ACTIVE"
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         response:
 *           $ref: '#/components/schemas/LoginData'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Login berhasil"
 *
 *     LogoutData:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Logout berhasil"
 *
 *     LogoutResponse:
 *       type: object
 *       properties:
 *         response:
 *           $ref: '#/components/schemas/LogoutData'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Logout berhasil"
 *
 *     ForgotPasswordRequestOtpInput:
 *       type: object
 *       required:
 *         - phone_number
 *       properties:
 *         phone_number:
 *           type: string
 *           description: Registered WhatsApp phone number
 *           minLength: 9
 *           maxLength: 20
 *           example: "081234567890"
 *
 *     ForgotPasswordRequestOtpData:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "OTP reset password berhasil dikirim ke WhatsApp"
 *         expires_in:
 *           type: integer
 *           description: OTP validity duration in seconds
 *           example: 300
 *
 *     ForgotPasswordRequestOtpResponse:
 *       type: object
 *       properties:
 *         response:
 *           $ref: '#/components/schemas/ForgotPasswordRequestOtpData'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "OTP reset password berhasil dikirim"
 *
 *     ResetPasswordInput:
 *       type: object
 *       required:
 *         - phone_number
 *         - otp
 *         - password
 *         - confirm_password
 *       properties:
 *         phone_number:
 *           type: string
 *           description: Registered WhatsApp phone number
 *           minLength: 9
 *           maxLength: 20
 *           example: "081234567890"
 *         otp:
 *           type: string
 *           description: Six-digit OTP received via WhatsApp
 *           minLength: 6
 *           maxLength: 6
 *           example: "123456"
 *         password:
 *           type: string
 *           format: password
 *           description: New password
 *           minLength: 6
 *           maxLength: 255
 *           example: "passwordBaru123"
 *         confirm_password:
 *           type: string
 *           format: password
 *           description: Confirmation for the new password
 *           minLength: 6
 *           maxLength: 255
 *           example: "passwordBaru123"
 *
 *     ResetPasswordData:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Password berhasil diperbarui"
 *
 *     ResetPasswordResponse:
 *       type: object
 *       properties:
 *         response:
 *           $ref: '#/components/schemas/ResetPasswordData'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Password berhasil diperbarui"
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: array
 *           items:
 *             type: object
 *         metaData:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Username atau password salah"
 *             code:
 *               type: integer
 *               example: 401
 *             response_code:
 *               type: string
 *               example: "0001"
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized (Invalid credentials or inactive account)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /auth/forgot-password/request-otp:
 *   post:
 *     summary: Request forgot password OTP
 *     description: Sends a password reset OTP to the registered WhatsApp phone number.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequestOtpInput'
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForgotPasswordRequestOtpResponse'
 *       401:
 *         description: Unauthorized (Inactive account)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       422:
 *         description: Validation error, phone number not registered, or WhatsApp provider not configured
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Failed to send OTP
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /auth/forgot-password/reset-password:
 *   post:
 *     summary: Reset password using OTP
 *     description: Resets the account password after validating the OTP sent via WhatsApp.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordInput'
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResetPasswordResponse'
 *       401:
 *         description: Unauthorized (Inactive account)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       422:
 *         description: Validation error, invalid OTP, expired OTP, or OTP cooldown is active
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogoutResponse'
 *       401:
 *         description: Unauthorized (Invalid token)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const token_validation_middleware_1 = require("../middleware/token-validation.middleware");
const role_validation_middleware_1 = require("../middleware/role-validation.middleware");
const zod_validation_middleware_1 = require("../middleware/zod-validation.middleware");
const auth_schema_1 = require("../src/modules/auth/auth.schema");
const upload_schema_1 = require("../src/modules/upload/upload.schema");
const upload_service_1 = __importDefault(require("../src/modules/upload/upload.service"));
const upload_controller_1 = __importDefault(require("../src/modules/upload/upload.controller"));
const router = express_1.default.Router();
const pathGroup = 'upload';
// Role configurations
const adminOnly = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN])];
// ============================================
// Multer error handler middleware
// ============================================
const handleMulterError = (err, req, res, next) => {
    if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                code: 400,
                message: 'Ukuran file terlalu besar. Maksimal 5MB.',
                response: null,
            });
        }
        if (err.message) {
            return res.status(400).json({
                code: 400,
                message: err.message,
                response: null,
            });
        }
    }
    next(err);
};
// ============================================
// Upload Routes (ADMIN only)
// ============================================
router.post(`/${pathGroup}/image/:folder`, ...adminOnly, (0, zod_validation_middleware_1.zodValidation)(upload_schema_1.uploadImageFolderParamsSchema, 'params'), upload_service_1.default.upload.single('image'), handleMulterError, upload_controller_1.default.uploadImage);
router.post(`/${pathGroup}/image`, ...adminOnly, upload_service_1.default.upload.single('image'), handleMulterError, upload_controller_1.default.uploadImage);
router.delete(`/${pathGroup}/image/:folder/:filename`, ...adminOnly, (0, zod_validation_middleware_1.zodValidation)(upload_schema_1.deleteImageFolderParamsSchema, 'params'), upload_controller_1.default.deleteImage);
router.delete(`/${pathGroup}/image/:filename`, ...adminOnly, (0, zod_validation_middleware_1.zodValidation)(upload_schema_1.deleteImageParamsSchema, 'params'), upload_controller_1.default.deleteImage);
exports.default = router;
//# sourceMappingURL=upload.route.js.map
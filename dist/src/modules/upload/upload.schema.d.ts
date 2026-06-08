import { z } from 'zod';
/**
 * Allowed storage folder target.
 */
export declare const uploadTargetSchema: z.ZodEnum<{
    menu: "menu";
    logo: "logo";
}>;
/**
 * Validate uploaded file (used for manual validation in service)
 */
export declare const uploadedFileSchema: z.ZodObject<{
    fieldname: z.ZodString;
    originalname: z.ZodString;
    encoding: z.ZodString;
    mimetype: z.ZodEnum<{
        "image/jpeg": "image/jpeg";
        "image/jpg": "image/jpg";
        "image/png": "image/png";
        "image/gif": "image/gif";
        "image/webp": "image/webp";
    }>;
    size: z.ZodNumber;
    buffer: z.ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>;
}, z.core.$strip>;
/**
 * Upload image folder params schema
 */
export declare const uploadImageFolderParamsSchema: z.ZodObject<{
    folder: z.ZodEnum<{
        menu: "menu";
        logo: "logo";
    }>;
}, z.core.$strip>;
/**
 * Delete image params schema
 */
export declare const deleteImageParamsSchema: z.ZodObject<{
    filename: z.ZodString;
}, z.core.$strip>;
/**
 * Delete image params schema with folder target
 */
export declare const deleteImageFolderParamsSchema: z.ZodObject<{
    filename: z.ZodString;
    folder: z.ZodEnum<{
        menu: "menu";
        logo: "logo";
    }>;
}, z.core.$strip>;
export type UploadedFileInput = z.infer<typeof uploadedFileSchema>;
export type UploadImageFolderParams = z.infer<typeof uploadImageFolderParamsSchema>;
export type DeleteImageParams = z.infer<typeof deleteImageParamsSchema>;
export type DeleteImageFolderParams = z.infer<typeof deleteImageFolderParamsSchema>;
//# sourceMappingURL=upload.schema.d.ts.map
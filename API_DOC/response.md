# Response Format Documentation

Dokumentasi ini menjelaskan seluruh format response yang diatur dan dipakai di backend Sistem Kasir. Mayoritas endpoint JSON memakai envelope standar dari `utility/response-api.ts`, sedangkan error global dikendalikan oleh `exception/index.ts`.

## Source of Truth

| File | Fungsi |
| --- | --- |
| `utility/response-api.ts` | Helper utama untuk response JSON sukses dan beberapa response langsung. |
| `types/express.types.d.ts` | Definisi TypeScript `ApiResponse<T>`. |
| `exception/index.ts` | Global error handler Express. |
| `exception/prisma-error.exception.ts` | Mapping error Prisma ke HTTP code dan `response_code`. |
| `middleware/zod-validation.middleware.ts` | Mengubah error validasi Zod menjadi `ErrorValidationException`. |
| `route/upload.route.ts` | Response khusus error Multer/file upload. |
| `app.ts` | Response khusus `/health`. |
| `src/modules/report/export/report-export.controller.ts` | Response file export PDF/Excel. |
| `src/modules/receipt/receipt.service.ts` | Response file PDF struk. |
| `utility/swagger.utility.ts` | Response raw JSON Swagger. |

## Standard JSON Envelope

Format JSON standar API:

```json
{
  "response": {},
  "metaData": {
    "message": "Pesan response",
    "code": 200,
    "response_code": "0000"
  }
}
```

Definisi TypeScript:

```ts
export interface ApiResponse<T = any> {
  response: T;
  metaData: {
    message: string;
    code: number;
    response_code: string;
  };
}
```

### Field Detail

| Field | Type | Keterangan |
| --- | --- | --- |
| `response` | Any | Payload utama. Bisa object, array, null, atau object pagination. |
| `metaData.message` | String | Pesan human-readable untuk frontend/user. |
| `metaData.code` | Number | HTTP status code yang dipakai oleh response. |
| `metaData.response_code` | String | Kode internal aplikasi. |

## `responseApi` Behavior

Helper `responseApi(metaData, data)` memiliki perilaku berikut:

| Input `metaData.code` | HTTP Status Yang Umum Dipakai | Output `response_code` | Catatan |
| --- | --- | --- | --- |
| `200` | `200 OK` | `0000` | Sukses normal. |
| Selain `200` | Sesuai controller | Nilai `res_code` jika dikirim, default `0001` | Termasuk `201 Created`. |
| Tidak dikirim | Tergantung pemanggil | `0001` | Default `code = 500`, `message = "Ok"`. |

Catatan penting: saat ini response sukses dengan HTTP `201 Created` tetap menghasilkan `response_code: "0001"` karena helper hanya menganggap `code === 200` sebagai `0000`. Untuk frontend, validasi sukses sebaiknya memakai HTTP status dan `metaData.code`, bukan hanya `response_code`.

## Response Code Reference

| `response_code` | Makna Umum | Dipakai Pada |
| --- | --- | --- |
| `0000` | Sukses normal | Response standar dengan `metaData.code = 200`. |
| `0001` | Error umum/default, auth error, not found umum, limit, sync, atau response non-200 tanpa `res_code` khusus | Banyak error global dan response `201` saat ini. |
| `5505` | Validasi gagal / invalid parameter | `ErrorValidationException`, `ErrorInvalidParameterException`, Prisma validation error. |
| `5542` | Duplicate/constraint/unique conflict | `ErrorModelDuplicateDataException`, Prisma `P2002`. |
| `5574` | Data/model tidak ditemukan pada beberapa flow | `ErrorModelNotFoundException`, Prisma `P2001`, Prisma `P2025`. |

## Success Responses

### 200 OK

Dipakai oleh sebagian besar endpoint read/update/delete/action.

```json
{
  "response": {
    "id": "uuid",
    "name": "Contoh Data"
  },
  "metaData": {
    "message": "Berhasil mengambil data",
    "code": 200,
    "response_code": "0000"
  }
}
```

### 200 OK Dengan Array

```json
{
  "response": [
    {
      "id": "uuid-1",
      "name": "Data 1"
    },
    {
      "id": "uuid-2",
      "name": "Data 2"
    }
  ],
  "metaData": {
    "message": "Berhasil mengambil data",
    "code": 200,
    "response_code": "0000"
  }
}
```

### 200 OK Dengan Pagination

Beberapa endpoint list mengembalikan object pagination di dalam `response`.

```json
{
  "response": {
    "page": {
      "total_record_count": 50,
      "batch_number": 1,
      "batch_size": 10,
      "max_batch_size": 100
    },
    "records": [
      {
        "id": "uuid",
        "name": "Contoh Data"
      }
    ]
  },
  "metaData": {
    "message": "Berhasil mengambil data",
    "code": 200,
    "response_code": "0000"
  }
}
```

### 201 Created

Dipakai oleh endpoint create/upload/stock-in/stock-out tertentu.

```json
{
  "response": {
    "id": "uuid",
    "name": "Data Baru"
  },
  "metaData": {
    "message": "Data berhasil dibuat",
    "code": 201,
    "response_code": "0001"
  }
}
```

Catatan: `response_code: "0001"` pada `201` adalah perilaku helper saat ini, bukan berarti request gagal.

## Standard Error Responses

Semua error yang dilempar ke `next(error)` akan diproses oleh global error handler di `exception/index.ts`.

### Authentication Error

Sumber: `ErrorAuthenticationException`.

HTTP status: `401 Unauthorized`

```json
{
  "response": {},
  "metaData": {
    "message": "Authorization token or API key is missing!",
    "code": 401,
    "response_code": "0001"
  }
}
```

Dipakai untuk:

| Kondisi | Contoh Message |
| --- | --- |
| Header `Authorization` atau `x-api-key` kosong | `Authorization token or API key is missing!` |
| Format bearer salah | `Invalid Bearer token format!` |
| Token invalid/expired | `Token expired or not authorized.` |
| User tidak ditemukan | `User not found.` |
| Role tidak sesuai | `Forbidden access. You do not have permission to access this resource.` |

### URL Not Found

Sumber: `urlValidation` melempar `ErrorNotFoundException`.

HTTP status: `404 Not Found`

```json
{
  "response": {},
  "metaData": {
    "message": "Url Not Found",
    "code": 404,
    "response_code": "0001"
  }
}
```

### Generic Not Found

Sumber: `ErrorNotFoundException`.

HTTP status: `404 Not Found`

```json
{
  "response": {},
  "metaData": {
    "message": "Data not found!",
    "code": 404,
    "response_code": "0001"
  }
}
```

### Model Not Found Dengan HTTP 200

Sumber: `ErrorModelNotFoundException`.

HTTP status: `200 OK`

```json
{
  "response": {},
  "metaData": {
    "message": "Ops, Data tidak ditemukan.",
    "code": 200,
    "response_code": "5574"
  }
}
```

Catatan: ini adalah pola legacy/khusus. Secara HTTP status tetap `200`, tetapi `response_code` menunjukkan data tidak ditemukan.

### Data Already Exist

Sumber: `ErrorDataAlreadyExistException`.

HTTP status: `422 Unprocessable Entity`

```json
{
  "response": {},
  "metaData": {
    "message": "Data has been used.",
    "code": 422,
    "response_code": "0001"
  }
}
```

### Validation Error

Sumber: `ErrorValidationException`, termasuk hasil dari Zod validation middleware.

HTTP status: `422 Unprocessable Entity`

```json
{
  "response": {
    "error": [
      {
        "location": "body",
        "field": "name",
        "message": "Nama wajib diisi"
      }
    ]
  },
  "metaData": {
    "message": "Validasi gagal",
    "code": 422,
    "response_code": "5505"
  }
}
```

Jika service melempar validasi tanpa detail array, bentuknya:

```json
{
  "response": {
    "error": null
  },
  "metaData": {
    "message": "Gagal mengupload file",
    "code": 422,
    "response_code": "5505"
  }
}
```

### Invalid Parameter Error

Sumber: `ErrorInvalidParameterException`.

HTTP status: `422 Unprocessable Entity`

```json
{
  "response": {
    "error": {
      "field": "id",
      "message": "Parameter tidak valid"
    }
  },
  "metaData": {
    "message": "Parameter tidak valid",
    "code": 422,
    "response_code": "5505"
  }
}
```

### Duplicate Model Error

Sumber: `ErrorModelDuplicateDataException`.

HTTP status: `422 Unprocessable Entity`

```json
{
  "response": {
    "field": "username"
  },
  "metaData": {
    "message": "Ops, Data sudah digunakan",
    "code": 422,
    "response_code": "5542"
  }
}
```

### Code/Internal Error

Sumber: `ErrorCodeException`.

HTTP status: `500 Internal Server Error`

```json
{
  "response": {},
  "metaData": {
    "message": "Internal server error.",
    "code": 500,
    "response_code": "0001"
  }
}
```

### Query Error

Sumber: `ErrorQueryException`.

HTTP status: mengikuti `err.data.metaData.code`.

```json
{
  "response": {},
  "metaData": {
    "message": "Ops, terjadi kesalahan query. Detail error",
    "code": 500,
    "response_code": "0001"
  }
}
```

### Limit Error

Sumber: `ErrorLimitException`.

HTTP status: `422 Unprocessable Entity`

```json
{
  "response": {},
  "metaData": {
    "message": "Out of limit!",
    "code": 422,
    "response_code": "0001"
  }
}
```

### Previous Stage Not Passed

Sumber: `ErrorPreviousStageNotPassed`.

HTTP status: `422 Unprocessable Entity`

```json
{
  "response": {},
  "metaData": {
    "message": "Tahap sebelumnya belum selesai",
    "code": 422,
    "response_code": "0001"
  }
}
```

### Synchronization Error

Sumber: `ErrorSyncronization`.

HTTP status: `422 Unprocessable Entity`

```json
{
  "response": {},
  "metaData": {
    "message": "Sinkronisasi gagal",
    "code": 422,
    "response_code": "0001"
  }
}
```

### Fallback Unhandled Error

Sumber: error biasa yang tidak cocok dengan custom exception mana pun.

HTTP status: `500 Internal Server Error`

```json
{
  "response": {},
  "metaData": {
    "message": "Ops, Unexpected error message",
    "code": 500,
    "response_code": "0001"
  }
}
```

## Prisma Error Responses

Prisma error akan dikonversi menjadi `PrismaErrorException`, lalu dikirim dengan envelope standar:

```json
{
  "response": {},
  "metaData": {
    "message": "Pesan error Prisma yang sudah dimapping",
    "code": 500,
    "response_code": "0001"
  }
}
```

### Prisma Mapping Summary

| Prisma Error | HTTP Code | `response_code` | Keterangan |
| --- | --- | --- | --- |
| `P1000` - `P1017` | `500` | `0001` | Error koneksi/konfigurasi database, termasuk auth DB dan TLS. |
| `P2000` | `400` | `0001` | Value terlalu panjang. |
| `P2001` | `404` | `5574` | Record tidak ditemukan. |
| `P2002` | `409` | `5542` | Unique constraint failed. |
| `P2003` | `409` | `0001` | Foreign key constraint failed. |
| `P2004` | `422` | `0001` | Constraint database gagal. |
| `P2005` - `P2009` | `400` | `0001` | Invalid value/query parsing/query validation. |
| `P2010` | `500` | `0001` | Raw query failed. |
| `P2011` - `P2014` | `400` | `0001` | Null constraint, missing value/argument, relation violation. |
| `P2015` | `404` | `0001` | Related record tidak ditemukan. |
| `P2016` - `P2020` | `400` | `0001` | Query/input/value range error. |
| `P2021` - `P2023` | `500` | `0001` | Table/column/inconsistent column data. |
| `P2024` | `503` | `0001` | Connection pool timeout. |
| `P2025` | `404` | `5574` | Record untuk update/delete tidak ditemukan. |
| `P2026` - `P2028` | `500` | `0001` | Feature/transaction/multiple database error. |
| `P2029` | `400` | `0001` | Query parameter limit exceeded. |
| `P2030` - `P2031` | `500` | `0001` | Fulltext index/MongoDB replica set issue. |
| `P2033` | `400` | `0001` | Number terlalu besar. |
| `P2034` | `409` | `0001` | Transaction conflict/deadlock. |
| `P2035` - `P2036` | `500` | `0001` | Assertion/external connector error. |
| `P2037` | `503` | `0001` | Too many database connections. |
| `P3000` - `P3024` | `500` | `0001` | Migration engine error. |
| `P4000` - `P4002` | `500` | `0001` | Introspection engine error. |
| `P5011` | `429` | `0001` | Too many requests. |
| `P6000`, `P6001`, `P6006`, `P6008` | `500` | `0001` | Prisma Accelerate system error. |
| `P6002` | `401` | `0001` | Unauthorized Prisma Accelerate API key. |
| `P6003`, `P6009` | `429` | `0001` | Prisma Accelerate usage limit. |
| `P6004` | `504` | `0001` | Query timeout. |
| `P6005` | `400` | `0001` | Invalid parameters. |
| `P6010` | `403` | `0001` | Prisma Accelerate project disabled. |
| `PrismaClientValidationError` | `422` | `5505` | Prisma validation error. |
| Unknown Prisma error | `500` | `0001` | Fallback Prisma error. |

## Upload/Multer Error Responses

Beberapa error upload file tidak memakai envelope standar `response/metaData`. Error ini dikirim langsung dari `route/upload.route.ts`.

### File Terlalu Besar

HTTP status: `400 Bad Request`

```json
{
  "code": 400,
  "message": "Ukuran file terlalu besar. Maksimal 5MB.",
  "response": null
}
```

### MIME Type Tidak Diizinkan

HTTP status: `400 Bad Request`

```json
{
  "code": 400,
  "message": "Tipe file tidak diizinkan. Hanya JPEG, PNG, GIF, dan WebP yang diperbolehkan.",
  "response": null
}
```

### File Tidak Dikirim

Error ini berasal dari controller upload dan memakai `responseApi`.

HTTP status: `400 Bad Request`

```json
{
  "response": null,
  "metaData": {
    "message": "File tidak ditemukan. Mohon pilih file gambar.",
    "code": 400,
    "response_code": "0001"
  }
}
```

## Health Check Response

Endpoint `/health` tidak memakai envelope standar.

HTTP status: `200 OK`

```json
{
  "status": "ok",
  "service": "sistem-kasir-backend-api",
  "uptime": 123.456
}
```

## Non-JSON Success Responses

Beberapa endpoint sukses tidak mengembalikan JSON karena menghasilkan file.

### Receipt PDF Inline

Endpoint:

```txt
GET /api/receipt/:order_id/pdf
```

Response headers:

| Header | Nilai |
| --- | --- |
| `Content-Type` | `application/pdf` |
| `Content-Disposition` | `inline; filename="struk-<receipt>.pdf"` |
| `Content-Length` | Ukuran file PDF dalam byte |

Body response: binary PDF buffer.

Jika terjadi error, response kembali ke format error JSON standar dari global error handler.

### Report Export PDF

Endpoint:

```txt
POST /api/report/export/pdf
```

Response headers:

| Header | Nilai |
| --- | --- |
| `Content-Type` | `application/pdf` |
| `Content-Disposition` | `attachment; filename="<file_name>.pdf"` |
| `Content-Length` | Ukuran file PDF dalam byte |

Body response: binary PDF buffer.

### Report Export Excel

Endpoint:

```txt
POST /api/report/export/excel
```

Response headers:

| Header | Nilai |
| --- | --- |
| `Content-Type` | `application/vnd.ms-excel` |
| `Content-Disposition` | `attachment; filename="<file_name>.xls"` |
| `Content-Length` | Ukuran file XLS dalam byte |

Body response: binary XLS buffer.

## Swagger Response

Swagger JSON tidak memakai envelope standar.

Endpoint:

```txt
GET /api-docs.json
```

Response:

```json
{
  "openapi": "3.0.0",
  "info": {},
  "paths": {}
}
```

Header:

```txt
Content-Type: application/json
```

Endpoint UI Swagger:

```txt
GET /api-docs
```

Response berupa HTML UI dari Swagger.

## Legacy Sequelize Error Format

File `utility/error-format.ts` masih ada dan dipakai oleh folder template JS lama (`src/modules/templateJS`). Formatnya berbeda dari envelope aktif:

```json
{
  "data": [
    {
      "field": "name",
      "message": "Data has been entered."
    }
  ],
  "metaData": {
    "message": "Error message",
    "code": 422,
    "response_code": "5574"
  }
}
```

Catatan: format ini bukan format utama route aktif TypeScript. Route aktif memakai `response` + `metaData`.

## Frontend Handling Recommendation

Untuk endpoint JSON standar:

1. Gunakan HTTP status dan `metaData.code` sebagai indikator utama sukses/gagal.
2. Untuk response sukses `200`, `metaData.response_code` bernilai `0000`.
3. Untuk response sukses `201`, jangan anggap `response_code: "0001"` sebagai gagal selama HTTP status dan `metaData.code` adalah `201`.
4. Untuk validasi form, baca detail error dari `response.error`.
5. Untuk download PDF/Excel, jangan parse body sebagai JSON saat HTTP status sukses.
6. Untuk `/health` dan `/api-docs.json`, gunakan format khusus masing-masing.


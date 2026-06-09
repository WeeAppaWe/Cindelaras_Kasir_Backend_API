# Dokumentasi CORS

Dokumentasi ini menjelaskan konfigurasi **Cross-Origin Resource Sharing (CORS)** yang dipakai oleh backend Sistem Kasir.

CORS bukan endpoint API, tetapi middleware global Express yang menentukan apakah aplikasi frontend dari origin berbeda boleh mengakses API backend.

## Source of Truth

| File | Fungsi |
| --- | --- |
| `app.ts` | Mendefinisikan `corsOptions` dan memasang middleware `app.use(cors(corsOptions))`. |
| `package.json` | Memakai package `cors` versi `2.8.5` dan `@types/cors` versi `2.8.19`. |

## Posisi Middleware

Middleware CORS dipasang di awal aplikasi:

```ts
app.use(cors(corsOptions));
```

Karena dipasang sebelum route lain, konfigurasi CORS berlaku global untuk:

| Area | Berlaku CORS |
| --- | --- |
| `/health` | Ya |
| `/api/*` | Ya |
| Swagger documentation | Ya |
| Static files dari Express | Ya |
| Semua route lain yang melewati Express app | Ya |

## Konfigurasi Saat Ini

Konfigurasi aktual di `app.ts`:

```ts
const corsOptions: cors.CorsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'X-Content-Type-Options',
        'X-XSS-Protection',
        'X-Frame-Options',
        'Strict-Transport-Security',
        'APIKey',
        'x-api-key',
        'x-payload',
        'timezone',
        'utc-offset'
    ],
    maxAge: 86400,
    credentials: true
};
```

### Detail Konfigurasi

| Opsi | Nilai | Keterangan |
| --- | --- | --- |
| `origin` | `*` | API mengizinkan request dari semua origin. |
| `methods` | `GET`, `POST`, `DELETE`, `UPDATE`, `PUT`, `PATCH` | Method yang diizinkan pada request cross-origin. |
| `allowedHeaders` | Lihat daftar header di bawah | Header request yang boleh dikirim oleh frontend. |
| `maxAge` | `86400` | Hasil preflight boleh di-cache browser selama 86400 detik atau 24 jam. |
| `credentials` | `true` | Server mengirim dukungan credentials pada response CORS. |

## Header Request yang Diizinkan

Frontend boleh mengirim header berikut pada request cross-origin:

| Header | Kegunaan Umum |
| --- | --- |
| `Content-Type` | Menentukan format body, misalnya `application/json` atau `multipart/form-data`. |
| `Authorization` | Mengirim token auth, umumnya `Bearer <token>`. |
| `X-Requested-With` | Header tambahan untuk identifikasi AJAX request. |
| `X-Content-Type-Options` | Header keamanan tambahan jika dikirim client. |
| `X-XSS-Protection` | Header keamanan tambahan jika dikirim client. |
| `X-Frame-Options` | Header keamanan tambahan jika dikirim client. |
| `Strict-Transport-Security` | Header keamanan tambahan jika dikirim client. |
| `APIKey` | Header API key dengan format kapital. |
| `x-api-key` | Header API key dengan format lowercase. |
| `x-payload` | Header payload tambahan/custom. |
| `timezone` | Header timezone client. |
| `utc-offset` | Header offset UTC client. |

Catatan: header seperti `X-Content-Type-Options`, `X-XSS-Protection`, `X-Frame-Options`, dan `Strict-Transport-Security` biasanya lebih umum dikirim oleh server sebagai response header. Saat ini header tersebut tetap masuk daftar `allowedHeaders`, sehingga browser tidak akan memblokir jika frontend mengirimkannya.

## Response Header CORS

Dengan konfigurasi saat ini, response CORS umumnya berisi header berikut:

| Header | Nilai |
| --- | --- |
| `Access-Control-Allow-Origin` | `*` |
| `Access-Control-Allow-Credentials` | `true` |
| `Access-Control-Allow-Methods` | `GET,POST,DELETE,UPDATE,PUT,PATCH` |
| `Access-Control-Allow-Headers` | Header yang ada di `allowedHeaders`. |
| `Access-Control-Max-Age` | `86400` pada preflight response. |

## Preflight Request

Browser akan mengirim preflight request `OPTIONS` sebelum request utama jika request cross-origin memakai method/header tertentu, misalnya:

- memakai `Authorization`;
- memakai `Content-Type: application/json`;
- memakai method selain simple method;
- memakai custom header seperti `timezone`, `utc-offset`, atau `x-api-key`.

Contoh preflight:

```http
OPTIONS /api/menu HTTP/1.1
Origin: http://localhost:5173
Access-Control-Request-Method: GET
Access-Control-Request-Headers: Authorization, Content-Type
```

Jika sesuai konfigurasi, middleware `cors` akan mengembalikan response preflight sebelum request masuk ke controller.

## Contoh Request Frontend

Contoh request memakai token Bearer:

```ts
await fetch('http://localhost:4000/api/menu', {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        timezone: 'Asia/Jakarta',
        'utc-offset': '+07:00'
    }
});
```

Contoh request dengan API key custom:

```ts
await fetch('http://localhost:4000/api/health', {
    method: 'GET',
    headers: {
        'x-api-key': apiKey
    }
});
```

## Catatan untuk Frontend

### 1. Auth tetap wajib sesuai endpoint

CORS hanya menentukan izin browser untuk mengakses API dari origin berbeda. CORS tidak menggantikan autentikasi dan otorisasi.

Endpoint yang membutuhkan login tetap harus mengirim:

```http
Authorization: Bearer <token>
```

### 2. Wildcard origin dan credentials

Konfigurasi saat ini memakai:

```ts
origin: '*',
credentials: true
```

Kombinasi ini perlu diperhatikan untuk aplikasi browser. Browser dapat menolak request credentialed jika response memakai `Access-Control-Allow-Origin: *`.

Untuk request yang hanya memakai Bearer token di header `Authorization`, frontend biasanya tidak perlu mengaktifkan cookie credentials:

```ts
await fetch(url, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
```

Jika frontend perlu mengirim cookie/session dengan:

```ts
credentials: 'include'
```

maka backend sebaiknya tidak memakai `origin: '*'`, tetapi memakai daftar origin eksplisit.

Contoh konfigurasi yang lebih cocok untuk cookie/session:

```ts
const allowedOrigins = [
    'http://localhost:5173',
    'https://pos.example.com'
];

const corsOptions: cors.CorsOptions = {
    origin: allowedOrigins,
    credentials: true
};
```

### 3. Tidak ada konfigurasi CORS di `.env`

Saat dokumentasi ini dibuat, konfigurasi CORS belum memakai environment variable. Perubahan origin, method, atau header harus dilakukan langsung di `app.ts`.

## Rekomendasi Production

Untuk environment production, konfigurasi CORS sebaiknya dibatasi agar tidak terlalu terbuka:

| Area | Rekomendasi |
| --- | --- |
| `origin` | Gunakan daftar domain frontend resmi, jangan `*`. |
| `methods` | Pakai method yang benar-benar digunakan API. |
| `allowedHeaders` | Izinkan header yang memang dibutuhkan frontend. |
| `credentials` | Aktifkan hanya jika memakai cookie/session cross-origin. |
| `maxAge` | Tetap boleh dipakai untuk mengurangi jumlah preflight request. |

Contoh production:

```ts
const corsOptions: cors.CorsOptions = {
    origin: [
        'https://kasir.example.com',
        'https://admin-kasir.example.com'
    ],
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'x-api-key',
        'timezone',
        'utc-offset'
    ],
    maxAge: 86400,
    credentials: false
};
```

## Troubleshooting

| Gejala | Kemungkinan Penyebab | Solusi |
| --- | --- | --- |
| Browser menampilkan error CORS untuk `Authorization` | Header tidak diizinkan atau preflight gagal | Pastikan `Authorization` ada di `allowedHeaders` dan endpoint bisa menerima preflight. |
| Request dengan cookie gagal | `origin: '*'` dipakai bersama credentials | Gunakan origin eksplisit dan `credentials: true`. |
| Request dari Postman berhasil, browser gagal | Postman tidak menerapkan aturan CORS browser | Cek response header CORS di browser DevTools. |
| Preflight terlalu sering | Browser tidak memakai cache preflight | Pastikan response memiliki `Access-Control-Max-Age: 86400`. |
| Custom header diblokir browser | Header belum masuk `allowedHeaders` | Tambahkan header custom ke `allowedHeaders` di `app.ts`. |

## Ringkasan

Konfigurasi CORS backend saat ini bersifat terbuka untuk semua origin dan berlaku global. Ini memudahkan development dan integrasi frontend, terutama untuk request berbasis Bearer token.

Untuk production, origin sebaiknya dibatasi ke domain frontend resmi, terutama jika aplikasi menggunakan cookie/session atau fitur credentialed request.

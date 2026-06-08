"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHtmlReceipt = exports.generatePdfReceipt = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const format_money_utility_1 = require("./format-money.utility");
const getReceiptDisplayNumber = (data) => {
    return data.receipt || '-';
};
const escapeHtml = (value) => {
    return String(value ?? '').replace(/[&<>"']/g, (char) => {
        const entities = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        };
        return entities[char];
    });
};
const toHtmlLines = (value) => {
    return escapeHtml(value).replace(/\r?\n/g, '<br>');
};
const getLocalLogoPath = (logoValue) => {
    const rawLogo = logoValue?.trim();
    if (!rawLogo || rawLogo.startsWith('data:image/')) {
        return null;
    }
    let logoPath = rawLogo;
    if (/^https?:\/\//i.test(rawLogo)) {
        try {
            logoPath = new URL(rawLogo).pathname;
        }
        catch {
            return null;
        }
    }
    const normalizedPath = logoPath.replace(/\\/g, '/');
    const uploadsIndex = normalizedPath.indexOf('/uploads/');
    const localPath = uploadsIndex >= 0
        ? normalizedPath.slice(uploadsIndex + 1)
        : normalizedPath.replace(/^\/+/, '');
    const absolutePath = path_1.default.resolve(process.cwd(), localPath);
    const workspacePath = path_1.default.resolve(process.cwd()).toLowerCase();
    const candidatePath = absolutePath.toLowerCase();
    if (!candidatePath.startsWith(`${workspacePath}${path_1.default.sep.toLowerCase()}`)) {
        return null;
    }
    return fs_1.default.existsSync(absolutePath) ? absolutePath : null;
};
const getDataUriLogoBuffer = (logoValue) => {
    const match = logoValue?.trim().match(/^data:image\/(?:png|jpe?g);base64,([a-z0-9+/=\s]+)$/i);
    if (!match) {
        return null;
    }
    try {
        return Buffer.from(match[1].replace(/\s/g, ''), 'base64');
    }
    catch {
        return null;
    }
};
const getPdfLogoSource = (logoValue) => {
    return getDataUriLogoBuffer(logoValue) || getLocalLogoPath(logoValue);
};
/**
 * Generate PDF receipt as base64 string
 */
const generatePdfReceipt = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            // Create PDF with thermal printer dimensions (80mm width ≈ 227 points)
            const addressLines = data.store_address ? data.store_address.split('\n').length : 0;
            const logoHeight = data.store_logo ? 42 : 0;
            const phoneLines = data.store_phone ? 1 : 0;
            const headerLines = data.receipt_header ? data.receipt_header.split('\n').length : 0;
            const footerLines = data.receipt_footer ? data.receipt_footer.split('\n').length : 2;
            const itemHeightEstimate = data.items.reduce((sum, item) => {
                return sum + 34 + Math.ceil(item.name.length / 28) * 8;
            }, 0);
            const estimatedHeight = Math.max(560, 330 + logoHeight + itemHeightEstimate + addressLines * 9 + phoneLines * 9 + headerLines * 8 + footerLines * 9);
            const doc = new pdfkit_1.default({
                size: [227, estimatedHeight],
                margins: { top: 0, bottom: 0, left: 0, right: 0 },
            });
            const chunks = [];
            doc.on('data', (chunk) => chunks.push(chunk));
            doc.on('end', () => {
                const pdfBuffer = Buffer.concat(chunks);
                resolve(pdfBuffer.toString('base64'));
            });
            doc.on('error', reject);
            const pageWidth = 227;
            const margin = 14;
            const contentWidth = pageWidth - margin * 2;
            const ink = '#111827';
            const muted = '#6B7280';
            const subtle = '#F8FAFC';
            const border = '#E5E7EB';
            const accent = '#0F766E';
            const accentSoft = '#ECFDF5';
            const receiptNumber = getReceiptDisplayNumber(data);
            let y = 16;
            const logoSource = getPdfLogoSource(data.store_logo);
            const drawDivider = (positionY, color = border) => {
                doc
                    .strokeColor(color)
                    .lineWidth(0.6)
                    .moveTo(margin, positionY)
                    .lineTo(pageWidth - margin, positionY)
                    .stroke();
            };
            const drawKeyValue = (label, value, positionY, valueColor = ink) => {
                doc
                    .font('Helvetica')
                    .fontSize(6.5)
                    .fillColor(muted)
                    .text(label, margin + 10, positionY, { width: 64 });
                doc
                    .font('Helvetica-Bold')
                    .fontSize(7.5)
                    .fillColor(valueColor)
                    .text(value || '-', margin + 74, positionY, {
                    width: contentWidth - 84,
                    align: 'right',
                });
            };
            const drawAmountRow = (label, value, positionY, bold = false, valueColor = ink) => {
                doc
                    .font(bold ? 'Helvetica-Bold' : 'Helvetica')
                    .fontSize(bold ? 8.5 : 7.5)
                    .fillColor(bold ? ink : muted)
                    .text(label, margin + 12, positionY, { width: 74 });
                doc
                    .font('Helvetica-Bold')
                    .fontSize(bold ? 10 : 8)
                    .fillColor(valueColor)
                    .text(value, margin + 86, positionY, {
                    width: contentWidth - 98,
                    align: 'right',
                });
            };
            if (logoSource) {
                try {
                    doc.image(logoSource, pageWidth / 2 - 18, y, {
                        fit: [36, 36],
                        align: 'center',
                        valign: 'center',
                    });
                    y += 44;
                }
                catch {
                    y += 0;
                }
            }
            doc
                .font('Helvetica-Bold')
                .fontSize(15)
                .fillColor(ink)
                .text(data.store_name, margin, y, {
                width: contentWidth,
                align: 'center',
            });
            y = doc.y + 4;
            doc.font('Helvetica').fontSize(7).fillColor(muted);
            data.store_address.split('\n').forEach((line) => {
                doc.text(line, margin + 8, y, {
                    width: contentWidth - 16,
                    align: 'center',
                });
                y = doc.y;
            });
            if (data.store_phone) {
                doc.text(`Telp: ${data.store_phone}`, margin + 8, y + 1, {
                    width: contentWidth - 16,
                    align: 'center',
                });
                y = doc.y;
            }
            if (data.receipt_header) {
                y += 3;
                doc.font('Helvetica-Oblique').fontSize(6.5).fillColor(muted);
                data.receipt_header.split('\n').forEach((line) => {
                    doc.text(line, margin + 8, y, {
                        width: contentWidth - 16,
                        align: 'center',
                    });
                    y = doc.y;
                });
            }
            y += 10;
            doc.roundedRect(margin, y, contentWidth, 48, 8).fill(accent);
            doc
                .font('Helvetica')
                .fontSize(6.5)
                .fillColor('#D1FAE5')
                .text('NO. STRUK', margin + 12, y + 10, { width: contentWidth - 24 });
            doc
                .font('Helvetica-Bold')
                .fontSize(14)
                .fillColor('#FFFFFF')
                .text(receiptNumber, margin + 12, y + 22, {
                width: contentWidth - 24,
                align: 'left',
            });
            y += 60;
            const metaHeight = data.customer_name ? 62 : 48;
            doc.roundedRect(margin, y, contentWidth, metaHeight, 7).fillAndStroke(subtle, border);
            drawKeyValue('Tanggal', `${data.order_date} ${data.order_time}`, y + 11);
            drawKeyValue('Kasir', data.cashier_name, y + 27);
            if (data.customer_name) {
                drawKeyValue('Pelanggan', data.customer_name, y + 43);
            }
            y += metaHeight + 16;
            doc
                .font('Helvetica-Bold')
                .fontSize(8)
                .fillColor(ink)
                .text('DETAIL PESANAN', margin, y, { width: contentWidth / 2 });
            doc
                .font('Helvetica')
                .fontSize(6.5)
                .fillColor(muted)
                .text(`${data.items.length} item`, margin + contentWidth / 2, y + 1, {
                width: contentWidth / 2,
                align: 'right',
            });
            y += 14;
            drawDivider(y);
            y += 9;
            data.items.forEach((item, index) => {
                const subtotal = (0, format_money_utility_1.formatMoney)(item.subtotal);
                const itemNameWidth = contentWidth - 70;
                const nameHeight = doc.heightOfString(item.name, {
                    width: itemNameWidth,
                });
                doc
                    .font('Helvetica-Bold')
                    .fontSize(8)
                    .fillColor(ink)
                    .text(item.name, margin, y, { width: itemNameWidth });
                doc
                    .font('Helvetica-Bold')
                    .fontSize(8)
                    .fillColor(ink)
                    .text(subtotal, margin + itemNameWidth, y, {
                    width: 70,
                    align: 'right',
                });
                y += Math.max(nameHeight, 9) + 3;
                doc
                    .font('Helvetica')
                    .fontSize(7)
                    .fillColor(muted)
                    .text(`${item.qty} x ${(0, format_money_utility_1.formatMoney)(item.price)}`, margin, y, {
                    width: contentWidth,
                });
                y += 13;
                if (index < data.items.length - 1) {
                    drawDivider(y, '#F1F5F9');
                    y += 8;
                }
            });
            y += 8;
            const summaryHeight = data.change_amount > 0 ? 98 : 82;
            doc.roundedRect(margin, y, contentWidth, summaryHeight, 8).fillAndStroke(subtle, border);
            doc.roundedRect(margin + 12, y + 11, 44, 14, 7).fill(accentSoft);
            doc
                .font('Helvetica-Bold')
                .fontSize(6.5)
                .fillColor(accent)
                .text(data.payment_type, margin + 12, y + 15, {
                width: 44,
                align: 'center',
            });
            drawAmountRow('Subtotal', (0, format_money_utility_1.formatMoney)(data.total), y + 34);
            drawAmountRow('Bayar', (0, format_money_utility_1.formatMoney)(data.paid_amount), y + 50);
            if (data.change_amount > 0) {
                drawAmountRow('Kembalian', (0, format_money_utility_1.formatMoney)(data.change_amount), y + 66);
            }
            drawDivider(y + summaryHeight - 28, '#D1D5DB');
            drawAmountRow('TOTAL', (0, format_money_utility_1.formatMoney)(data.total), y + summaryHeight - 19, true, accent);
            y += summaryHeight + 16;
            doc
                .font('Helvetica-Bold')
                .fontSize(9)
                .fillColor(accent)
                .text('Terima kasih', margin, y, {
                width: contentWidth,
                align: 'center',
            });
            y = doc.y + 4;
            doc.font('Helvetica').fontSize(7).fillColor(muted);
            const footerLinesToRender = data.receipt_footer
                ? data.receipt_footer.split('\n')
                : ['Selamat menikmati pesanan Anda.'];
            footerLinesToRender.forEach((line) => {
                doc.text(line, margin + 8, y, {
                    width: contentWidth - 16,
                    align: 'center',
                });
                y = doc.y;
            });
            doc.end();
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.generatePdfReceipt = generatePdfReceipt;
/**
 * Generate HTML receipt that can be converted to image on frontend
 * Using inline styles for standalone rendering
 */
const generateHtmlReceipt = (data) => {
    const itemsHtml = data.items.map((item) => `
        <div class="item-row">
            <div class="item-main">
                <div class="item-name">${escapeHtml(item.name)}</div>
                <div class="item-meta">${escapeHtml(item.qty)} x ${escapeHtml((0, format_money_utility_1.formatMoney)(item.price))}</div>
            </div>
            <div class="item-amount">${escapeHtml((0, format_money_utility_1.formatMoney)(item.subtotal))}</div>
        </div>
    `).join('');
    const receiptNumber = getReceiptDisplayNumber(data);
    const customerRowsHtml = [
        data.customer_name ? `
        <div class="meta-row">
            <span>Pelanggan</span>
            <strong>${escapeHtml(data.customer_name)}</strong>
        </div>` : '',
        data.customer_phone ? `
        <div class="meta-row">
            <span>No. HP</span>
            <strong>${escapeHtml(data.customer_phone)}</strong>
        </div>` : '',
    ].join('');
    const footerHtml = data.receipt_footer
        ? toHtmlLines(data.receipt_footer)
        : 'Selamat menikmati pesanan Anda.';
    const logoHtml = data.store_logo
        ? `<img class="store-logo" src="${escapeHtml(data.store_logo)}" alt="${escapeHtml(`${data.store_name} logo`)}">`
        : '';
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
            width: 300px;
            background: white;
            color: #111827;
            line-height: 1.35;
        }
        .receipt {
            width: 300px;
            padding: 18px;
            background: #ffffff;
        }
        .store {
            text-align: center;
            margin-bottom: 14px;
        }
        .store-logo {
            width: 48px;
            height: 48px;
            object-fit: contain;
            display: block;
            margin: 0 auto 8px;
            border-radius: 8px;
        }
        .store-name {
            font-size: 18px;
            font-weight: bold;
            line-height: 1.2;
            overflow-wrap: anywhere;
            margin-bottom: 6px;
        }
        .store-address {
            font-size: 10px;
            color: #6b7280;
            overflow-wrap: anywhere;
        }
        .store-phone {
            margin-top: 3px;
            font-size: 10px;
            color: #6b7280;
            overflow-wrap: anywhere;
        }
        .receipt-header {
            margin-top: 6px;
            font-size: 10px;
            color: #6b7280;
            font-style: italic;
            overflow-wrap: anywhere;
        }
        .receipt-number {
            background: #0f766e;
            color: #ffffff;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 12px;
        }
        .receipt-number span {
            display: block;
            color: #d1fae5;
            font-size: 10px;
            margin-bottom: 3px;
        }
        .receipt-number strong {
            display: block;
            font-size: 17px;
            overflow-wrap: anywhere;
        }
        .meta-card,
        .summary-card {
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            background: #f8fafc;
            padding: 10px;
            margin-bottom: 14px;
        }
        .meta-row,
        .amount-row {
            display: flex;
            justify-content: space-between;
            gap: 10px;
            padding: 3px 0;
        }
        .meta-row span,
        .amount-row span {
            color: #6b7280;
            white-space: nowrap;
        }
        .meta-row strong,
        .amount-row strong {
            text-align: right;
            overflow-wrap: anywhere;
        }
        .section-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        .section-title strong {
            font-size: 11px;
            font-weight: bold;
        }
        .section-title span {
            font-size: 10px;
            color: #6b7280;
        }
        .items {
            margin-bottom: 14px;
            border-top: 1px solid #e5e7eb;
        }
        .item-row {
            display: flex;
            justify-content: space-between;
            gap: 8px;
            padding: 9px 0;
            border-bottom: 1px solid #f1f5f9;
        }
        .item-main {
            min-width: 0;
            flex: 1;
        }
        .item-name {
            font-weight: bold;
            overflow-wrap: anywhere;
        }
        .item-meta {
            margin-top: 2px;
            font-size: 10px;
            color: #6b7280;
        }
        .item-amount {
            flex: 0 0 86px;
            text-align: right;
            font-weight: bold;
        }
        .payment-badge {
            display: inline-block;
            background: #ecfdf5;
            color: #0f766e;
            border-radius: 999px;
            padding: 4px 10px;
            font-size: 10px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        .amount-row.total {
            border-top: 1px solid #d1d5db;
            margin-top: 6px;
            padding-top: 9px;
            font-size: 14px;
        }
        .amount-row.total strong {
            color: #0f766e;
        }
        .footer {
            text-align: center;
            color: #6b7280;
            font-size: 11px;
            overflow-wrap: anywhere;
        }
        .footer-title {
            color: #0f766e;
            font-size: 13px;
            font-weight: bold;
            margin-bottom: 4px;
        }
        @media print {
            body {
                width: 80mm;
            }
            .receipt {
                width: 80mm;
            }
        }
    </style>
</head>
<body>
    <main class="receipt">
        <section class="store">
            ${logoHtml}
            <div class="store-name">${escapeHtml(data.store_name)}</div>
            ${data.store_address ? `<div class="store-address">${toHtmlLines(data.store_address)}</div>` : ''}
            ${data.store_phone ? `<div class="store-phone">Telp: ${escapeHtml(data.store_phone)}</div>` : ''}
            ${data.receipt_header ? `<div class="receipt-header">${toHtmlLines(data.receipt_header)}</div>` : ''}
        </section>

        <section class="receipt-number">
            <span>NO. STRUK</span>
            <strong>${escapeHtml(receiptNumber)}</strong>
        </section>

        <section class="meta-card">
            <div class="meta-row">
                <span>Tanggal</span>
                <strong>${escapeHtml(`${data.order_date} ${data.order_time}`)}</strong>
            </div>
            <div class="meta-row">
                <span>Kasir</span>
                <strong>${escapeHtml(data.cashier_name)}</strong>
            </div>
            ${customerRowsHtml}
        </section>

        <section class="section-title">
            <strong>DETAIL PESANAN</strong>
            <span>${escapeHtml(data.items.length)} item</span>
        </section>

        <section class="items">
            ${itemsHtml}
        </section>

        <section class="summary-card">
            <div class="payment-badge">${escapeHtml(data.payment_type)}</div>
            <div class="amount-row">
                <span>Subtotal</span>
                <strong>${escapeHtml((0, format_money_utility_1.formatMoney)(data.total))}</strong>
            </div>
            <div class="amount-row">
                <span>Bayar</span>
                <strong>${escapeHtml((0, format_money_utility_1.formatMoney)(data.paid_amount))}</strong>
            </div>
            ${data.change_amount > 0 ? `
            <div class="amount-row">
                <span>Kembalian</span>
                <strong>${escapeHtml((0, format_money_utility_1.formatMoney)(data.change_amount))}</strong>
            </div>` : ''}
            <div class="amount-row total">
                <span>TOTAL</span>
                <strong>${escapeHtml((0, format_money_utility_1.formatMoney)(data.total))}</strong>
            </div>
        </section>

        <section class="footer">
            <div class="footer-title">Terima Kasih</div>
            <div>${footerHtml}</div>
        </section>
    </main>
</body>
</html>
    `.trim();
};
exports.generateHtmlReceipt = generateHtmlReceipt;
exports.default = {
    generatePdfReceipt: exports.generatePdfReceipt,
    generateHtmlReceipt: exports.generateHtmlReceipt,
};
//# sourceMappingURL=receipt.utility.js.map
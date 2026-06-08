import { z } from 'zod';
export declare const reportExportValueFormatSchema: z.ZodEnum<{
    number: "number";
    boolean: "boolean";
    date: "date";
    currency: "currency";
    percent: "percent";
    text: "text";
    datetime: "datetime";
}>;
export declare const reportExportColumnAlignSchema: z.ZodEnum<{
    center: "center";
    right: "right";
    left: "left";
}>;
export declare const reportExportPeriodSchema: z.ZodObject<{
    start_date: z.ZodString;
    end_date: z.ZodString;
}, z.core.$strip>;
export declare const reportExportMetricSchema: z.ZodObject<{
    label: z.ZodString;
    value: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
    format: z.ZodOptional<z.ZodEnum<{
        number: "number";
        boolean: "boolean";
        date: "date";
        currency: "currency";
        percent: "percent";
        text: "text";
        datetime: "datetime";
    }>>;
}, z.core.$strip>;
export declare const reportExportColumnSchema: z.ZodObject<{
    key: z.ZodString;
    header: z.ZodString;
    width: z.ZodOptional<z.ZodNumber>;
    align: z.ZodOptional<z.ZodEnum<{
        center: "center";
        right: "right";
        left: "left";
    }>>;
    format: z.ZodOptional<z.ZodEnum<{
        number: "number";
        boolean: "boolean";
        date: "date";
        currency: "currency";
        percent: "percent";
        text: "text";
        datetime: "datetime";
    }>>;
}, z.core.$strip>;
export declare const reportExportRowSchema: z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>;
export declare const reportExportTableSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    columns: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        header: z.ZodString;
        width: z.ZodOptional<z.ZodNumber>;
        align: z.ZodOptional<z.ZodEnum<{
            center: "center";
            right: "right";
            left: "left";
        }>>;
        format: z.ZodOptional<z.ZodEnum<{
            number: "number";
            boolean: "boolean";
            date: "date";
            currency: "currency";
            percent: "percent";
            text: "text";
            datetime: "datetime";
        }>>;
    }, z.core.$strip>>;
    rows: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>>;
    empty_message: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const reportExportSectionSchema: z.ZodObject<{
    title: z.ZodString;
    summaries: z.ZodOptional<z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        value: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
        format: z.ZodOptional<z.ZodEnum<{
            number: "number";
            boolean: "boolean";
            date: "date";
            currency: "currency";
            percent: "percent";
            text: "text";
            datetime: "datetime";
        }>>;
    }, z.core.$strip>>>;
    tables: z.ZodOptional<z.ZodArray<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        columns: z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            header: z.ZodString;
            width: z.ZodOptional<z.ZodNumber>;
            align: z.ZodOptional<z.ZodEnum<{
                center: "center";
                right: "right";
                left: "left";
            }>>;
            format: z.ZodOptional<z.ZodEnum<{
                number: "number";
                boolean: "boolean";
                date: "date";
                currency: "currency";
                percent: "percent";
                text: "text";
                datetime: "datetime";
            }>>;
        }, z.core.$strip>>;
        rows: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>>;
        empty_message: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
    notes: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const reportExportDataSchema: z.ZodObject<{
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    generated_at: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>>;
    period: z.ZodOptional<z.ZodObject<{
        start_date: z.ZodString;
        end_date: z.ZodString;
    }, z.core.$strip>>;
    metadata: z.ZodOptional<z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        value: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
        format: z.ZodOptional<z.ZodEnum<{
            number: "number";
            boolean: "boolean";
            date: "date";
            currency: "currency";
            percent: "percent";
            text: "text";
            datetime: "datetime";
        }>>;
    }, z.core.$strip>>>;
    summaries: z.ZodOptional<z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        value: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
        format: z.ZodOptional<z.ZodEnum<{
            number: "number";
            boolean: "boolean";
            date: "date";
            currency: "currency";
            percent: "percent";
            text: "text";
            datetime: "datetime";
        }>>;
    }, z.core.$strip>>>;
    sections: z.ZodOptional<z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        summaries: z.ZodOptional<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
            format: z.ZodOptional<z.ZodEnum<{
                number: "number";
                boolean: "boolean";
                date: "date";
                currency: "currency";
                percent: "percent";
                text: "text";
                datetime: "datetime";
            }>>;
        }, z.core.$strip>>>;
        tables: z.ZodOptional<z.ZodArray<z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            columns: z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                header: z.ZodString;
                width: z.ZodOptional<z.ZodNumber>;
                align: z.ZodOptional<z.ZodEnum<{
                    center: "center";
                    right: "right";
                    left: "left";
                }>>;
                format: z.ZodOptional<z.ZodEnum<{
                    number: "number";
                    boolean: "boolean";
                    date: "date";
                    currency: "currency";
                    percent: "percent";
                    text: "text";
                    datetime: "datetime";
                }>>;
            }, z.core.$strip>>;
            rows: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>>;
            empty_message: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>>;
        notes: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>>;
    tables: z.ZodOptional<z.ZodArray<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        columns: z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            header: z.ZodString;
            width: z.ZodOptional<z.ZodNumber>;
            align: z.ZodOptional<z.ZodEnum<{
                center: "center";
                right: "right";
                left: "left";
            }>>;
            format: z.ZodOptional<z.ZodEnum<{
                number: "number";
                boolean: "boolean";
                date: "date";
                currency: "currency";
                percent: "percent";
                text: "text";
                datetime: "datetime";
            }>>;
        }, z.core.$strip>>;
        rows: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>>;
        empty_message: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const reportPdfOptionsSchema: z.ZodObject<{
    file_name: z.ZodOptional<z.ZodString>;
    store_name: z.ZodOptional<z.ZodString>;
    page_size: z.ZodOptional<z.ZodEnum<{
        A4: "A4";
        LETTER: "LETTER";
    }>>;
    orientation: z.ZodOptional<z.ZodEnum<{
        portrait: "portrait";
        landscape: "landscape";
    }>>;
}, z.core.$strip>;
export declare const reportExcelOptionsSchema: z.ZodObject<{
    file_name: z.ZodOptional<z.ZodString>;
    sheet_name: z.ZodOptional<z.ZodString>;
    store_name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const exportReportPdfSchema: z.ZodObject<{
    data: z.ZodObject<{
        title: z.ZodString;
        subtitle: z.ZodOptional<z.ZodString>;
        generated_at: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>>;
        period: z.ZodOptional<z.ZodObject<{
            start_date: z.ZodString;
            end_date: z.ZodString;
        }, z.core.$strip>>;
        metadata: z.ZodOptional<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
            format: z.ZodOptional<z.ZodEnum<{
                number: "number";
                boolean: "boolean";
                date: "date";
                currency: "currency";
                percent: "percent";
                text: "text";
                datetime: "datetime";
            }>>;
        }, z.core.$strip>>>;
        summaries: z.ZodOptional<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
            format: z.ZodOptional<z.ZodEnum<{
                number: "number";
                boolean: "boolean";
                date: "date";
                currency: "currency";
                percent: "percent";
                text: "text";
                datetime: "datetime";
            }>>;
        }, z.core.$strip>>>;
        sections: z.ZodOptional<z.ZodArray<z.ZodObject<{
            title: z.ZodString;
            summaries: z.ZodOptional<z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
                format: z.ZodOptional<z.ZodEnum<{
                    number: "number";
                    boolean: "boolean";
                    date: "date";
                    currency: "currency";
                    percent: "percent";
                    text: "text";
                    datetime: "datetime";
                }>>;
            }, z.core.$strip>>>;
            tables: z.ZodOptional<z.ZodArray<z.ZodObject<{
                title: z.ZodOptional<z.ZodString>;
                columns: z.ZodArray<z.ZodObject<{
                    key: z.ZodString;
                    header: z.ZodString;
                    width: z.ZodOptional<z.ZodNumber>;
                    align: z.ZodOptional<z.ZodEnum<{
                        center: "center";
                        right: "right";
                        left: "left";
                    }>>;
                    format: z.ZodOptional<z.ZodEnum<{
                        number: "number";
                        boolean: "boolean";
                        date: "date";
                        currency: "currency";
                        percent: "percent";
                        text: "text";
                        datetime: "datetime";
                    }>>;
                }, z.core.$strip>>;
                rows: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>>;
                empty_message: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>>;
            notes: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>>>;
        tables: z.ZodOptional<z.ZodArray<z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            columns: z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                header: z.ZodString;
                width: z.ZodOptional<z.ZodNumber>;
                align: z.ZodOptional<z.ZodEnum<{
                    center: "center";
                    right: "right";
                    left: "left";
                }>>;
                format: z.ZodOptional<z.ZodEnum<{
                    number: "number";
                    boolean: "boolean";
                    date: "date";
                    currency: "currency";
                    percent: "percent";
                    text: "text";
                    datetime: "datetime";
                }>>;
            }, z.core.$strip>>;
            rows: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>>;
            empty_message: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>>;
    }, z.core.$strip>;
    options: z.ZodOptional<z.ZodObject<{
        file_name: z.ZodOptional<z.ZodString>;
        store_name: z.ZodOptional<z.ZodString>;
        page_size: z.ZodOptional<z.ZodEnum<{
            A4: "A4";
            LETTER: "LETTER";
        }>>;
        orientation: z.ZodOptional<z.ZodEnum<{
            portrait: "portrait";
            landscape: "landscape";
        }>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const exportReportExcelSchema: z.ZodObject<{
    data: z.ZodObject<{
        title: z.ZodString;
        subtitle: z.ZodOptional<z.ZodString>;
        generated_at: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>>;
        period: z.ZodOptional<z.ZodObject<{
            start_date: z.ZodString;
            end_date: z.ZodString;
        }, z.core.$strip>>;
        metadata: z.ZodOptional<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
            format: z.ZodOptional<z.ZodEnum<{
                number: "number";
                boolean: "boolean";
                date: "date";
                currency: "currency";
                percent: "percent";
                text: "text";
                datetime: "datetime";
            }>>;
        }, z.core.$strip>>>;
        summaries: z.ZodOptional<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
            format: z.ZodOptional<z.ZodEnum<{
                number: "number";
                boolean: "boolean";
                date: "date";
                currency: "currency";
                percent: "percent";
                text: "text";
                datetime: "datetime";
            }>>;
        }, z.core.$strip>>>;
        sections: z.ZodOptional<z.ZodArray<z.ZodObject<{
            title: z.ZodString;
            summaries: z.ZodOptional<z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
                format: z.ZodOptional<z.ZodEnum<{
                    number: "number";
                    boolean: "boolean";
                    date: "date";
                    currency: "currency";
                    percent: "percent";
                    text: "text";
                    datetime: "datetime";
                }>>;
            }, z.core.$strip>>>;
            tables: z.ZodOptional<z.ZodArray<z.ZodObject<{
                title: z.ZodOptional<z.ZodString>;
                columns: z.ZodArray<z.ZodObject<{
                    key: z.ZodString;
                    header: z.ZodString;
                    width: z.ZodOptional<z.ZodNumber>;
                    align: z.ZodOptional<z.ZodEnum<{
                        center: "center";
                        right: "right";
                        left: "left";
                    }>>;
                    format: z.ZodOptional<z.ZodEnum<{
                        number: "number";
                        boolean: "boolean";
                        date: "date";
                        currency: "currency";
                        percent: "percent";
                        text: "text";
                        datetime: "datetime";
                    }>>;
                }, z.core.$strip>>;
                rows: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>>;
                empty_message: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>>;
            notes: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>>>;
        tables: z.ZodOptional<z.ZodArray<z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            columns: z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                header: z.ZodString;
                width: z.ZodOptional<z.ZodNumber>;
                align: z.ZodOptional<z.ZodEnum<{
                    center: "center";
                    right: "right";
                    left: "left";
                }>>;
                format: z.ZodOptional<z.ZodEnum<{
                    number: "number";
                    boolean: "boolean";
                    date: "date";
                    currency: "currency";
                    percent: "percent";
                    text: "text";
                    datetime: "datetime";
                }>>;
            }, z.core.$strip>>;
            rows: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>>;
            empty_message: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>>;
    }, z.core.$strip>;
    options: z.ZodOptional<z.ZodObject<{
        file_name: z.ZodOptional<z.ZodString>;
        sheet_name: z.ZodOptional<z.ZodString>;
        store_name: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type ExportReportPdfInput = z.infer<typeof exportReportPdfSchema>;
export type ExportReportExcelInput = z.infer<typeof exportReportExcelSchema>;
export declare const reportExportSchemas: {
    valueFormat: z.ZodEnum<{
        number: "number";
        boolean: "boolean";
        date: "date";
        currency: "currency";
        percent: "percent";
        text: "text";
        datetime: "datetime";
    }>;
    columnAlign: z.ZodEnum<{
        center: "center";
        right: "right";
        left: "left";
    }>;
    period: z.ZodObject<{
        start_date: z.ZodString;
        end_date: z.ZodString;
    }, z.core.$strip>;
    metric: z.ZodObject<{
        label: z.ZodString;
        value: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
        format: z.ZodOptional<z.ZodEnum<{
            number: "number";
            boolean: "boolean";
            date: "date";
            currency: "currency";
            percent: "percent";
            text: "text";
            datetime: "datetime";
        }>>;
    }, z.core.$strip>;
    column: z.ZodObject<{
        key: z.ZodString;
        header: z.ZodString;
        width: z.ZodOptional<z.ZodNumber>;
        align: z.ZodOptional<z.ZodEnum<{
            center: "center";
            right: "right";
            left: "left";
        }>>;
        format: z.ZodOptional<z.ZodEnum<{
            number: "number";
            boolean: "boolean";
            date: "date";
            currency: "currency";
            percent: "percent";
            text: "text";
            datetime: "datetime";
        }>>;
    }, z.core.$strip>;
    row: z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>;
    table: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        columns: z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            header: z.ZodString;
            width: z.ZodOptional<z.ZodNumber>;
            align: z.ZodOptional<z.ZodEnum<{
                center: "center";
                right: "right";
                left: "left";
            }>>;
            format: z.ZodOptional<z.ZodEnum<{
                number: "number";
                boolean: "boolean";
                date: "date";
                currency: "currency";
                percent: "percent";
                text: "text";
                datetime: "datetime";
            }>>;
        }, z.core.$strip>>;
        rows: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>>;
        empty_message: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    section: z.ZodObject<{
        title: z.ZodString;
        summaries: z.ZodOptional<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
            format: z.ZodOptional<z.ZodEnum<{
                number: "number";
                boolean: "boolean";
                date: "date";
                currency: "currency";
                percent: "percent";
                text: "text";
                datetime: "datetime";
            }>>;
        }, z.core.$strip>>>;
        tables: z.ZodOptional<z.ZodArray<z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            columns: z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                header: z.ZodString;
                width: z.ZodOptional<z.ZodNumber>;
                align: z.ZodOptional<z.ZodEnum<{
                    center: "center";
                    right: "right";
                    left: "left";
                }>>;
                format: z.ZodOptional<z.ZodEnum<{
                    number: "number";
                    boolean: "boolean";
                    date: "date";
                    currency: "currency";
                    percent: "percent";
                    text: "text";
                    datetime: "datetime";
                }>>;
            }, z.core.$strip>>;
            rows: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>>;
            empty_message: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>>;
        notes: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>;
    data: z.ZodObject<{
        title: z.ZodString;
        subtitle: z.ZodOptional<z.ZodString>;
        generated_at: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>>;
        period: z.ZodOptional<z.ZodObject<{
            start_date: z.ZodString;
            end_date: z.ZodString;
        }, z.core.$strip>>;
        metadata: z.ZodOptional<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
            format: z.ZodOptional<z.ZodEnum<{
                number: "number";
                boolean: "boolean";
                date: "date";
                currency: "currency";
                percent: "percent";
                text: "text";
                datetime: "datetime";
            }>>;
        }, z.core.$strip>>>;
        summaries: z.ZodOptional<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
            format: z.ZodOptional<z.ZodEnum<{
                number: "number";
                boolean: "boolean";
                date: "date";
                currency: "currency";
                percent: "percent";
                text: "text";
                datetime: "datetime";
            }>>;
        }, z.core.$strip>>>;
        sections: z.ZodOptional<z.ZodArray<z.ZodObject<{
            title: z.ZodString;
            summaries: z.ZodOptional<z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
                format: z.ZodOptional<z.ZodEnum<{
                    number: "number";
                    boolean: "boolean";
                    date: "date";
                    currency: "currency";
                    percent: "percent";
                    text: "text";
                    datetime: "datetime";
                }>>;
            }, z.core.$strip>>>;
            tables: z.ZodOptional<z.ZodArray<z.ZodObject<{
                title: z.ZodOptional<z.ZodString>;
                columns: z.ZodArray<z.ZodObject<{
                    key: z.ZodString;
                    header: z.ZodString;
                    width: z.ZodOptional<z.ZodNumber>;
                    align: z.ZodOptional<z.ZodEnum<{
                        center: "center";
                        right: "right";
                        left: "left";
                    }>>;
                    format: z.ZodOptional<z.ZodEnum<{
                        number: "number";
                        boolean: "boolean";
                        date: "date";
                        currency: "currency";
                        percent: "percent";
                        text: "text";
                        datetime: "datetime";
                    }>>;
                }, z.core.$strip>>;
                rows: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>>;
                empty_message: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>>;
            notes: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>>>;
        tables: z.ZodOptional<z.ZodArray<z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            columns: z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                header: z.ZodString;
                width: z.ZodOptional<z.ZodNumber>;
                align: z.ZodOptional<z.ZodEnum<{
                    center: "center";
                    right: "right";
                    left: "left";
                }>>;
                format: z.ZodOptional<z.ZodEnum<{
                    number: "number";
                    boolean: "boolean";
                    date: "date";
                    currency: "currency";
                    percent: "percent";
                    text: "text";
                    datetime: "datetime";
                }>>;
            }, z.core.$strip>>;
            rows: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>>;
            empty_message: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>>;
    }, z.core.$strip>;
    pdfOptions: z.ZodObject<{
        file_name: z.ZodOptional<z.ZodString>;
        store_name: z.ZodOptional<z.ZodString>;
        page_size: z.ZodOptional<z.ZodEnum<{
            A4: "A4";
            LETTER: "LETTER";
        }>>;
        orientation: z.ZodOptional<z.ZodEnum<{
            portrait: "portrait";
            landscape: "landscape";
        }>>;
    }, z.core.$strip>;
    excelOptions: z.ZodObject<{
        file_name: z.ZodOptional<z.ZodString>;
        sheet_name: z.ZodOptional<z.ZodString>;
        store_name: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    exportPdf: z.ZodObject<{
        data: z.ZodObject<{
            title: z.ZodString;
            subtitle: z.ZodOptional<z.ZodString>;
            generated_at: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>>;
            period: z.ZodOptional<z.ZodObject<{
                start_date: z.ZodString;
                end_date: z.ZodString;
            }, z.core.$strip>>;
            metadata: z.ZodOptional<z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
                format: z.ZodOptional<z.ZodEnum<{
                    number: "number";
                    boolean: "boolean";
                    date: "date";
                    currency: "currency";
                    percent: "percent";
                    text: "text";
                    datetime: "datetime";
                }>>;
            }, z.core.$strip>>>;
            summaries: z.ZodOptional<z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
                format: z.ZodOptional<z.ZodEnum<{
                    number: "number";
                    boolean: "boolean";
                    date: "date";
                    currency: "currency";
                    percent: "percent";
                    text: "text";
                    datetime: "datetime";
                }>>;
            }, z.core.$strip>>>;
            sections: z.ZodOptional<z.ZodArray<z.ZodObject<{
                title: z.ZodString;
                summaries: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    label: z.ZodString;
                    value: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
                    format: z.ZodOptional<z.ZodEnum<{
                        number: "number";
                        boolean: "boolean";
                        date: "date";
                        currency: "currency";
                        percent: "percent";
                        text: "text";
                        datetime: "datetime";
                    }>>;
                }, z.core.$strip>>>;
                tables: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    title: z.ZodOptional<z.ZodString>;
                    columns: z.ZodArray<z.ZodObject<{
                        key: z.ZodString;
                        header: z.ZodString;
                        width: z.ZodOptional<z.ZodNumber>;
                        align: z.ZodOptional<z.ZodEnum<{
                            center: "center";
                            right: "right";
                            left: "left";
                        }>>;
                        format: z.ZodOptional<z.ZodEnum<{
                            number: "number";
                            boolean: "boolean";
                            date: "date";
                            currency: "currency";
                            percent: "percent";
                            text: "text";
                            datetime: "datetime";
                        }>>;
                    }, z.core.$strip>>;
                    rows: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>>;
                    empty_message: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>>;
                notes: z.ZodOptional<z.ZodArray<z.ZodString>>;
            }, z.core.$strip>>>;
            tables: z.ZodOptional<z.ZodArray<z.ZodObject<{
                title: z.ZodOptional<z.ZodString>;
                columns: z.ZodArray<z.ZodObject<{
                    key: z.ZodString;
                    header: z.ZodString;
                    width: z.ZodOptional<z.ZodNumber>;
                    align: z.ZodOptional<z.ZodEnum<{
                        center: "center";
                        right: "right";
                        left: "left";
                    }>>;
                    format: z.ZodOptional<z.ZodEnum<{
                        number: "number";
                        boolean: "boolean";
                        date: "date";
                        currency: "currency";
                        percent: "percent";
                        text: "text";
                        datetime: "datetime";
                    }>>;
                }, z.core.$strip>>;
                rows: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>>;
                empty_message: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>>;
        }, z.core.$strip>;
        options: z.ZodOptional<z.ZodObject<{
            file_name: z.ZodOptional<z.ZodString>;
            store_name: z.ZodOptional<z.ZodString>;
            page_size: z.ZodOptional<z.ZodEnum<{
                A4: "A4";
                LETTER: "LETTER";
            }>>;
            orientation: z.ZodOptional<z.ZodEnum<{
                portrait: "portrait";
                landscape: "landscape";
            }>>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    exportExcel: z.ZodObject<{
        data: z.ZodObject<{
            title: z.ZodString;
            subtitle: z.ZodOptional<z.ZodString>;
            generated_at: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>>;
            period: z.ZodOptional<z.ZodObject<{
                start_date: z.ZodString;
                end_date: z.ZodString;
            }, z.core.$strip>>;
            metadata: z.ZodOptional<z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
                format: z.ZodOptional<z.ZodEnum<{
                    number: "number";
                    boolean: "boolean";
                    date: "date";
                    currency: "currency";
                    percent: "percent";
                    text: "text";
                    datetime: "datetime";
                }>>;
            }, z.core.$strip>>>;
            summaries: z.ZodOptional<z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
                format: z.ZodOptional<z.ZodEnum<{
                    number: "number";
                    boolean: "boolean";
                    date: "date";
                    currency: "currency";
                    percent: "percent";
                    text: "text";
                    datetime: "datetime";
                }>>;
            }, z.core.$strip>>>;
            sections: z.ZodOptional<z.ZodArray<z.ZodObject<{
                title: z.ZodString;
                summaries: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    label: z.ZodString;
                    value: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
                    format: z.ZodOptional<z.ZodEnum<{
                        number: "number";
                        boolean: "boolean";
                        date: "date";
                        currency: "currency";
                        percent: "percent";
                        text: "text";
                        datetime: "datetime";
                    }>>;
                }, z.core.$strip>>>;
                tables: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    title: z.ZodOptional<z.ZodString>;
                    columns: z.ZodArray<z.ZodObject<{
                        key: z.ZodString;
                        header: z.ZodString;
                        width: z.ZodOptional<z.ZodNumber>;
                        align: z.ZodOptional<z.ZodEnum<{
                            center: "center";
                            right: "right";
                            left: "left";
                        }>>;
                        format: z.ZodOptional<z.ZodEnum<{
                            number: "number";
                            boolean: "boolean";
                            date: "date";
                            currency: "currency";
                            percent: "percent";
                            text: "text";
                            datetime: "datetime";
                        }>>;
                    }, z.core.$strip>>;
                    rows: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>>;
                    empty_message: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>>;
                notes: z.ZodOptional<z.ZodArray<z.ZodString>>;
            }, z.core.$strip>>>;
            tables: z.ZodOptional<z.ZodArray<z.ZodObject<{
                title: z.ZodOptional<z.ZodString>;
                columns: z.ZodArray<z.ZodObject<{
                    key: z.ZodString;
                    header: z.ZodString;
                    width: z.ZodOptional<z.ZodNumber>;
                    align: z.ZodOptional<z.ZodEnum<{
                        center: "center";
                        right: "right";
                        left: "left";
                    }>>;
                    format: z.ZodOptional<z.ZodEnum<{
                        number: "number";
                        boolean: "boolean";
                        date: "date";
                        currency: "currency";
                        percent: "percent";
                        text: "text";
                        datetime: "datetime";
                    }>>;
                }, z.core.$strip>>;
                rows: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>>;
                empty_message: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>>;
        }, z.core.$strip>;
        options: z.ZodOptional<z.ZodObject<{
            file_name: z.ZodOptional<z.ZodString>;
            sheet_name: z.ZodOptional<z.ZodString>;
            store_name: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
};
export default reportExportSchemas;
//# sourceMappingURL=report-export.schema.d.ts.map
// Type declarations for external modules without type definitions

declare module 'md5' {
    function md5(message: string | Buffer): string;
    export = md5;
}

declare module 'uniqid' {
    function uniqid(prefix?: string, suffix?: string): string;
    namespace uniqid {
        function process(prefix?: string, suffix?: string): string;
        function time(prefix?: string, suffix?: string): string;
    }
    export = uniqid;
}

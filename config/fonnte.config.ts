// Fonnte WhatsApp API Configuration

export const fonnteConfig = {
    token: process.env.FONNTE_TOKEN || '',
    baseUrl: 'https://api.fonnte.com',
    endpoints: {
        send: '/send',
        sendFile: '/send',
    },
};

export default fonnteConfig;

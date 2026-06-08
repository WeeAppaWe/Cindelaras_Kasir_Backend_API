// Token module types

export interface TokenPayload {
    id: string;
    key: string;
    login_time: number;
    refresh_token: number;
}

export interface DecodedToken {
    akses_key: string;
    public_key: string;
}

export interface PublicTokenResult {
    public_key: string;
    public_token: string;
}

export interface AuthAccountResult {
    id: string;
    key: string;
    tokenRemoveBearer: string;
}

declare module '*.svg';
declare module '*.png';

declare global {
    function fetch<ResponseType = unknown>(
        input: RequestInfo | URL,
        init?: RequestInit,
    ): Promise<TypedResponse<ResponseType>>;

    interface TypedResponse<T> extends Response {
        json(): Promise<T>;
    }
}

export {};

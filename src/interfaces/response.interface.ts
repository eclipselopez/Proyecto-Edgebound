export default interface IResponse {
    ok: boolean,
    message: string,
    response: string,
    code: number,
    token?: string
}
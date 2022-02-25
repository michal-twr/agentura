import { request } from 'undici';

const doRequest = async (v) =>request(v)

export { doRequest };
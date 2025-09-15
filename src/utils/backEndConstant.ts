const PROTOCOL = process.env.NEXT_PUBLIC_API_PROTOCOL;
const DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;
const PORT = process.env.NEXT_PUBLIC_API_PORT;
const CONTEXT_ROOT = "felicita";
const VERSION = "/v0";
const API = "/api";
const LINK_BAR = "/link-bar";

export const BASE_PATH = `${PROTOCOL}://${DOMAIN}:${PORT}/${CONTEXT_ROOT}`;
export const GET_ALL_LINK_BAR_DATA = `${BASE_PATH}${VERSION}${API}${LINK_BAR}/all`;
export const GET_VISIBLE_LINK_BAR_DATA = `${BASE_PATH}${VERSION}${API}${LINK_BAR}/visible`;

import { toast } from "react-toastify";
import store from "store/store";
export const AppAgent: string = `${import.meta.env.VITE_AGENT}`;
export const GwUserCode: string = `${import.meta.env.VITE_GW_USER}`;
export const GwUserPassword: string = `${import.meta.env.VITE_GW_USER_PW}`;
export const API_BASE_URL: string = `${import.meta.env.VITE_API_BASE_URL}`;
export const buildHeaders = () => {
  const { token } = store.getState().auth;
  const { NetworkId, OrgId } = store.getState().orgInfo;

  let headers = {
    Authorization: token ? `Bearer ${token}` : "",
    AppAgent: AppAgent,
    GwUserCode: GwUserCode,
    GwPassword: GwUserPassword,
    NetworkId: NetworkId,
    OrgId: OrgId,
  };
  return headers;
};

export const buildUrl = (url: string) => {
  return `${API_BASE_URL}/${url}`;
};

export const buildHeadersUploadFile = async (url: string, params: any) => {
  const { token } = store.getState().auth;
  const { NetworkId, OrgId } = store.getState().orgInfo;

  let headers = {
    Authorization: token ? `Bearer ${token}` : "",
    AppAgent: AppAgent,
    GwUserCode: GwUserCode,
    GwPassword: GwUserPassword,
    NetworkId: NetworkId,
    OrgId: OrgId,
  };
  try {
    if (!params) params = {};
    var formdata = new FormData();

    formdata.append("file", params, params.name);

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: formdata,
    };
    let fullUrl = url.indexOf("http") === 0 ? url : API_BASE_URL + "/" + url;
    const response = await fetch(fullUrl, requestOptions);
    const data = await response.json();
    return data;
  } catch (error: any) {
    toast.error(error.message || "Failed");
  }
};

import axios, {
  type AxiosRequestConfig,
  type AxiosRequestHeaders,
} from "axios";

const apiPrefix = import.meta.env.VITE_SERVER_API_PATH || "/vue-chat/api/";

const api = axios.create({ baseURL: apiPrefix });

api.interceptors.request.use((cfg) => {
  if (!cfg.headers) cfg.headers = {} as AxiosRequestHeaders;
  (cfg.headers as AxiosRequestHeaders)["Authorization"] =
    `Bearer ${localStorage.getItem("token") || ""}`;
  return cfg;
});

export async function get<T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await api.get<T>(url, { params, ...config });
  return res.data;
}

export async function post<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  const payload = (data ?? {}) as Record<string, unknown>;
  const res = await api.post<T>(url, payload, config);
  return res.data;
}

export default { get, post, api };

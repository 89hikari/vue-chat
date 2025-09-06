import axios from "axios";

const apiPrefix = import.meta.env.VITE_SERVER_API_PATH || "/api/";

interface IRequestParams {
  controllerName: string;
  methodName?: string;
  queryParams?: object;
  headers?: object;
}

export const post = async (params: IRequestParams) =>
  await axios.post(
    `${apiPrefix}${params.controllerName}${params.methodName ? `/${params.methodName}` : ""}`,
    params.queryParams || {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        ...params.headers,
      },
    }
  );

export const get = async (params: IRequestParams) =>
  await axios.get(
    `${apiPrefix}${params.controllerName}${params.methodName ? `/${params.methodName}` : ""}${
      params.queryParams
        ? `?${Object.keys(params.queryParams)
            .map((key) => `${key}=${params.queryParams![key as keyof object]}`)
            .join("&")}`
        : ""
    }`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        ...params.headers,
      },
    }
  );

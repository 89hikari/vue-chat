import axios from "axios";
import { apiBaseUrl } from "./api.client";

interface IRequestParams {
  controllerName: string;
  methodName?: string;
  queryParams?: object;
  headers?: object;
}

export const post = async (params: IRequestParams) =>
  await axios.post(
    `${apiBaseUrl}/${params.controllerName}${
      params.methodName ? `/${params.methodName}` : ""
    }`,
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
    `${apiBaseUrl}/${params.controllerName}${
      params.methodName ? `/${params.methodName}` : ""
    }${
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

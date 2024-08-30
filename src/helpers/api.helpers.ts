import axios from "axios";

const apiPrefix = import.meta.env.VITE_SERVER_API_PATH || "/api/";

export const post = async (
  controllerName: string,
  methodName: string,
  params: object
) => await axios.post(`${apiPrefix}${controllerName}/${methodName}`, params);

export const get = async (
  controllerName: string,
  methodName: string,
  queryParams?: object
) =>
  await axios.get(
    `${apiPrefix}${controllerName}/${methodName}${
      queryParams
        ? `?${Object.keys(queryParams)
            .map((key) => `${key}=${queryParams[key as keyof object]}`)
            .join("&")}`
        : ""
    }`
  );

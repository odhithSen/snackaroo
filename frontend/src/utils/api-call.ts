import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { config } from "src/config";

const backendBaseUrl = config.BACKEND_URL;

interface ApiCall {
  endpoint: string;
  method: string;
  bodyData?: object;
  accessToken?: string;
}

const apiCall = async ({
  endpoint,
  method = "GET",
  bodyData,
  accessToken,
}: ApiCall): Promise<AxiosResponse | AxiosError> => {
  const config: AxiosRequestConfig = {
    method,
    url: `${backendBaseUrl}/${endpoint}`,
    headers: {
      "content-type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
    data: bodyData,
  };

  try {
    return await axios(config);
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    throw error as AxiosError;
  }
};

export { apiCall };

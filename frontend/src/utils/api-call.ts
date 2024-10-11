import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const backendBaseUrl = process.env.REACT_APP_BACKEND_URL;

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
    return error as AxiosError;
  }
};

export { apiCall };

import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { config } from "src/config";

const backendBaseUrl = config.BACKEND_URL;

interface ApiHookProps {
  endpoint: string;
  method?: string;
  bodyData?: object;
  isPublic?: boolean;
  dependencies?: any[];
}

const useApi = ({
  endpoint,
  method = "GET",
  bodyData,
  isPublic = false,
  dependencies = [],
}: ApiHookProps) => {
  const shouldGetAccessToken = !isPublic;

  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState(true);

  const { loginWithRedirect, getAccessTokenSilently, isAuthenticated } =
    useAuth0();

  const redirectToLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      let accessToken = "";
      try {
        accessToken = shouldGetAccessToken
          ? await getAccessTokenSilently({
              authorizationParams: {
                audience: config.API_AUTH0_AUDIENCE,
                scope: "openid profile email",
              },
            })
          : "";
      } catch (error) {
        console.error("Error getting access token", error);
        if (!isAuthenticated) {
          console.log("User is not authenticated. Redirecting to login...");
          redirectToLogin();
        }
        return;
      }

      setLoading(true);

      const requestConfig: AxiosRequestConfig = {
        method,
        url: `${backendBaseUrl}/${endpoint}`,
        headers: {
          "content-type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
        data: bodyData,
      };

      try {
        const response: AxiosResponse = await axios(requestConfig);
        setData(response.data);
      } catch (error) {
        setError(error as AxiosError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, error, loading };
};

export { useApi };

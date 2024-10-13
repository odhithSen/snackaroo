import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { config } from "src/config";

const useAccessToken = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        setAccessToken(
          await getAccessTokenSilently({
            authorizationParams: {
              audience: config.API_AUTH0_AUDIENCE,
              scope: "openid profile email",
            },
          })
        );
      } catch (error) {
        console.error("Get Access Token: Error getting access token.", error);
        setAccessToken("");
      }
    };
    getAccessToken();
  }, [getAccessTokenSilently]);

  return { accessToken };
};

export { useAccessToken };

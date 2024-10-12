import { useState, useEffect, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const useAccessToken = () => {
  const { loginWithRedirect, getAccessTokenSilently } = useAuth0();

  const [accessToken, setAccessToken] = useState<string>("");

  const redirectToLogin = useCallback(async () => {
    await loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  }, [loginWithRedirect]);

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        setAccessToken(
          await getAccessTokenSilently({
            authorizationParams: {
              audience: "https://user-api.example.com",
              scope: "openid profile email",
            },
          })
        );
      } catch {
        console.error(
          "Get Access Token: Error getting access token. Redirecting to login..."
        );
        setAccessToken("");
        redirectToLogin();
      }
    };
    getAccessToken();
  }, [getAccessTokenSilently, redirectToLogin]);

  return { accessToken };
};

export { useAccessToken };

if (
  !process.env.REACT_APP_AUTH0_DOMAIN ||
  !process.env.REACT_APP_AUTH0_CLIENT_ID ||
  !process.env.REACT_APP_AUTH0_CALLBACK_URL ||
  !process.env.REACT_APP_API_AUTH0_AUDIENCE ||
  !process.env.REACT_APP_BACKEND_URL
) {
  console.error("Error: some or all environment variables are not set!");
}

const config = {
  AUTH0_DOMAIN: process.env.REACT_APP_AUTH0_DOMAIN ?? "",
  AUTH0_CLIENT_ID: process.env.REACT_APP_AUTH0_CLIENT_ID ?? "",
  AUTH0_CALLBACK_URL: process.env.REACT_APP_AUTH0_CALLBACK_URL ?? "",
  API_AUTH0_AUDIENCE: process.env.REACT_APP_API_AUTH0_AUDIENCE ?? "",
  BACKEND_URL: process.env.REACT_APP_BACKEND_URL ?? "",
};

console.info("Environment variables are set!");

export { config };

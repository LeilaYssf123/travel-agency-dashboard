import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {sentryReactRouter, type SentryReactRouterBuildOptions} from "@sentry/react-router";


const sentryConfig: SentryReactRouterBuildOptions = {
  org: "js-mastery-lm",
  project: "travel-agency",
  // An auth token is required for uploading source maps.
  authToken: "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"
  // ...
};



export default defineConfig(config => {
  return {
    plugins: [tailwindcss(),tsconfigPaths() ,reactRouter(),sentryReactRouter(sentryConfig, config)],
    sentryConfig,
    ssr:{
      noExternal:[/@syncfusion/]
    }
  };
});

<script lang="ts" setup>
import { onMounted } from "vue";
import { SwaggerConfigs, SwaggerUIBundle } from "swagger-ui-dist";

declare global {
  interface Window {
    ui: SwaggerUIBundle;
  }
}

onMounted(() => {
  window.ui = SwaggerUIBundle({
    url: "/v2/api-docs/",
    dom_id: "#swagger-ui",
    deepLinking: true,
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
    plugins: [SwaggerUIBundle.plugins.DownloadUrl],
    layout: "BaseLayout",
    requestInterceptor: (req) => {
      if (!req.loadSpec) {
        // TODO api auth
        // const promise = this.$api.getSession().then((session) => {
        //     req.headers.authorization = 'HangarApi session="' + session + '"';
        //     return req;
        // });
        if (req.url.startsWith("http://localhost:8080")) {
          req.url = req.url.replace("http://localhost:8080", "http://localhost:3333");
        }
      }
      return req;
    },
  } as SwaggerConfigs);
});
</script>

<template>
  <div class="bg-gray-200 rounded-md my-auto mx-2" lg="w-2/3 min-w-2/3 max-w-2/3">
    <div id="swagger-ui" />
  </div>
</template>

<style lang="scss">
@import "swagger-ui-dist/swagger-ui.css";

.swagger-ui {
  .topbar .download-url-wrapper,
  .info hgroup.main a {
    display: none;
  }
  .wrapper .info {
    background-color: unset !important;
    border-color: unset !important;
    margin: 2rem 0;
    .title small pre {
      background-color: unset;
      border: unset;
    }
    .description h2 {
      padding-top: 1.5rem;
      margin: 1.5rem 0 0;
      border-top: 3px solid #333333;
    }
    .scheme-container {
      border-top: 1px solid rgba(0, 0, 0, 0.15);
    }
    .markdown {
      min-height: 0;
    }
  }
}
.model-container,
.responses-inner {
  overflow-x: auto;
}
</style>

import VueI18n from "@intlify/vite-plugin-vue-i18n";
import Vue from "@vitejs/plugin-vue";
import LinkAttributes from "markdown-it-link-attributes";
import Prism from "markdown-it-prism";
import path from "node:path";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import EslintPlugin from "vite-plugin-eslint";
import Markdown from "vite-plugin-md";
import Pages from "vite-plugin-pages";
import { VitePWA } from "vite-plugin-pwa";
import Layouts from "vite-plugin-vue-layouts";
import WindiCSS from "vite-plugin-windicss";
import viteSSR from "vite-ssr/plugin";
import prettier from "./src/plugins/prettier";

const proxyHost = process.env.proxyHost || "http://localhost:8080";
const authHost = process.env.authHost || "http://localhost:3001";

export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    viteSSR(),

    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ["vue", "md"],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/vite-plugin-md
    Markdown({
      wrapperClasses: "prose prose-sm m-auto text-left",
      headEnabled: true, // This relies on useHead
      markdownItSetup(md) {
        // https://prismjs.com/
        md.use(Prism);
        md.use(LinkAttributes, {
          pattern: /^https?:\/\//,
          attrs: {
            target: "_blank",
            rel: "noopener",
          },
        });
      },
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // we don't want to import components, just icons
      dirs: ["none"],
      // auto import icons
      resolvers: [
        // https://github.com/antfu/vite-plugin-icons
        IconsResolver({
          componentPrefix: "icon",
          enabledCollections: ["mdi"],
        }),
      ],
      dts: "src/types/generated/icons.d.ts",
    }),

    // https://github.com/antfu/unplugin-icons
    Icons({
      autoInstall: true,
    }),

    // https://github.com/windicss/vite-plugin-windicss
    WindiCSS({
      safelist: "prose prose-sm m-auto",
    }),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      includeAssets: ["favicon/*"],
      strategies: "injectManifest",
      disable: true,
      manifest: {
        name: "Hangar | PaperMC",
        short_name: "Hangar",
        description: "Plugin repository for Paper plugins and more!",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/favicon/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicon/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/favicon/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),

    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    VueI18n({
      include: [path.resolve(__dirname, "src/i18n/locales/*.json")],
    }),

    EslintPlugin({
      fix: true,
    }),
    prettier(),
  ],

  optimizeDeps: {
    include: ["vue", "vue-router", "@vueuse/core", "@vueuse/head"],
    exclude: ["vue-demi"],
  },

  envDir: ".env",
  envPrefix: "HANGAR",

  server: {
    proxy: {
      // backend
      "/api/": proxyHost,
      "/signup": proxyHost,
      "/login": proxyHost,
      "/logout": proxyHost,
      "/handle-logout": proxyHost,
      "/refresh": proxyHost,
      "/invalidate": proxyHost,
      "/v2/api-docs/": proxyHost,
      "/robots.txt": proxyHost,
      "/sitemap.xml": proxyHost,
      "/global-sitemap.xml": proxyHost,
      "/*/sitemap.xml": proxyHost,
      "/statusz": proxyHost,
      // auth
      "/avatar": authHost,
      "/oauth/logout": authHost,
      "/oauth2": authHost,
    },
  },

  // ssr options aren't part of release types for vite cause its still marked as experimental
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ssr: {
    noExternal: ["lodash-es"],
  },
});

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      https: true,
      host: "0.0.0.0",
      port: 8080,
      client: {
        webSocketURL: "ws://0.0.0.0:8080/ws",
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  },
});

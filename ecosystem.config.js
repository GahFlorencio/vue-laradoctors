module.exports = {
    apps: [
      {
        name: "laradoctors.gcsdi.com.br",
        exec_mode: "cluster",
        instances: "max",
        script: "./node_modules/nuxt/bin/nuxt.js",
        args: "start"
      }
    ]
  };
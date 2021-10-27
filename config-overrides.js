const { alias } = require("react-app-rewire-alias");

module.exports = function override(config, env) {
  alias({
    "@containers": "src/containers",
    "@componets": "src/componets",
    "@constant": "src/constant",
    "@hog-helpers": "src/hog-helpers",
    "@servises": "src/servises",
    "@utils": "src/utils",  
    "@styles": "src/styles",
  })(config);
  return config;
};

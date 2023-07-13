const path = require("path");

function isWebTarget(caller) {
  return Boolean(caller && caller.target === "web");
}

module.exports = (api) => {
  const web = api.caller(isWebTarget);

  return {
    presets: [
      [
        "@babel/preset-react",
        {
          runtime: "automatic",
          importSource: web ? "react" : path.resolve(__dirname, "./runtime"),
        },
      ],
      ["@babel/preset-env"],
    ],
    plugins: [
      "babel-plugin-syntax-dynamic-import",
    ],
  };
};

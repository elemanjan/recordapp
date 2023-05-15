const presets = ["module:metro-react-native-babel-preset"];
const plugins = [];

plugins.push(
  [
    "module-resolver",
    {
      root: ["./app"],
      extensions: [".js", ".json"],
      alias: {
        "@": "./app",
      },
    },
  ],
);

module.exports = {
  presets,
  plugins,
}

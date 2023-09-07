const { getDefaultConfig } = require("expo/metro-config")

/**
 * Expo metro config
 * Learn more https://docs.expo.io/guides/customizing-metro
 *
 * For one idea on how to support symlinks in Expo, see:
 * https://github.com/infinitered/ignite/issues/1904#issuecomment-1054535068
 */
const config = getDefaultConfig(__dirname)

config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== "svg")
config.resolver.sourceExts.push("svg")
config.resolver.sourceExts.push("cjs")
config.resolver.sourceExts.push("mjs")
config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer")

module.exports = config

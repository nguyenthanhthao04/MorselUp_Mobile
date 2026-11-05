const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
// Keep subpixel SVG dimensions (e.g. a 0.25 px divider) intact. Metro's
// image-size parser rejects those; package the original bytes as a data asset.
config.resolver.assetExts.push('svgdata');
module.exports = config;

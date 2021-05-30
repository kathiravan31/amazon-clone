/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
// const blacklist = require('metro').createBlacklist;
// const blacklist = require('metro-config/src/defaults/blacklist'); 
const exclusionList = require('metro-config/src/defaults/exclusionList');


module.exports = {
  resolver: {
    // blacklistRE: blacklist([/#current-cloud-backend\/.*/])
    blacklistRE: exclusionList([/#current-cloud-backend\/.*/])
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};



var en = require("./translations.en.json");
var hi = require("./translations.hi.json");

const i18n = {
  translations: {
    en,
    hi,
  },
  defaultLang: "en",
  useBrowserDefault: true,
};

module.exports = i18n;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lang = require("i18n");
class Language {
    constructor(localesDirectory, locale) {
        Lang.configure({
            directory: "./Locales"
        });
        if (locale) {
            this.setLocale(locale);
        }
    }
    setLocale(locale) {
        if (Lang.getLocales().indexOf(locale.trim()) > -1) {
            Lang.setLocale(locale.trim());
        }
        else {
            //Logger.info("Language not found, setting default language: en");
        }
    }
}
exports.default = Language;
//# sourceMappingURL=Language.js.map
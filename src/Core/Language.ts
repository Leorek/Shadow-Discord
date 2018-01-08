import * as Lang from "i18n";

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
    } else {
      //Logger.info("Language not found, setting default language: en");
    }
  }
}

export default Language;

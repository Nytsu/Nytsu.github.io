import type en from "./messages/en.json";

// Types every `useTranslations`/`getTranslations` call against the actual
// shape of messages/en.json, so a typo'd key fails `tsc`, not the page.
declare module "next-intl" {
  interface AppConfig {
    Messages: typeof en;
  }
}

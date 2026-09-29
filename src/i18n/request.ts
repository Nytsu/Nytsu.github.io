import { getRequestConfig } from "next-intl/server";

/**
 * No [locale] routing (see CLAUDE.md's i18n note): English stays at today's
 * clean URLs. This just makes translated strings available to components —
 * the locale is fixed here on purpose, until a second language is real
 * enough to become its own explicit route folder (e.g. /es).
 */
export default getRequestConfig(async () => {
  const locale = "en";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

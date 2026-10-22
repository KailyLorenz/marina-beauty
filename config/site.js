/**
 * Sales settings (restored from the original project).
 * IMPORTANT: The original source labels these prices and dates as DEMO values.
 * Confirm the actual approved offer and payment amount before publishing.
 *
 * The deadline uses Israel winter-time offset (+02:00) on 1 Nov 2026.
 * Once that date passes, the timer and discount disappear automatically
 * and the current price returns to regularPrice.
 */
export const siteConfig = {
  regularPrice: 12700,          // Old/full price shown struck through while offer is active
  promoPrice: 9700,             // Discounted course price during the active offer
  promoEndsAt: '2026-11-01T00:00:00+02:00', // Must be a real approved deadline
  checkoutUrl: '',             // GetCourse checkout URL (must match charged amount)
  maxUrl: 'https://max.ru/u/f9LHodDocOKIcEuRivg4NH_Lfpm4imRaTjIVGeP7rzQI5ppCJ_qHIdMhFOA',
  telegramUrl: 'https://t.me/m/IFw6hQ4iYmRi',
  vkUrl: 'https://vk.ru/marinacarper',
  contraindications: '',      // Approved contraindications before publishing
};

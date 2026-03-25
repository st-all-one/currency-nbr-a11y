/**
 * @module Locales
 * Mapeamento de localizações geográficas para suas moedas padrão.
 *
 * Este módulo provê a inteligência de fallback para quando o usuário
 * define um idioma (locale) mas não especifica explicitamente a moeda.
 */

/**
 * Mapa de Locales para suas Moedas Padrão.
 *
 * Definido como 'as const' para permitir inferência de tipos literais
 * no TypeScript, garantindo segurança em tempo de compilação.
 */
export const LOCALE_CURRENCY_MAP = {
    "pt-BR": "BRL", // Real Brasileiro
    "en-US": "USD", // Dólar Americano
    "en-EU": "EUR", // Euro (Contexto Europeu de Língua Inglesa)
    "es-ES": "EUR", // Euro (Espanha)
    "fr-FR": "EUR", // Euro (França)
    "zh-CN": "CNY", // Yuan Chinês
    "ru-RU": "RUB", // Rublo Russo
    "ja-JP": "JPY", // Iene Japonês
} as const;

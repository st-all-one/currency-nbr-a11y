/**
 * Formata um valor BigInt (em escala interna ou reduzida) para uma string decimal.
 *
 * Esta função reconstrói a string decimal sem utilizar tipos flutuantes,
 * garantindo que nenhum dígito seja perdido no processo de formatação.
 *
 * @param value O valor BigInt a ser formatado.
 * @param decimals O número de casas decimais desejado.
 * @returns A representação em string (ex: "10.50").
 */
export function formatBigIntToString(value: bigint, decimals: number): string {
    const isNeg = value < 0n;
    const abs = isNeg ? -value : value;
    const scale = 10n ** BigInt(decimals);

    // Extraímos a parte inteira e a fracionária utilizando divisão e módulo de BigInt
    const int = abs / scale;

    if (decimals === 0) {
        return `${isNeg ? "-" : ""}${int}`;
    }

    // Padronizamos a parte fracionária com zeros à esquerda para manter a precisão correta
    const frac = (abs % scale).toString().padStart(decimals, "0");
    return `${isNeg ? "-" : ""}${int}.${frac}`;
}

/**
 * Formata um valor numérico para exibição monetária localizada.
 *
 * Utiliza a API nativa 'Intl.NumberFormat' para garantir conformidade
 * com as regras de cada país/moeda.
 *
 * @param formattedString O valor já formatado em string decimal (ex: "1234.56").
 * @param locale O locale para formatação (padrão: "pt-BR").
 * @param currency A moeda para formatação (padrão: "BRL").
 * @returns A string formatada monetariamente (ex: "R$ 1.234,56").
 */
export function formatMonetary(formattedString: string, locale = "pt-BR", currency = "BRL"): string {
    const numberValue = parseFloat(formattedString);
    if (isNaN(numberValue)) { return formattedString; }

    // Detectamos a precisão original para forçar o Intl a respeitar as casas decimais solicitadas
    const decimalPart = formattedString.split(".")[1];
    const precision = decimalPart ? decimalPart.length : 0;

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
    }).format(numberValue);
}

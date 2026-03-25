import { INTERNAL_CALCULATION_PRECISION } from "../constants.ts";
import { formatBigIntToString } from "./formatting.ts";
import { type RoundingMethod } from "./options.ts";
import { applyRounding } from "./rounding_manager.ts";

/**
 * Resultado da operação de arredondamento lazy.
 */
export interface LazyRoundingResult {
    /**
     * O valor BigInt arredondado na escala solicitada (ex: para 2 casas, "1.50" vira 150n).
     */
    centsValue: bigint;

    /**
     * A representação em string formatada do valor arredondado (ex: "1.50").
     */
    stringValue: string;
}

/**
 * Helper para realizar o arredondamento e formatação de forma preguiçosa (lazy).
 * Converte o valor interno para o formato final desejado em bigint e string.
 *
 * @param value O valor BigInt bruto na escala interna (12 casas).
 * @param decimals O número de casas decimais solicitado para o output.
 * @param roundingMethod O método de arredondamento a ser aplicado.
 * @returns Um objeto contendo o valor em "centavos" (escala reduzida) e a string formatada.
 */
export function outputLazyRounding(
    value: bigint,
    decimals: number,
    roundingMethod: RoundingMethod,
): LazyRoundingResult {
    // 1. Aplica o arredondamento da escala interna (12) para a escala alvo (ex: 2)
    const roundedValue = applyRounding(
        value,
        roundingMethod,
        INTERNAL_CALCULATION_PRECISION,
        decimals,
    );

    // 2. Converte o BigInt arredondado para String
    const stringValue = formatBigIntToString(roundedValue, decimals);

    return {
        centsValue: roundedValue,
        stringValue,
    };
}

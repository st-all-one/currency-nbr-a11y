import type { RoundingMethod } from "./options.ts";
import {
    roundCeil,
    roundHalfEven,
    roundHalfUp,
    roundToPrecisionNBR5891,
    roundTruncate,
} from "./rounding_strategies.ts";

/**
 * Aplica o método de arredondamento selecionado.
 *
 * @param value Valor BigInt na escala interna (geralmente 10^12).
 * @param method Estratégia de arredondamento (NBR-5891, HALF-EVEN, etc).
 * @param currentScale Escala atual do BigInt (ex: 12).
 * @param targetDecimals Casas decimais desejadas no output (ex: 2).
 * @returns O valor BigInt ajustado para a nova escala (targetDecimals).
 */
export function applyRounding(
    value: bigint,
    method: RoundingMethod,
    currentScale: number,
    targetDecimals: number,
): bigint {
    switch (method) {
        case "HALF-EVEN":
            return roundHalfEven(value, currentScale, targetDecimals);
        case "HALF-UP":
            return roundHalfUp(value, currentScale, targetDecimals);
        case "TRUNCATE":
            return roundTruncate(value, currentScale, targetDecimals);
        case "CEIL":
            return roundCeil(value, currentScale, targetDecimals);
        case "NBR-5891":
        default:
            return roundToPrecisionNBR5891(value, currentScale, targetDecimals);
    }
}

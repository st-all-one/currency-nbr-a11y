/**
 * @module CalcAUD
 *
 * CalcAUD é uma biblioteca de alta performance para cálculos financeiros
 * com auditoria nativa e precisão arbitrária baseada em BigInt.
 *
 * Projetada para o ecossistema Deno e JSR, ela resolve os problemas de
 * imprecisão do ponto flutuante (IEEE 754) e fornece rastreabilidade total
 * através de expressões em LaTeX, Unicode e narração verbal para acessibilidade.
 *
 * @example
 * ```ts
 * import { CalcAUD } from "@st-all-one/calc-aud";
 *
 * const res = CalcAUD.from("10.50").add("5.25").commit(2);
 * console.log(res.toMonetary()); // "R$ 15,75"
 * console.log(res.toLaTeX());    // "$$ 10.50 + 5.25 = ... $$"
 * ```
 */

export { CalcAUD } from "./src/main.ts";
export { CalcAUDOutput } from "./src/output.ts";
export type { CalcAUDAllowedValue } from "./src/main.ts";
export type { ICalcAUDCustomOutput } from "./src/output_helpers/custom_formatter.ts";

/**
 * Re-exporta configurações de precisão para uso avançado em auditorias externas.
 */
export { DEFAULT_DISPLAY_PRECISION, INTERNAL_CALCULATION_PRECISION } from "./src/constants.ts";

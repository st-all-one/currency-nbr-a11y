import type { CalcAUDOutput } from "../output.ts";
import type { CalcAUDOutputOptions } from "./options.ts";

/**
 * Interface funcional para criação de processadores de saída customizados.
 *
 * Permite que desenvolvedores estendam a biblioteca CalcAUD para suportar
 * formatos de exportação proprietários ou protocolos específicos.
 *
 * @template Toutput O tipo de retorno definido pelo desenvolvedor.
 *
 * @example
 * ```ts
 * // Exemplo: Exportador de Log Simples
 * const logProcessor: ICalcAUDCustomOutput<void> = (ctx) => {
 *   console.log(`Valor Bruto: ${ctx.rawData.value}`);
 * };
 * res.toCustomOutput(logProcessor);
 * ```
 */
export interface ICalcAUDCustomOutput<Toutput> {
    (this: CalcAUDOutput, context: ICalcAUDCustomOutputContext): Toutput;
}

/**
 * Contexto de dados e métodos fornecido aos processadores customizados.
 *
 * Contém tanto os dados brutos (BigInt, LaTeX) quanto acesso aos métodos
 * de formatação padrão para reutilização.
 */
export interface ICalcAUDCustomOutputContext {
    /** Dados puros do cálculo para processamento direto. */
    rawData: {
        readonly value: bigint;
        readonly decimalPrecision: number;
        readonly latexExpression: string;
        readonly verbalExpression: string;
        readonly unicodeExpression: string;
        readonly options: Readonly<Required<CalcAUDOutputOptions>>;
    };
    /** Acesso aos métodos de saída padrão da biblioteca. */
    method: Pick<
        CalcAUDOutput,
        | "toString"
        | "toFloatNumber"
        | "toCentsInBigInt"
        | "toRawInternalBigInt"
        | "toMonetary"
        | "toLaTeX"
        | "toHTML"
        | "toVerbalA11y"
        | "toUnicode"
        | "toImageBuffer"
    >;
}

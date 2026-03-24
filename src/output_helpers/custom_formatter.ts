import type { CurrencyNBROutput } from "../output.ts";
import type { CurrencyNBROutputOptions } from "./options.ts";

/**
 * Interface funcional para saídas customizadas agnósticas.
 * Toutput é o tipo de retorno definido pelo desenvolvedor (ex: Promise<void>, Uint8Array, etc).
 * Permite acesso via 'this' (instância completa) ou via objeto de contexto.
 */
export interface ICurrencyNBRCustomOutput<Toutput> {
    (this: CurrencyNBROutput, context: ICurrencyNBRCustomOutputContext): Toutput;
}

/**
 * Interface genérica para o contexto passado ao processador customizado.
 */
export interface ICurrencyNBRCustomOutputContext {
    rawData: {
        readonly value: bigint;
        readonly decimalPrecision: number;
        readonly latexExpression: string;
        readonly verbalExpression: string;
        readonly unicodeExpression: string;
        readonly options: Readonly<Required<CurrencyNBROutputOptions>>;
    };
    method: Pick<
        CurrencyNBROutput,
        | "toString"
        | "toFloatNumber"
        | "toBigInt"
        | "toMonetary"
        | "toLaTeX"
        | "toHTML"
        | "toVerbalA11y"
        | "toUnicode"
        | "toImageBuffer"
    >;
}

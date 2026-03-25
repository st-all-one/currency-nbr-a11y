/**
 * @module Wrappers
 * Utilitários para encapsulamento léxico de expressões matemáticas.
 *
 * Garante que operações complexas mantenham a precedência correta ao serem
 * integradas em fórmulas maiores, adicionando parênteses apenas quando
 * estritamente necessário para evitar redundância visual.
 */

/**
 * Envolve uma expressão LaTeX em parênteses elásticos (\left( ... \right))
 * se a expressão contiver operadores de baixa precedência (+ ou -) e não
 * estiver já agrupada.
 *
 * @param expr A expressão LaTeX.
 * @returns A expressão, possivelmente envolta em parênteses.
 */
export function wrapLaTeX(expr: string): string {
    const trimmed = expr.trim();
    // Detectamos se a expressão precisa de proteção para manter a integridade matemática
    if (
        !trimmed.startsWith("\\left(") && !trimmed.startsWith("{")
        && (trimmed.includes("+") || trimmed.includes(" - "))
    ) {
        return `\\left( ${expr} \\right)`;
    }
    return expr;
}

/**
 * Envolve uma expressão Unicode em parênteses normais (...) se necessário.
 *
 * @param expr A expressão Unicode.
 * @returns A expressão, possivelmente envolta em parênteses.
 */
export function wrapUnicode(expr: string): string {
    const trimmed = expr.trim();
    if (
        !trimmed.startsWith("(") && (trimmed.includes("+") || trimmed.includes(" - "))
    ) {
        return `(${expr})`;
    }
    return expr;
}

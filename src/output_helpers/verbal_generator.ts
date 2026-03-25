/**
 * @module VerbalGenerator
 * Utilitários básicos para geração de frases verbais.
 */

/**
 * Gera uma descrição verbal simples para acessibilidade.
 *
 * Esta função realiza uma substituição básica de símbolos por termos
 * legíveis para humanos em contextos onde a localização completa
 * não é necessária ou como fallback.
 *
 * @param verbalExpression A expressão verbal acumulada.
 * @param result O resultado formatado em string.
 * @returns A frase completa verbalizada.
 */
export function generateVerbal(verbalExpression: string, result: string): string {
    // Substituímos o ponto decimal por 'vírgula' para melhorar a fluidez em leitores de tela.
    const readableResult = result.replace(".", " vírgula ");
    return `${verbalExpression} é igual a ${readableResult}`;
}

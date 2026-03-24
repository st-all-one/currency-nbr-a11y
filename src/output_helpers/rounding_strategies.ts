/**
 * Implementa estratégias de arredondamento para BigInt com escala fixa.
 */

 /**
  * Implementação rigorosa do arredondamento decimal conforme a norma ABNT NBR 5891:1977.
  *
  * @param value O valor bruto em BigInt a ser arredondado.
  * @param currentPrecision A precisão decimal atual do valor (ex: 12).
  * @param targetPrecision A precisão decimal desejada (ex: 2).
  * @returns O valor arredondado em BigInt na escala desejada.
  */
 export function roundToPrecisionNBR5891(
     value: bigint,
     currentPrecision: number,
     targetPrecision: number,
 ): bigint {
     // Se a precisão desejada for maior ou igual à atual, apenas escala para cima.
     if (currentPrecision <= targetPrecision) {
         const scaleFactor = 10n ** BigInt(targetPrecision - currentPrecision);
         return value * scaleFactor;
     }

     const precisionDifference = currentPrecision - targetPrecision;
     const divisor = 10n ** BigInt(precisionDifference);
     const midPointThreshold = divisor / 2n;

     const integralPart = value / divisor;
     const fractionalRemainder = value % divisor;
     const absoluteRemainder = fractionalRemainder < 0n ? -fractionalRemainder : fractionalRemainder;

     // Regra 1 e 2: Menor que 5 mantém, Maior que 5 aumenta.
     if (absoluteRemainder < midPointThreshold) {
         return integralPart;
     } else if (absoluteRemainder > midPointThreshold) {
         const adjustment = value >= 0n ? 1n : -1n;
         return integralPart + adjustment;
     } else {
         /**
          * Regra 3: Exatamente 5 seguido de zeros.
          * Critério de desempate: Arredonda para o algarismo par mais próximo.
          */
         const lastDigitOfIntegral = integralPart < 0n ? -(integralPart % 10n) : (integralPart % 10n);
         const isLastDigitEven = lastDigitOfIntegral % 2n === 0n;

         if (isLastDigitEven) {
             // Se for par, permanece invariável.
             return integralPart;
         } else {
             // Se for ímpar, aumenta em uma unidade (em magnitude).
             const adjustment = value >= 0n ? 1n : -1n;
             return integralPart + adjustment;
         }
     }
 }


/**
 * Arredondamento "Half-Up" (Padrão escolar).
 * Se a parte fracionária for >= 0.5, arredonda para cima. Caso contrário, para baixo.
 */
export function roundHalfUp(value: bigint, currentScale: number, targetDecimals: number): bigint {
    const scaleDiff = BigInt(currentScale - targetDecimals);
    if (scaleDiff <= 0n) { return value; // Sem necessidade de arredondamento se a escala alvo for maior
     }

    const divisor = 10n ** scaleDiff;
    const remainder = value % divisor;
    const half = divisor / 2n;

    let result = value / divisor;

    // Tratamento para números negativos
    if (value < 0n) {
        if (remainder <= -half) {
            result -= 1n;
        }
    } else {
        if (remainder >= half) {
            result += 1n;
        }
    }

    return result;
}

/**
 * Arredondamento "Half-Even" (Bancário).
 * Se a parte fracionária for 0.5, arredonda para o inteiro par mais próximo.
 */
export function roundHalfEven(value: bigint, currentScale: number, targetDecimals: number): bigint {
    const scaleDiff = BigInt(currentScale - targetDecimals);
    if (scaleDiff <= 0n) { return value; }

    const divisor = 10n ** scaleDiff;
    const remainder = value % divisor;
    const half = divisor / 2n;

    let result = value / divisor;

    // Se o resto for exatamente metade
    if (remainder === half || remainder === -half) {
        // Se o resultado atual for ímpar, arredonda para o par (soma/subtrai 1)
        if (result % 2n !== 0n) {
            if (value < 0n) {
                result -= 1n;
            } else {
                result += 1n;
            }
        }
    } else {
        // Comportamento normal de Half-Up para outros casos
        if (value < 0n) {
            if (remainder < -half) { result -= 1n; }
        } else {
            if (remainder > half) { result += 1n; }
        }
    }

    return result;
}

/**
 * Arredondamento "Truncate" (Floor para positivos, Ceil para negativos em direção a zero).
 * Simplesmente descarta a precisão extra.
 */
export function roundTruncate(value: bigint, currentScale: number, targetDecimals: number): bigint {
    const scaleDiff = BigInt(currentScale - targetDecimals);
    if (scaleDiff <= 0n) { return value; }

    const divisor = 10n ** scaleDiff;
    return value / divisor;
}

/**
 * Arredondamento "Ceil".
 * Sempre arredonda em direção ao infinito positivo.
 */
export function roundCeil(value: bigint, currentScale: number, targetDecimals: number): bigint {
    const scaleDiff = BigInt(currentScale - targetDecimals);
    if (scaleDiff <= 0n) { return value; }

    const divisor = 10n ** scaleDiff;
    const remainder = value % divisor;

    let result = value / divisor;

    if (remainder > 0n) {
        result += 1n;
    }
    // Para negativos, a divisão inteira já faz o "ceil" em direção a zero, que é maior que o valor original
    // Ex: -1.1 -> -1 (que é > -1.1)

    return result;
}

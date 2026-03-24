import { assertThrows } from "https://deno.land/std/assert/mod.ts";
import { CurrencyNBR } from "../src/main.ts";
import { CurrencyNBRError } from "../src/errors.ts";

Deno.test("CurrencyNBR.pow - validação rigorosa de expoente fracionário", () => {
    const base = CurrencyNBR.from(10);

    // Caso 1: Múltiplas barras (ex: "2/3/5")
    assertThrows(
        () => base.pow("2/3/5"),
        CurrencyNBRError,
        "O expoente '2/3/5' é inválido. Um expoente fracionário deve conter exatamente um numerador e um denominador separados por uma única barra (ex: '1/2').",
    );

    // Caso 2: Formato inválido com caracteres não numéricos (ex: "1/abc")
    assertThrows(
        () => base.pow("1/abc"),
        CurrencyNBRError,
        "Não foi possível converter as partes do expoente '1/abc' para números inteiros.",
    );

    // Caso 3: Apenas uma barra sem números (ex: "/")
    // BigInt("") resulta em 0n no Deno, que então falha na validação do denominador positivo em calculateFractionalPower
    assertThrows(
        () => base.pow("/"),
        CurrencyNBRError,
        "O denominador de um expoente fracionário deve ser um número inteiro positivo.",
    );
    
    // Caso 4: Espaços em branco (deve funcionar se for válido, ou falhar se for "1 / 2 / 3")
    assertThrows(
        () => base.pow("1 / 2 / 3"),
        CurrencyNBRError,
        "O expoente '1 / 2 / 3' é inválido.",
    );
});

Deno.test("CurrencyNBR.pow - expoente fracionário válido com espaços", () => {
    const base = CurrencyNBR.from(4);
    // "1 / 2" deve ser aceito pois o .trim() é usado
    const result = base.pow(" 1 / 2 ");
    // Raiz quadrada de 4 é 2
    // O valor interno deve ser 2 * INTERNAL_SCALE_FACTOR (10^12)
    // Usando commit para facilitar verificação
    const output = JSON.parse(result.commit(2).toJson(["toString"])) as any;
    if (output.toString !== "2.00") {
        throw new Error(`Esperado 2.00, obtido ${output.toString}`);
    }
});

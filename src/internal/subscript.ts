/**
 * @module Subscript
 * Utilitário para conversão de caracteres alfanuméricos em seus equivalentes
 * subscritos Unicode. Utilizado primariamente na geração de representações
 * auditáveis em texto puro (Unicode).
 */

/**
 * Converte caracteres normais para seus equivalentes subscritos em Unicode.
 *
 * Suporta dígitos de 0-9, letras básicas para abreviações de arredondamento
 * e símbolos operacionais comuns.
 *
 * @param s A string original.
 * @returns A string convertida para subscrito.
 */
export function toSubscript(s: string): string {
    // Mapeamento estático para garantir performance e evitar overhead de regex
    const map: Record<string, string> = {
        "0": "₀",
        "1": "₁",
        "2": "₂",
        "3": "₃",
        "4": "₄",
        "5": "₅",
        "6": "₆",
        "7": "₇",
        "8": "₈",
        "9": "₉",
        "A": "ₐ",
        "B": "ʙ",
        "C": "ᴄ",
        "D": "ᴅ",
        "E": "ₑ",
        "F": "ꜰ",
        "G": "ɢ",
        "H": "ₕ",
        "I": "ᵢ",
        "J": "ⱼ",
        "K": "ₖ",
        "L": "ₗ",
        "M": "ₘ",
        "N": "ₙ",
        "O": "ₒ",
        "P": "ₚ",
        "Q": "ǫ",
        "R": "ᵣ",
        "S": "ₛ",
        "T": "ₜ",
        "U": "ᵤ",
        "V": "ᵥ",
        "W": "ᴡ",
        "X": "ₓ",
        "Y": "ʏ",
        "Z": "ᴢ",
        "+": "₊",
        "-": "₋",
        "(": "₍",
        ")": "₎",
        ".": "·",
        ",": "·",
    };
    return s.split("").map((c) => map[c.toUpperCase()] || c).join("");
}

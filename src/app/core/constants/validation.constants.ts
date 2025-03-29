/**
 * Mensajes de validación para el formulario
 * 
 * Objeto constante que contiene todos los mensajes de error
 * que se pueden mostrar en los campos del formulario.
 * 
 * El tipo 'as const' asegura que el objeto es inmutable
 * y mantiene los tipos literales de las cadenas.
 */
export const VALIDATION_MESSAGES = {
  required: 'Este campo es requerido',
  email: 'Email inválido',
  minlength: (params: { requiredLength: number }) => `Mínimo ${params.requiredLength} caracteres`,
  maxlength: (params: { requiredLength: number }) => `Máximo ${params.requiredLength} caracteres`,
  pattern: 'Formato inválido'
} as const;

/**
 * Patrón de validación para números de teléfono
 * 
 * Acepta:
 * - Números con o sin prefijo '+'
 * - Espacios y guiones como separadores
 * - Mínimo 9 dígitos
 */
export const PHONE_PATTERN = /^\+?[\d\s-]{9,}$/;
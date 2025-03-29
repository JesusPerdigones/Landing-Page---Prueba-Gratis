import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, ValidationErrors, Validators, FormControl } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

/**
 * Interface que define la estructura del formulario de contacto
 * Cada propiedad representa un campo del formulario
 */
interface FormFields {
  nombre: string;
  email: string;
  telefono: string;
  cargo: string;
  comentario: string;
  aceptaComunicaciones: boolean;
}

/**
 * Tipo que define la estructura del FormGroup con tipos específicos para cada control
 * Asegura type safety en los controles del formulario
 */
type FormGroupType = FormGroup<{
  [K in keyof FormFields]: K extends 'aceptaComunicaciones' ? FormControl<boolean> : FormControl<string>;
}>;

/**
 * Componente del formulario de contacto
 * 
 * Gestiona la lógica del formulario de contacto, incluyendo:
 * - Validación de campos
 * - Animaciones de UI
 * - Manejo de estados del formulario
 * - Envío de datos
 * - Feedback al usuario
 */
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    // Animación de fade para elementos que aparecen/desaparecen
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      transition('void <=> *', animate('300ms ease-out'))
    ]),
    // Animación para el estado del botón
    trigger('buttonState', [
      state('valid', style({
        transform: 'scale(1)',
        opacity: 1
      })),
      state('invalid', style({
        transform: 'scale(0.95)',
        opacity: 0.7
      })),
      state('submitting', style({
        transform: 'scale(0.98)'
      })),
      transition('* => *', animate('200ms ease-out'))
    ])
  ]
})
export class ContactComponent implements OnInit {
  // Propiedades públicas del componente
  public contactForm: FormGroupType;
  public isSubmitting: boolean = false;
  public focusedField: keyof FormFields | null = null;
  public showSuccess: boolean = false;
  public showError: boolean = false;
  public formProgress: number = 0;
  public readonly maxCommentLength: number = 280;

  // Propiedades privadas
  private readonly targetEmail: string = 'jsperdigones@gmail.com';
  private readonly successMessageDuration: number = 7000;
  private readonly errorMessageDuration: number = 5000;

  constructor(private readonly fb: FormBuilder) {
    // Inicialización del formulario con validaciones
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-]{9,}$/)]],
      cargo: ['', [Validators.required]],
      comentario: ['', [Validators.maxLength(this.maxCommentLength)]],
      aceptaComunicaciones: [false]
    }) as FormGroupType;
  }

  /**
   * Inicialización del componente
   * Suscribe a los cambios del formulario para actualizar la barra de progreso
   */
  public ngOnInit(): void {
    this.contactForm.valueChanges.subscribe(() => {
      this.updateFormProgress();
    });
  }

  /**
   * Actualiza el progreso del formulario basado en campos válidos
   * Solo considera campos requeridos para el cálculo
   */
  private updateFormProgress(): void {
    const requiredFields: Array<keyof FormFields> = ['nombre', 'email', 'telefono', 'cargo'];
    const totalFields: number = requiredFields.length;
    const validFields: number = requiredFields.filter(key => this.contactForm.get(key)?.valid).length;
    this.formProgress = Math.round((validFields / totalFields) * 100);
  }

  /**
   * Obtiene el mensaje de error para un campo específico
   * @param fieldName Nombre del campo del formulario
   * @returns Mensaje de error o cadena vacía si no hay error
   */
  public getFieldError(fieldName: keyof FormFields): string {
    const control = this.contactForm.get(fieldName);
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Este campo es requerido';
      if (control.errors['email']) return 'Email inválido';
      if (control.errors['minlength']) return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
      if (control.errors['maxlength']) return `Máximo ${this.maxCommentLength} caracteres`;
      if (control.errors['pattern']) return 'Formato inválido';
    }
    return '';
  }

  /**
   * Calcula los caracteres restantes para el campo de comentario
   */
  public getRemainingChars(): number {
    const comentario = this.contactForm.get('comentario')?.value || '';
    return this.maxCommentLength - comentario.length;
  }

  /**
   * Maneja el evento de focus en un campo
   * @param field Campo que recibe el focus
   */
  public onFieldFocus(field: keyof FormFields): void {
    this.focusedField = field;
  }

  /**
   * Maneja el evento de blur en un campo
   * @param field Campo que pierde el focus
   */
  public onFieldBlur(field: keyof FormFields): void {
    this.focusedField = null;
    const control = this.contactForm.get(field);
    if (control) control.markAsTouched();
  }

  /**
   * Determina el estado del botón de envío
   * @returns Estado actual del botón ('valid', 'invalid', o 'submitting')
   */
  public getButtonState(): 'valid' | 'invalid' | 'submitting' {
    if (this.isSubmitting) return 'submitting';
    return this.contactForm.valid ? 'valid' : 'invalid';
  }

  /**
   * Reinicia el formulario a su estado inicial
   */
  private resetForm(): void {
    this.contactForm.reset({
      aceptaComunicaciones: false
    });
    this.formProgress = 0;
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      if (control) control.setErrors(null);
    });
  }

  /**
   * Muestra el mensaje de éxito temporalmente
   */
  private showSuccessMessage(): void {
    this.showSuccess = true;
    setTimeout(() => {
      this.showSuccess = false;
    }, this.successMessageDuration);
  }

  /**
   * Muestra el mensaje de error temporalmente
   */
  private showErrorMessage(): void {
    this.showError = true;
    setTimeout(() => {
      this.showError = false;
    }, this.errorMessageDuration);
  }

  /**
   * Formatea los datos del formulario para el correo electrónico
   * @param formData Datos del formulario
   * @returns Contenido formateado para el correo
   */
  private formatEmailContent(formData: Partial<FormFields>): string {
    return `
Nuevo contacto desde el formulario:

Nombre: ${formData.nombre}
Email: ${formData.email}
Teléfono: ${formData.telefono}
Cargo: ${formData.cargo}
Comentario: ${formData.comentario || 'No proporcionado'}
${formData.aceptaComunicaciones ? 'Si, acepto recibir comunicación de servicios y eventos' : 'No acepta recibir comunicaciones'}
    `.trim();
  }

  /**
   * Envía el correo electrónico usando el cliente de correo predeterminado
   * @param emailContent Contenido del correo
   */
  private async sendEmail(emailContent: string): Promise<void> {
    try {
      const mailtoLink = `mailto:${this.targetEmail}?subject=Nuevo contacto desde formulario&body=${encodeURIComponent(emailContent)}`;
      window.location.href = mailtoLink;
      
      // Espera para asegurar que el cliente de correo tenga tiempo de abrir
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error al abrir el cliente de correo:', error);
      return Promise.reject(new Error('No se pudo abrir el cliente de correo'));
    }
  }

  /**
   * Maneja el envío del formulario
   * Valida, procesa y envía los datos del formulario
   */
  public async onSubmit(): Promise<void> {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.showSuccess = false;
      this.showError = false;
      
      try {
        const formData = this.contactForm.value;
        const emailContent = this.formatEmailContent(formData);
        
        await this.sendEmail(emailContent);
        
        this.resetForm();
        this.showSuccessMessage();
        
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        this.showErrorMessage();
      } finally {
        this.isSubmitting = false;
      }
    } else {
      // Marca todos los campos como tocados para mostrar errores
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        if (control) control.markAsTouched();
      });
    }
  }
}
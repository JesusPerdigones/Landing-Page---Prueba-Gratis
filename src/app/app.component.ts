import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Componente principal de la aplicación
 * 
 * Este componente actúa como el contenedor raíz de la aplicación y define
 * la estructura principal del layout usando un diseño de flexbox.
 * 
 * Características:
 * - Utiliza ChangeDetectionStrategy.OnPush para mejor rendimiento
 * - Layout flexible con dirección de columna
 * - Fondo con gradiente sutil
 * - Altura mínima de pantalla completa
 */
@Component({
  selector: 'app-root',
  template: `
    <div class="flex flex-col min-h-screen bg-gradient-to-b from-coolgray-10 to-defaultwhite">
      <app-header></app-header>
      <app-hero></app-hero>
      <app-contact></app-contact>
      <app-proficiency></app-proficiency>
      <app-footer></app-footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'landing-project-uniofy';
}
import { Component } from '@angular/core';

/**
 * FooterComponent displays the footer section of the application
 * Features:
 * - Dynamic current year display
 * - Copyright information
 */
@Component({
  selector: 'app-footer',
  template: `
    <footer class="bg-coolgray-90 text-coolgray-30 py-6 px-4">
      <div class="max-w-7xl mx-auto text-center text-sm">
        © {{currentYear}} Uniofy. Todos los derechos reservados. | Políticas de privacidad
      </div>
    </footer>
  `,
})
export class FooterComponent {
  /** Current year for copyright display, updated automatically */
  public readonly currentYear: number = new Date().getFullYear();
}

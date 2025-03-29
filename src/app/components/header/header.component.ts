import { Component } from '@angular/core';

/**
 * Define los tipos de elementos de navegación permitidos
 * Asegura type safety al trabajar con la navegación
 */
type NavItem = 'Inicio' | 'Beneficios' | 'Prueba gratis';

/**
 * Componente de encabezado principal
 * 
 * Gestiona la navegación principal de la aplicación con las siguientes características:
 * - Posicionamiento fijo en la parte superior
 * - Diseño responsive
 * - Navegación suave entre secciones
 * - Menú adaptativo
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  /**
   * Array de elementos de navegación
   * Readonly para prevenir modificaciones accidentales
   */
  public readonly navItems: ReadonlyArray<NavItem> = ['Inicio', 'Beneficios', 'Prueba gratis'];

  /**
   * Maneja el scroll suave hacia la sección objetivo
   * @param event Evento del click
   * @param item Elemento de navegación clickeado
   */
  public scrollToSection(event: Event, item: NavItem): void {
    event.preventDefault();
    
    const sectionId = this.getSectionId(item);
    const element = document.getElementById(sectionId);
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  /**
   * Obtiene el ID de la sección basado en el elemento de navegación
   * @param item Elemento de navegación
   * @returns ID de la sección a la que scroll
   */
  private getSectionId(item: NavItem): string {
    switch (item) {
      case 'Inicio':
        return 'home';
      case 'Beneficios':
        return 'beneficios';
      case 'Prueba gratis':
        return 'contact';
      default:
        return 'home';
    }
  }
}
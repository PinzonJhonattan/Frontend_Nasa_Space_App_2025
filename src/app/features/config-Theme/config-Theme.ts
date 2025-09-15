import { Component } from '@angular/core';
import { LayoutService } from '../../layout/services/layout.service';
import { ButtonModule } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { ColorPaletteComponent } from './color-palette/color-palette.component';
import { isDarkMode } from '../../core/utility/functions/is-dark-mode';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';

@Component({
  selector: 'app-config-theme',
  templateUrl: './config-Theme.html', 
  styleUrls: ['./config-Theme.scss'],
  standalone: true,
  imports: [ButtonModule, Tooltip, ColorPaletteComponent, FormsModule, SelectButton]
})
export class ConfigThemeComponent {
  protected readonly isDarkMode = isDarkMode;
  stateOptions: any[] = [{ label: 'Dark Mode', value: 'dark' },{ label: 'Light Mode', value: 'light' }];

  value: string = 'dark';

  constructor(private layoutService: LayoutService) {}

  ngOnInit() {
  // Verificar si hay una preferencia guardada, si no, usar dark por defecto
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'dark') {
    this.toggleDarkMode();
  } else {
    this.toggleDarkMode();
    this.toggleDarkMode();
  }
  
  // Guardar la preferencia
  localStorage.setItem('theme', savedTheme);
}

onThemeChange(event: any) {
  if (event.value === 'dark' && !this.isDarkMode()) {
    this.toggleDarkMode();
  } else if (event.value === 'light' && this.isDarkMode()) {
    this.toggleDarkMode();
  }
  
  // Guardar la preferencia del usuario
  localStorage.setItem('theme', event.value);
}

  toggleDarkMode() {
    const htmlElement = document.querySelector('html');
    const bodyElement = document.querySelector('body');
    
    htmlElement?.classList.toggle('my-app-dark');
    bodyElement?.classList.toggle('my-app-dark');
  }

  toggleColorPicker() {
    const element = document.querySelector('.nasa-color-palette-panel');
    element?.classList.toggle('nasa-show');
  }
}
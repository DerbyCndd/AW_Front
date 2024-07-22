import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-entrar',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule,RouterLink],
  templateUrl: './header-entrar.component.html',
  styleUrl: './header-entrar.component.scss'
})
export class HeaderEntrarComponent {

}

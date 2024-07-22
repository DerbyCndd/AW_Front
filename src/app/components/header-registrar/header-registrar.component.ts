import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-registrar',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule,RouterLink],
  templateUrl: './header-registrar.component.html',
  styleUrl: './header-registrar.component.scss'
})
export class HeaderRegistrarComponent {

}

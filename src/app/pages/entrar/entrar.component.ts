import { Component } from '@angular/core';
import { HeaderRegistrarComponent } from '../../components/header-registrar/header-registrar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-entrar',
  standalone: true,
  imports: [HeaderRegistrarComponent,CommonModule, RouterModule],
  templateUrl: './entrar.component.html',
  styleUrl: './entrar.component.scss'
})
export class EntrarComponent {

}

import { Component } from '@angular/core';
import { HeaderRegistrarComponent } from '../../components/header-registrar/header-registrar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [HeaderRegistrarComponent,CommonModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {

}

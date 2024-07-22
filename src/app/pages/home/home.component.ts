import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CadServiceComponent } from '../../components/cad-service/cad-service.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,CadServiceComponent,CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

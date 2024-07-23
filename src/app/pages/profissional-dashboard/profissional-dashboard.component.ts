import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-profissional-dashboard',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './profissional-dashboard.component.html',
  styleUrl: './profissional-dashboard.component.scss'
})
export class ProfissionalDashboardComponent {

}

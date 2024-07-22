import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-cad-service',
  standalone: true,
  imports: [],
  templateUrl: './cad-service.component.html',
  styleUrl: './cad-service.component.scss'
})
export class CadServiceComponent {

  @Input() image: String = "";
  @Input() title: String = "";
  @Input() price: number = 0;
  @Input() desc: String = "";
  @Input() serviceList: String[] = [];
}

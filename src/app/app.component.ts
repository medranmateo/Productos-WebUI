import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListadoProductosComponent } from "./productos/listado-productos/listado-productos.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListadoProductosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Productos-WebUI';
}

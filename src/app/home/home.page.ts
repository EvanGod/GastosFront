import { Component, OnInit } from '@angular/core';
import { GastosService } from '../services/gastos.service';
import { Router } from '@angular/router';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  gastos: any[] = [];

  constructor(private gastosService: GastosService, private router: Router) {}

  ngOnInit() {
    this.cargarGastos();
  }

  logout() {
    localStorage.removeItem('token'); // Elimina el token
    this.router.navigate(['/login']); // Redirige al login
  }

  agregarGasto() {
    this.router.navigate(['/agregar-gasto']); // Redirige a la página de agregar gasto
  }
  
  async ionViewWillEnter() {
    this.cargarGastos();
  }

  // Función para cargar los gastos del usuario y sus imágenes locales
  async cargarGastos() {
    try {
      const response: any = await this.gastosService.obtenerGastos().toPromise();
      this.gastos = await Promise.all(
        response.map(async (gasto: any) => {
          if (gasto.id) {
            gasto.imagenLocal = await this.obtenerImagenLocal(gasto.id); // Obtener imagen local
          }
          return gasto;
        })
      );
    } catch (error) {
      console.error('Error al cargar los gastos:', error);
    }
  }

  // Función para obtener la imagen local del gasto
  async obtenerImagenLocal(idGasto: number): Promise<string | null> {
    try {
      const fileName = `gastos/gasto-${idGasto}.jpeg`; // Nombre del archivo que corresponde al ID del gasto
      const file = await Filesystem.readFile({
        path: fileName,
        directory: Directory.Data, // Buscamos en el directorio Data de Capacitor
      });

      // Convertimos el archivo a una URI en base64 que podemos usar como src en una imagen
      return `data:image/jpeg;base64,${file.data}`;
    } catch (error) {
      console.error('Error al cargar la imagen local:', error);
      return null;
    }
  }
}

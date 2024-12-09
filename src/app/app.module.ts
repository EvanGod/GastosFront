import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

// Importar Ionic y los componentes necesarios
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// Importar los componentes y servicios necesarios
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule para hacer peticiones HTTP

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),  // Asegurarse de importar IonicModule
    AppRoutingModule,  // Importar AppRoutingModule para gestionar las rutas
    HttpClientModule,  // Asegurarse de importar HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, // Asegurarse de que la estrategia de rutas sea la correcta
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Agregar esta línea para manejar los componentes personalizados de Ionic
})
export class AppModule {}

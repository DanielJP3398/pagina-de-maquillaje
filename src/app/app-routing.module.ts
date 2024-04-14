import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ProductosComponent } from './components/productos/productos.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './views/home/home.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', component: InicioComponent},
      { path: 'form', component: FormularioComponent},
      { path: 'productos', component: ProductosComponent},
      { path: 'inicio', component: InicioComponent},
      {path: 'registro', component: RegistroComponent},
      {path: 'nosotros', component: NosotrosComponent}
    ]
  },
  {path: '**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

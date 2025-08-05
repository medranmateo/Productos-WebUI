import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'listadoProductos',
    pathMatch: 'full'
  },
  {
    path: 'listadoProductos',
    loadComponent: () => import('./productos/listado-productos/listado-productos.component').then(m => m.ListadoProductosComponent)
  },
  {
    path: 'addProducto',
    loadComponent: () => import('./productos/abm-productos/abm-productos.component').then(m => m.AbmProductosComponent)
  },
  {
    path: 'editProducto/:id',
    loadComponent: () => import('./productos/abm-productos/abm-productos.component').then(m => m.AbmProductosComponent)
  },
  // {
  //   path: 'productos/:id',
  //   loadComponent: () => import('./productos/detalle-producto/detalle-producto.component').then(m => m.DetalleProductoComponent)
  // },
  {
    path: '**',
    redirectTo: 'listadoProductos'
  }

];

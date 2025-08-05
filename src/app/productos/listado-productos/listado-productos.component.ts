import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../../core/services/productos.service';
import { Producto } from '../../core/models/producto';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from '../../shared/material/material.imports';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirmDialog/confirmdialog.component';
import { UtilService } from '../../core/services/util.service';

@Component({
  selector: 'app-listado-productos',
  standalone: true,
  imports: [CommonModule, ...MATERIAL_IMPORTS, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatDialogModule],
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.scss',
  providers: []
})
export class ListadoProductosComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['Codigo', 'Nombre', 'Precio', 'Stock', 'Categoria', 'Acciones'];
  productos!: Producto[];
  loading: boolean = true;
  dataSource!: MatTableDataSource<Producto>;

  constructor(
    private _productosService: ProductosService,
    private router: Router,
    private UtilService: UtilService,
    public dialog: MatDialog
  ) { }


  ngOnInit() {
    this.getProductos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getProductos() {
    this._productosService.getProductos().subscribe({
      next: (data) => {
        console.log(data);
        this.productos = data;
        this.dataSource = new MatTableDataSource(this.productos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching productos:', error);
        this.loading = false;
        this.UtilService.showSnackbar('Error al cargar los productos', 'Cerrar');
    }
    });
  }

  getProductoById(id: number) {
    this._productosService.getProductoById(id).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/productos', id]);
      }
      ,
      error: (error) => {
        console.error('Error fetching producto by ID:', error);
        this.UtilService.showSnackbar('Error al cargar el producto', 'Cerrar');
        this.loading = false;
      }
    });
  }

  addProducto() {
    this.router.navigate(['/addProducto']);
  }

  deleteProducto(product: Producto) {
    this._productosService.deleteProducto(product.id!).subscribe({
      next: (data) => {
        console.log('Producto deleted:', data);
        this.UtilService.showSnackbar('Producto eliminado correctamente');
        this.getProductos();
      }
      ,
      error: (error) => {
        console.error('Error deleting producto:', error);
        this.UtilService.showSnackbar('Error al eliminar el producto', error.message);
      }
    });
  }

  editProducto(product: Producto) {
    console.log('Editando producto con ID:', product);
    this.router.navigate(['/editProducto', product.id]);
  }


  showConfirm(producto: Producto) {
    const title = 'Confirmar eliminación';
    const message = `Se eliminara el producto: ${producto.nombre} de forma permanente.`;
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: title,
        message: message
      }
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteProducto(producto);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}

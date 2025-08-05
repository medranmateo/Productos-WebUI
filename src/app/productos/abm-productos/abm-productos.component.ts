import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../core/services/productos.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Producto } from '../../core/models/producto';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from '../../shared/material/material.imports';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilService } from '../../core/services/util.service';

@Component({
  selector: 'app-abm-productos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ...MATERIAL_IMPORTS],
  templateUrl: './abm-productos.component.html',
  styleUrl: './abm-productos.component.scss'
})
export class AbmProductosComponent  implements OnInit {

  productForm: FormGroup;
  loading    : boolean = false;
  id: number;

  operacion: string = 'Agregar';

  constructor(
    private formBuilder: FormBuilder,
    private aRoute: ActivatedRoute,
    private router: Router,
    private UtilService: UtilService,
    private _productoService: ProductosService,
  )
  {
    this.productForm = this.formBuilder.group({
      codigo   : ['', Validators.required],
      nombre   : ['', Validators.required],
      categoria: ['', Validators.required],
      stock    : [0, [Validators.required, Validators.min(0)]],
      precio   : [0, [Validators.required, Validators.min(0)]],
    });
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {

    if (this.id !== 0) {
      this.operacion = 'Editar';
      this.getProducto(this.id);
    }

  }

  getProducto(id: number){
    this.loading = true

    this._productoService.getProductoById(id).subscribe(prod =>{
      this.productForm.setValue({
        codigo   : prod.codigo ,
        nombre   : prod.nombre ,
        categoria: prod.categoria ,
        stock    : prod.stock ,
        precio   : prod.precio
      })
      this.loading = false;
    })
  }

  addOrEditProduct(){
    // Armamos el objeto
    const producto: Producto = {
        codigo   : this.productForm.value.codigo,
        nombre   : this.productForm.value.nombre,
        categoria: this.productForm.value.categoria,
        stock    : this.productForm.value.stock,
        precio   : this.productForm.value.precio
    }

    if(this.id != 0) {
      producto.id = this.id;
      this.editProduct(this.id, producto);
    } else {
      this.addProduct(producto);
    }

    console.log(producto)
  }

  editProduct(id: number, producto: Producto) {
    this.loading = true
    this._productoService.updateProducto(id, producto).subscribe(() =>{
      this.loading = true;
      console.log('editado')
      this.router.navigate(['/listProductos']);
      this.UtilService.showSnackbar('Producto editado correctamente');
    }, error => {
      console.error('Error al editar el producto:', error);
      this.loading = false;
      this.UtilService.showSnackbar('Error al editar el producto', 'Cerrar');
    });
  }

  addProduct(producto: Producto) {

    if( this.productForm.valid ){
      this._productoService.createProducto(producto).subscribe(data => {
        console.log('Restrado', data)
        this.productForm.reset();
        this.router.navigate(['/listProductos']);
        this.UtilService.showSnackbar('Producto agregado correctamente');
      }, error => {
        console.error('Error al agregar el producto:', error);
        this.loading = false;
        this.UtilService.showSnackbar('Error al agregar el producto', 'Cerrar');
      });
    }

  }

}

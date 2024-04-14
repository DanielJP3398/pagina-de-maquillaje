import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any = [];
  datt: any = [];
  dett: any = [];
  nombre: any = localStorage.getItem('uss');
  canti: any = null;
  idProdSeleccionado: any = null;

  prod!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.prod = this.formBuilder.group(
      {
        canti: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        nombreProd: ['', Validators.required],
        descripcion: ['', Validators.required],
        precio: ['', Validators.required],
        fotoProd: ['', Validators.required],
        idProd: ['', Validators.required]
      });
    this.datt = {
      fkidUs: localStorage.getItem('idd'),
      fkidProd: null,
      cantidad: null
    };
    this.dett = {
      idProd: null,
      nombreProd: null,
      descripcionProd: null,
      precioProd: null,
      fotoProd: null,
    }
    // console.log(this.dett)
    //console.log(localStorage)
    //console.log(this.datt)
    this.http.get('http://localhost:3000/productos').subscribe((res: any) => {
      this.productos = res;
      //console.log(res)
      //console.log(this.datt)
    });
  }
  produpt() {
    //console.log(this.dett)
    var b = confirm("Estas seguro que desea actualizar el producto con id: " + this.dett.idProd);
    if (b == true) {
      this.http.post('http://localhost:3000/produpt', this.dett, { responseType: 'text' }).subscribe((res: any) => {
        if (res.includes('OK')) {
          alert("Producto con id: " + this.dett.idProd + " actualizado exitosamente");
          window.location.reload();
        } else {
          alert('Ocurrio un error, No se actualizaron los productos');
        }
      });
    }
  }
  delprod() {
    var a = confirm("Estas seguro que desea eliminar el producto con id: " + this.dett.idProd);
    if (a == true) {
      this.http.post('http://localhost:3000/delprod', this.dett, { responseType: 'text' }).subscribe((res: any) => {
        if (res.includes('OK')) {
          alert("Producto con id: " + this.dett.idProd + " eliiminado exitosamente");
          window.location.reload();
        } else {
          alert('Ocurrio un error, No se eliminaron los productos');
        }
      });
    }
  }

  crearprod() {
    //console.log(this.dett)
    var b = confirm("Estas seguro que desea crear el producto con nombre: " + this.dett.nombreProd);
    if (b) {
      this.http.post('http://localhost:3000/crearprod', this.dett, { responseType: 'text' }).subscribe((res: any) => {
        if (res.includes('OK')) {
          alert("Producto con nombre: " + this.dett.nombreProd + " actualizado exitosamente");
          window.location.reload();
        } else {
          alert('Ocurrio un error, No se crearon los productos');
        }
      });
    }
  }

  comprar() {
    this.datt.cantidad = parseInt(this.canti);
    var c = confirm("Estas seguro que desea comprar el producto con id: " + this.datt.fkidProd + " y la cantidad de : " + this.datt.cantidad);
    if (c && this.datt.cantidad > 0) {
      this.datt.fkidUs = parseInt(this.datt.fkidUs);
      // console.log(this.datt);
      this.http.post('http://localhost:3000/crearp', this.datt, { responseType: 'text' }).subscribe((res: any) => {
        // console.log(res)
        if (res.includes('OK')) {
          alert("Pedido realizado exitosamente para el usuario: " + this.nombre);
          this.router.navigateByUrl('inicio');
        } else {
          alert('Ocurrio un error, No se guardaron los datos');
        }
      });
    }
  }
  seleccionarProducto(prodid: any): void {
    this.idProdSeleccionado = prodid;
    this.dett.idProd = parseInt(prodid);
    //console.log(this.dett.idProd)
    alert("id de Producto: " + this.dett.idProd + " agregado");
    this.datt.fkidProd = parseInt(prodid);
    //console.log(this.datt);
  }
}

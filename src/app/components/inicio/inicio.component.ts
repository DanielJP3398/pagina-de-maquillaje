import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})

export class InicioComponent implements OnInit{
  pedidos: any = [];
  dat: any = [];
  carrusel = [
    { id: "foto1", src: "../../../assets/come1.jpg" },
    { id: "foto2", src: "../../../assets/cosme2.jpeg" },
    { id: "foto3", src: "../../../assets/cosme6.avif" },
    { id: "foto4", src: "../../../assets/cosme4.avif" },
    { id: "foto5", src: "../../../assets/cosme5.jpg" },
    { id: "foto6", src: "../../../assets/cosme3.jpg" },
    { id: "foto7", src: "../../../assets/cosme7.jpg" },
    { id: "foto8", src: "../../../assets/cosme8.jpg" },
    { id: "foto9", src: "../../../assets/cosme2.jpeg" },
    { id: "foto10", src: "../../../assets/cosme3.jpg" },
  ];

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
    this.dat = {
      uss: localStorage.getItem('uss'),
      idd: localStorage.getItem('idd'),
      //cant: 0
    };
   // console.log(localStorage)
    //console.log(this.dat)
    if (this.dat.idd > 0){
      //console.log(this.dat.idd);
      this.http.post('http://localhost:3000/pedidos', this.dat).subscribe((res: any) => {
      this.pedidos = res;
      //console.log(this.pedidos);
    });
  }
}
clear(){
  localStorage.clear();
  alert("Has Cerrado tu Sesion, seras redirigido a la pagina login");
  this.router.navigateByUrl('form');
}
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router) {}

  login!: FormGroup;

  ngOnInit(): void {
    this.login = this.formBuilder.group(
      {
        user: ['', Validators.required],
        pass: ['', Validators.required,],
        email: ['', [Validators.required, Validators.email]],
        telf: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
      }
    );
  }

  crearu() {
    if (this.login.valid) {
    const data = {
      usuario: this.login.value.user,
      clave: this.login.value.pass,
      correo: this.login.value.email,
      telf: this.login.value.telf
    };
   // console.log(this.login.value.user, this.login.value.pass, this.login.value.email, this.login.value.telf)
    this.http.post('http://localhost:3000/crearu', data, {responseType: 'text'}).subscribe((res: any) => {
   // console.log(res);
    if (res.includes('OK')) {
      alert('Datos guardados correctamente, \n sera redirigido a la pagina de Login ');
      this.router.navigateByUrl('form');
      } else {
      alert('Ocurrio un error, No se guardaron los datos');
    }
  }); 
    } else {
      alert('Hay campos inválidos en el formulario');
    }   
  } 
}
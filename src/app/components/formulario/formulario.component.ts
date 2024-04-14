import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router) { }

  login!: FormGroup;

  ngOnInit(): void {
    this.login = this.formBuilder.group(
      {
        user: ['', Validators.required],
        pass: ['', Validators.required]
      }
    )
  }

  logn() {
    if (this.login.valid) {
      const data1 = {
        usuario: this.login.value.user,
        clave: this.login.value.pass,
      };
      // console.log(this.login.value.user, this.login.value.pass);
      this.http.post('http://localhost:3000/logn', data1).subscribe((res: any) => {
        // console.log(res);
        if (res && res.length > 0 && res[0].nombreUs) {
          alert('Bienvenido al sistema ' + res[0].nombreUs + ' sera redirigido a la pagina inicio');
          localStorage.setItem('idd', res[0].idUs);
          localStorage.setItem('uss', res[0].nombreUs);
          //  console.log(localStorage);
          this.router.navigateByUrl('inicio');
        } else {
          alert('El usuario y/o la contraseña son incorrectos.');
        }
      });
    } else {
      alert('Hay campos inválidos en el formulario');
    }
  }
}





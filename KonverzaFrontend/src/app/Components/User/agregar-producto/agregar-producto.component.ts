import { CommonModule, } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatosService } from '../../../Services/datos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [
    NavbarComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css'
})
export class AgregarProductoComponent implements OnInit {

  mensaje = "";
  booleanMensaje!: boolean;
  productosForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private datosService: DatosService,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) {
    this.productosForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descrip: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      cantidad: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      usuario_id: [''],
    });

    if (this.router.url.includes("Agregar")) {
      this.mensaje = "agregar";
      this.booleanMensaje = true;

    } else {
      this.mensaje = "modificar";
      this.booleanMensaje = false;
    }
  }

  ngOnInit(): void {
    this.productosForm = this.initForm();

    const token = localStorage.getItem("authToken");
    if (token) {
      const decodificado: any = jwtDecode(token);
      const usuarioID = decodificado.sub;
      this.productosForm.patchValue({ usuario_id: Number(usuarioID) });
    } else {
      this.productosForm.patchValue({ usuario_id: 1 });
    }

    this.getDatosById();

  }

  initForm(): FormGroup {
    return this.productosForm = this.formBuilder.group({
      id: [],
      nombre: [],
      descrip: [],
      precio: [],
      cantidad: [],
      usuario_id: [],
    });
  }

  enviarProducto() {
    if (this.productosForm.valid) {
      const nuevosDatos = this.productosForm.value;
      console.log(nuevosDatos);
      this.datosService.postDatos(nuevosDatos).subscribe(
        response => {
          this.productosForm.reset();
          this.productosForm.markAsUntouched();
        },
        error => {
          if (error) { this.errorMessage = 'Revise los datos.'; }
        }
      );
    }
  }

  modificarProducto() {
    if (this.productosForm.valid) {
      const datosModifi = this.productosForm.value;
      //console.log(datosModifi)
      this.datosService.putDatos(datosModifi, datosModifi.id).subscribe(
        response => {
          this.productosForm.reset();
          this.productosForm.markAsUntouched();
        },
        error => {
          if (error) { this.errorMessage = 'Revise los datos.'; }
        }
      )
    }
    //console.log(nuevosDatos);
  }

  getDatosById(): void {
    this.activateRoute.params.subscribe
      (e => {
        let id = e['id'];
        if (id) {
          this.datosService.getDatoById(id).subscribe(
            es => {
              this.productosForm.patchValue({
                id: es.id,
                nombre: es.nombre,
                descrip: es.descrip,
                precio: es.precio,
                cantidad: es.cantidad,
                usuario_id: es.usuario_id,
              })
            }
          )
        }
      });
  }

}

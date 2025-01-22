import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { DatosService } from '../../../Services/datos.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Inventario } from '../../../Interfaces/inventario';
import { Datos } from '../../../Interfaces/datos';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movimientos-producto',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './movimientos-producto.component.html',
  styleUrl: './movimientos-producto.component.css'
})
export class MovimientosProductoComponent implements OnInit {

  datosList: Datos[] = [];
  datosTable: Inventario[] = [];

  movimientosForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private datosService: DatosService,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) {
    this.movimientosForm = this.formBuilder.group({
      producto: ['', [Validators.required]],
      movimiento: ['', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.pattern(/^\d+$/)],]
    });
  }

  ngOnInit(): void {
    this.getDatos();
  }

  initForm(): FormGroup {
    return this.movimientosForm = this.formBuilder.group({
      producto: [],
      movimiento: [],
      cantidad: []
    });
  }

  getDatos() {
    this.datosService.getDatos().subscribe({
      next: (data) => {
        this.datosList = data;
      },
      error: (err) => {
        console.log("Erroor", err);
      }
    });
    this.datosService.getInventario().subscribe({
      next: (data2) => {
        this.datosTable = data2;
      },
      error: (err) => {
        console.log("Erroor", err);
      }
    })
  }

  enviarProducto(): void {
    if (this.movimientosForm.valid) {
      const nuevosDatos = this.movimientosForm.value;
      // Obtiene información del producto seleccionado
      this.datosService.getDatoById(Number(nuevosDatos.producto)).subscribe({
        next: (producto) => {

          switch (nuevosDatos.movimiento) {
            case 'Agregar':
              const nuevaCantidad = nuevosDatos.cantidad + producto.cantidad;

              const data = {
                cantidad: nuevaCantidad
              };

              this.datosService.putHabastecerProducto(data, producto.id).subscribe({
                next: (response) => {
                  this.movimientosForm.reset();
                  this.movimientosForm.markAsUntouched();
                  console.log('Producto abastecido con éxito:', response);

                  // Agregar un dato a otra tabla después de actualizar el producto
                  const logData = {
                    accion: "Se re habasteció el producto: " + producto.nombre + " con " + nuevosDatos.cantidad + " agregados",
                    producto_id: Number(nuevosDatos.producto),
                    ganancia: 0,
                  };
                  console.log(logData);
                  this.datosService.postMovimiento(logData).subscribe({
                    next: (logResponse) => {
                      console.log('Log de movimiento agregado con éxito:', logResponse);
                      window.location.reload();
                    },
                    error: (logError) => {
                      console.error('Error al agregar el log de movimiento:', logError);
                    }
                  });

                },
                error: (error) => {
                  console.error('Error al abastecer el producto:', error);
                }
              });
              break;
            case 'Vender':
              if (nuevosDatos.cantidad > producto.cantidad) {
                console.log("La cantidad vendida es más que la existente")
                this.movimientosForm.invalid;
                break;
              }

              const cantidadRestante = producto.cantidad - nuevosDatos.cantidad;
              const ganancia = nuevosDatos.cantidad * producto.precio;

              const dataVender = {
                cantidad: cantidadRestante
              };

              //Se usa el mismo put para modificar la cantidad existente.
              this.datosService.putHabastecerProducto(dataVender, producto.id).subscribe({
                next: (response) => {
                  this.movimientosForm.reset();
                  this.movimientosForm.markAsUntouched();
                  console.log('Producto vendido con éxito:', response);

                  // Agregar un dato a otra tabla después de actualizar el producto
                  const logData = {
                    accion: "Se vendieron: " + nuevosDatos.cantidad + " productos de " + producto.nombre,
                    producto_id: Number(nuevosDatos.producto),
                    ganancia: ganancia,
                  };
                  console.log(logData);
                  this.datosService.postMovimiento(logData).subscribe({
                    next: (logResponse) => {
                      console.log('Log de movimiento agregado con éxito:', logResponse);
                      window.location.reload();
                    },
                    error: (logError) => {
                      console.error('Error al agregar el log de movimiento:', logError);
                    }
                  });

                },
                error: (error) => {
                  console.error('Error al abastecer el producto:', error);
                }
              });
              break;
            case 'Retirar':
              if (nuevosDatos.cantidad > producto.cantidad) {
                console.log("La cantidad vendida es más que la existente")
                this.movimientosForm.invalid;
                break;
              }

              const despachar = producto.cantidad - nuevosDatos.cantidad;

              const dataDespacho = {
                cantidad: despachar
              };

              //Se usa el mismo put para modificar la cantidad existente.
              this.datosService.putHabastecerProducto(dataDespacho, producto.id).subscribe({
                next: (response) => {
                  this.movimientosForm.reset();
                  this.movimientosForm.markAsUntouched();
                  console.log('Producto retirado con éxito:', response);

                  // Agregar un dato a otra tabla después de actualizar el producto
                  const logData = {
                    accion: "Se retiraron: " + nuevosDatos.cantidad + " productos de " + producto.nombre,
                    producto_id: Number(nuevosDatos.producto),
                    ganancia: 0,
                  };
                  console.log(logData);
                  this.datosService.postMovimiento(logData).subscribe({
                    next: (logResponse) => {
                      console.log('Log de movimiento agregado con éxito:', logResponse);
                      window.location.reload();
                    },
                    error: (logError) => {
                      console.error('Error al agregar el log de movimiento:', logError);
                    }
                  });

                },
                error: (error) => {
                  console.error('Error al abastecer el producto:', error);
                }
              });
              break;

          }
        },
        error: (error) => {
          console.error('Error al obtener el producto', error);
        }
      });
    } else {
      console.warn('Formulario no válido');
    }
  }

}

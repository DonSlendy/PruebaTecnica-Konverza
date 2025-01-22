import { Component, OnInit } from '@angular/core';
import { RouterLink} from '@angular/router';
import { DatosService } from '../../../Services/datos.service';
import { Datos } from '../../../Interfaces/datos';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-user',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    FormsModule,
    CommonModule
  ],
  templateUrl: './inicio-user.component.html',
  styleUrl: './inicio-user.component.css'
})
export class InicioUserComponent implements OnInit {

  datosList: Datos[] = [];
  productoNobre!: any;
  productoID!: number | null;

  datosFiltrados: any[] = [];
  searchText: string = '';

  constructor(
    private datosService: DatosService,
  ) {

  }

  ngOnInit(): void {
    this.getDatos();
    this.datosFiltrados = [...this.datosList];

  }

  getDatos() {
    this.datosService.getDatos().subscribe({
      next: (data) => {
        this.datosList = data;
        this.datosFiltrados = data;
      },
      error: (err) => {
        console.log("Erroor", err);
      }
    })
  }

  datosParaModal(productoId: number) {
    this.datosService.getDatoById(productoId).subscribe({
      next: (producto) => {
        this.productoNobre = producto.nombre;
        this.productoID = producto.id;
      },
      error: (error) => {
        console.error('Error del producro', error);
      }
    });
  }

  eliminarID() {
    this.productoID = null;
  }

  eliminarProducto() {
    const id = this.productoID;
    if (id) {
      //this.router.navigate(['/InicioUser']);

      this.datosService.deleteDatos(id).subscribe(
        response => {
          console.log('Datos eliminados correctamente:', response);
          window.location.reload();
        },
        error => {
          console.error('Error al eliminar los datos:', error);
        }
      )
    }
  }

  filtrarDatos() {
    const lowerSearch = this.searchText.toLowerCase();
    this.datosFiltrados = this.datosList.filter((item) =>
      Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(lowerSearch)
    );
  }

  trackByIndex(index: number, item: any) {
    return index;
  }

}

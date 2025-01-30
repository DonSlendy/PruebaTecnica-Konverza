import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { InicioUserComponent } from './Components/User/inicio-user/inicio-user.component';
import { AuthGuard } from './Guards/auth.guard';
import { AgregarProductoComponent } from './Components/User/agregar-producto/agregar-producto.component';
import { MovimientosProductoComponent } from './Components/User/movimientos-producto/movimientos-producto.component';
import { ModalComponent } from './Components/User/modal/modal.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: "login", component: LoginComponent },
    { path: "modal", component: ModalComponent },

    { path: "InicioUser", component: InicioUserComponent, canActivate: [AuthGuard] },
    { path: "AgregarProducto", component: AgregarProductoComponent, canActivate: [AuthGuard] },
    { path: "ModificarProducto/:id", component: AgregarProductoComponent, canActivate: [AuthGuard] },
    { path: "MovimientosProducto", component: MovimientosProductoComponent, canActivate: [AuthGuard] },

];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { OrdernowComponent } from './ordernow/ordernow.component';
import { RegisterComponent } from './register/register.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    component:HomeComponent,
    path:''
  },
  {
    component:OrdernowComponent,
    path:'ordernow',
  },
  {
    component:MenuComponent,
    path:'menu'
  },
  {
    component:ReservationsComponent,
    path:'reservations'
  },
  {
    component:AboutusComponent,
    path:'aboutus'
  },
  {
    component:RegisterComponent,
    path:'register'
  },
  {
    component:LoginComponent,
    path:'login'
  },
  {
    component:CheckoutComponent,
    path:'checkout'
  },
  {
    path:'users',
    component:UsersComponent,
  },
  {
    path:'users/:username',
    component:UsersComponent,
  },
  {
    path:'forgotpassword',
    component:ForgotpasswordComponent,
  },
  {
    path:'',
    redirectTo:'',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

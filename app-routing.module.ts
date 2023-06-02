import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './employees/employees.component';
import { FooditemsComponent } from './fooditems/fooditems.component';
import { OrdersComponent } from './orders/orders.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddcustomerComponent } from './customers/addcustomer/addcustomer.component';
import { EditcustomerComponent } from './customers/editcustomer/editcustomer.component';
import { CustomerlistComponent } from './customers/customerlist/customerlist.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path:'', component: LoginComponent},
  { path:'dashboard', component: DashboardComponent },
  {
    path: 'customers',
    component: CustomersComponent,
    children: [
      { path: 'addcustomer', component: AddcustomerComponent },
      { path: 'customerlist', component: CustomerlistComponent },
      { path: 'editcustomer/:customerId', component: EditcustomerComponent },
    ]
  },
  { path: 'employees', component: EmployeesComponent },
  { path: 'fooditems', component: FooditemsComponent },
  { path: 'orders', component: OrdersComponent, canActivate:[authGuard] },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'login', component: LoginComponent},  // don't guard the route here
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

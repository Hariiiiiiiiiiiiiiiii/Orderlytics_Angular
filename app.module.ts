import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './employees/employees.component';
import { FooditemsComponent } from './fooditems/fooditems.component';
import { OrdersComponent } from './orders/orders.component';
import { InfocardsComponent } from './dashboard/infocards/infocards.component';
import { InfopanelComponent } from './dashboard/infopanel/infopanel.component';
import { BestsellersComponent } from './dashboard/infopanel/revenue-bestsellers/bestsellers.component';
import { SaleschartComponent } from './dashboard/infopanel/saleschart/saleschart.component';
import { CardComponent } from './dashboard/card/card.component';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PastEmployeesComponent } from './employees/past-employees/past-employees.component';
import { CustomerlistComponent } from './customers/customerlist/customerlist.component';
import { AddcustomerComponent } from './customers/addcustomer/addcustomer.component';
import { EditcustomerComponent } from './customers/editcustomer/editcustomer.component';
import { SearchComponent } from './customers/customerlist/search/search.component';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { RippleModule } from 'primeng/ripple';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { CustomersService } from 'src/app/services/customers.service';
import { InfoComponent } from './orders/info/info.component';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    DashboardComponent,
    EmployeesComponent,
    FooditemsComponent,
    OrdersComponent,
    InfocardsComponent,
    InfopanelComponent,
    BestsellersComponent,
    SaleschartComponent,
    CardComponent,
    LoginComponent,
    RegisterComponent,
    PastEmployeesComponent,
    CustomerlistComponent,
    AddcustomerComponent,
    EditcustomerComponent,
    SearchComponent,
    InfoComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    TableModule,
    ToastModule,
    ButtonModule,
    FormsModule,
    MessageModule,
    DropdownModule,
    RippleModule,
    BrowserAnimationsModule,
    AutoCompleteModule
  ],
  providers: [CustomersService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-infocards',
  templateUrl: './infocards.component.html',
  styleUrls: ['./infocards.component.css']
})
export class InfocardsComponent implements OnInit{
  
  totalCustomers : number = 0;
  totalFoodItems : number = 0;

  ngOnInit(){

  }

}

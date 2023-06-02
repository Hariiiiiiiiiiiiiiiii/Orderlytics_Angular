import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public showNavigationBar: boolean = true;

  constructor(private router: Router,
              private messageService: MessageService) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavigationBar = !(event.url === '/login' || event.url === '/register');
      }
    });
  }

  logout(){
    
    if(localStorage.getItem('token')){
      localStorage.removeItem('token');
    }

    const delay = 1000;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logged out successfully' });

    setTimeout(() => {
      this.router.navigate(['login']);  // always takes to the absolute path
      }, delay);
  }
}
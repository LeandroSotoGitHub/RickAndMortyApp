import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  loginData = JSON.parse(sessionStorage.getItem('loginData') || '{}');
  name = this.loginData.user.name
  
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  
  constructor(private router: Router){}
  logout(){
    sessionStorage.removeItem('loginToken')
    this.router.navigate(['/login'])
  }

}

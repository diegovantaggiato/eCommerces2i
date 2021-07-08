import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token: boolean

  constructor() {
  }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
    console.log(token);

    if(!token){ this.token = false}
    else this.token = true
  }



}

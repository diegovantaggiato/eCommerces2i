import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  invalidLogin: boolean = false;
  invalidParameters: boolean = false;
  accounts; // account esistenti nel db
  dbRef = this.service.getAccounts() // db ref
  key; //variabile di appoggio per ottenere chiave valore
  sign: boolean = false; // booleano per switchare tra sign in e sign up
  isLogged$: boolean = false; // controllo se utente è loggato
  checkAccount: boolean; // controllo se account esiste già

  constructor(private router:Router,
              private service: AuthServiceService
              ) { }


  ngOnInit(): void {
    this.dbRef
      .on('value', (snap) => {
          let accounts = [];
          snap.forEach((child) => {
            accounts.push({
              key: child.key,
              value: child.val()
            });
          });
          this.accounts = accounts
        });
        this.isLogged()
  }

  signIn(credentials) {
   this.accounts.forEach(el => {
    if(el.value.email == credentials.email && el.value.password == credentials.password){
      localStorage.setItem('token', el.value.uid)
      this.router.navigate(['/'])
    } else this.invalidLogin = true
  });
}


  signUp(credentials){
    if(credentials.email != '' || credentials.password != ''){
      for(let i = 0; i < this.accounts.length; i++) {
        if(this.accounts[i].value.email == credentials.email ){
          this.checkAccount = true
        } else { this.checkAccount = false }
      }

      if(this.checkAccount == false){
          this.dbRef.ref.push(credentials)
          .then((snap) => {
            this.key ={
              uid: snap.key,
              email: credentials.email,
              password: credentials.password
              }
            this.service.addAccounts(this.key)
          })
          this.router.navigate(['/'])
      }
  } else this.invalidParameters = true;

  }

  // switch tra signin e signup
  change(){
    this.sign = !this.sign
  }

  //check sul login
  isLogged() {
    let token = localStorage.getItem('token')
    if(token) this.isLogged$= true
    else this.isLogged$ = false

  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
}



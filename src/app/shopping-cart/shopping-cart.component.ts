import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { GetProductsService } from '../services/get-products.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  dbRef;
  token= localStorage.getItem('token'); // ottieni token
  dbrefProducts= this.serviceProducts.getData()
  account; // utente loggato
  products; // prodotti nel carrello
  shoppingCart = this.serviceProducts.addToCart(this.token)
  totCart = 0;

  constructor(private service: AuthServiceService, private serviceProducts: GetProductsService) { }

  ngOnInit(): void {
    this.dbRef = this.service.getAccounts() // ottengo dati account specifico
    this.dbRef.on('value', (snap) => {
    //  this.spinner = false;
      const accounts = [];
      snap.forEach((child) => {
          if(child.key == this.token && this.token != null){
          accounts.push({
            key: child.key,
            value: child.val()
          });
        }
      });
     this.account = accounts;

     // ottengo prodotti
     this.dbrefProducts.on('value', (snap) => {
      const products = [];
      for(var i in this.account[0].value.shoppingCart){
       snap.forEach((child) => {
          if(this.account[0].value.shoppingCart[i].productId == child.key){
            let price = child.val()
            this.totCart = this.totCart + Number(price.price) // tot carrello
            //console.log(this.totCartArr);
            products.push({
              key: child.key,
              value: child.val()
            })
          }
        })
        this.products = products
      }
     })
    });

  }

  removeFromShoppingCart(productId) {

    for(var i in this.account[0].value.shoppingCart){

      if(this.account[0].value.shoppingCart[i].productId == productId ){
        this.totCart = 0;
        let prodToDelete = i;
        this.serviceProducts.removeFromCart(this.token, prodToDelete)
        break;
      }
    }
  }

}

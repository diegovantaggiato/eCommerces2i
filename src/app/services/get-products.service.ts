import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {

  constructor(private db: AngularFireDatabase) { }

  getData() {
    return firebase.database().ref('products')
  }

  addToCart(key){
    return firebase.database().ref('accounts/'+ key + "/shoppingCart")
  }

  removeFromCart(idAccount, id){
    //return firebase.database().ref('accounts/'+ idAccount + "/shoppingCart/")
    this.db.object('accounts/' + idAccount + '/shoppingCart/' + id).remove()
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { GetProductsService } from '../services/get-products.service';

@Component({
  selector: 'app-right-page',
  templateUrl: './right-page.component.html',
  styleUrls: ['./right-page.component.css']
})
export class RightPageComponent implements OnInit {
  constructor(private db: AngularFireDatabase,
              private route: ActivatedRoute,
              private router: Router,
              private _location: Location,
              private service: GetProductsService) { }

  product;
  productDetail; // dettagli generali prodotto
  productTechnical; // variabile d'appoggio
  techList= [] // lista specifiche tecniche
  spinner: boolean = true;
  deleteButton: boolean = false;
  id = this.route.snapshot.paramMap.get('id')
  token= localStorage.getItem('token')
  buyButton = this.service.addToCart(this.token)

  ngOnInit(): void {
    this.db.object('products/' + this.id)
    .valueChanges()
    .subscribe(response => {
      this.spinner = false
      this.product = response
      /* svuoto array */
      this.techList = []
      this.productDetail = this.product
      console.log(this.product);

      /* lista specifiche tecniche */
      this.productTechnical = this.product.technical

      let token = localStorage.getItem('token')
      if(this.productDetail.createdBy == token && token != ''){
        this.deleteButton = true
      }

      let obj = JSON.parse(JSON.stringify(this.productTechnical))
      let test = []
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          this.techList.push({
            key: key,
            value: obj[key]
          })
        }
      }
      })
    }

    //Funzione per tornare alla pagina precedente
    backClicked(){
      this._location.back();
    }


    deleteProduct() {
      this.db.object('products/' + this.id).remove()
      this.router.navigate(['/'])
    }

    addToShoppingCart(productId) {

      console.log(productId);

      if(this.token == null){
        this.router.navigate(['/login'])
      } else {
        let prodToCart = {productId : this.id}
        this.buyButton.push(prodToCart)
        window.alert('Prodotto aggiunto al carrello!')
      }

    }
}

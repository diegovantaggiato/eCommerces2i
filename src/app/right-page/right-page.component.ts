import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-right-page',
  templateUrl: './right-page.component.html',
  styleUrls: ['./right-page.component.css']
})
export class RightPageComponent implements OnInit {
  constructor(private db: AngularFireDatabase,
              private route: ActivatedRoute) { }

  product;
  productDetail; // dettagli generali prodotto
  productTechnical; // variabile d'appoggio
  techList= [] // lista specifiche tecniche
  spinner: boolean = true;

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')
    this.db.object('products/' + id)
    .valueChanges()
    .subscribe(response => {
      this.spinner = false
      this.product = response
      //console.log(this.product);
      /* svuoto array */
      this.techList = []
      this.productDetail = this.product
      /* lista specifiche tecniche */
      this.productTechnical = this.product.technical
      console.log(this.productDetail);

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

}

import { Component, Input, OnInit } from '@angular/core';
import { GetProductsService } from '../services/get-products.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  @Input() products; // prodotti
  productDetail; // dettagli generali prodotto
  productTechnical; // variabile d'appoggio
  techList= [] // lista specifiche tecniche
  detail: boolean = false; // booleano per far apparire div dettaglio prodotto
  spinner: boolean = true;
  filteredProducts;

  constructor(private service: GetProductsService) { }


  dbRef = this.service.getData()
  ngOnInit(): void {
    this.dbRef.on('value', (snap) => {
      this.spinner = false;
      const items = [];
      snap.forEach((child) => {
        items.push({
          key: child.key,
          value: child.val()
        });
      });
     this.filteredProducts = this.products = items;
    });
  }

  getDetail(product){
    /* svuoto array */
    this.techList = []
    this.productDetail = product
    this.detail = true
    /* lista specifiche tecniche */
    this.productTechnical = product.value.technical
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
  }

  filterProduct(query) {
    this.filteredProducts = (query) ?
    this.products.filter(p => p.value.name.toLowerCase().includes(query.toLowerCase())) :
    this.products;
  }

}

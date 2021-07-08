import { Component, OnInit } from '@angular/core';
import { GetProductsService } from '../services/get-products.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  product = {
    technical:{}
  }; // variabile da pushare nel database
  customDiv: boolean = false
  arrayInput: any[] = []; // array per aggiungere riga di tech. elements
  button: boolean = false

  constructor( private service: GetProductsService) { }

  dbRef= this.service.getData();


  ngOnInit(): void {
  }


  // inserire i technical elements del form nell'oggetto product
  addProduct(form){
    let obj = JSON.parse(JSON.stringify(form))

    for(var key in form){
      this.product[key]= obj[key]
    }
  }

  // Mostra div technical elements
  unlockTech(){
    let verifyLength = this.arrayInput.length + 1;
    this.arrayInput.push(verifyLength)

    this.button = true
    this.customDiv = true
  }

  // aggiungere riga specifiche tecniche e aggiunge quella precedente nell'oggetto
  addInput(key, value){

    let objKey = key.value;
    let objValue = value.value;
    this.product.technical[objKey] = objValue

    let verifyLength = this.arrayInput.length + 1;
    this.arrayInput.push(verifyLength)

    this.button = true
  }

  delete(key){
    let keyToDelete: string =key.value;
    delete this.product.technical[keyToDelete]
    this.arrayInput.splice(key.name, 1)
  }


  enableCustom(){
    this.customDiv = true
  }

  send(){
    console.log(this.product);

   this.dbRef.push(this.product)
  }

}

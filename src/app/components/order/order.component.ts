import { Component } from '@angular/core';
import { Icategory } from '../../models/icategory';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '../products/products.component';
import { Iproduct } from '../../models/iproduct';
import { IdFormatPipe } from '../../pipes/id-format.pipe';
import { CreditCardFormatPipe } from '../../pipes/credit-card-format.pipe';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, CommonModule, ProductsComponent, IdFormatPipe, CreditCardFormatPipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  totalOrderPrice :number =0;
  categories:Icategory[];
  selectedCatId:number=0;
  productsBought: Iproduct[] = [];
  constructor(){
    this.categories=[
      {id:10, name:"Mobiles"},
      {id:20,name:"Laptops"},
      {id:30,name:"Tablets"}
    ];
    //private _StaticProductService: StaticProductService
    //this.productsBought=this._StaticProductService.products;
  }

sendProduct(product: Iproduct) {
  const existingProduct = this.productsBought.find(p => p.id === product.id);
  

  if (existingProduct) {
    existingProduct.quantity++;
    existingProduct.price = product.price * existingProduct.quantity;
    this.totalOrderPrice += existingProduct.price;
  } else {
    this.productsBought.push({ ...product, quantity: 1 }); 
  }
  
}


// ngOnChange() {
//   this.totalOrderPrice += this.existingProduct.price;
// }

  removeProduct(product: Iproduct) {
    const existingProduct = this.productsBought.find(p => p.id == product.id);
    if (existingProduct) {
      existingProduct.price -= product.price;
      existingProduct.quantity--; 
      if (existingProduct.quantity == 0) {
       
        const index = this.productsBought.indexOf(existingProduct);
        this.productsBought.splice(index, 1);
      } else {
        
        existingProduct.price = product.price * existingProduct.quantity;
      }
      this.totalOrderPrice += existingProduct.price;
    }
  }
}

import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardDirective } from '../../directives/product-card.directive';
import { Router, RouterLink } from '@angular/router';
import { StaticProductService } from '../../services/static-product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardDirective,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnChanges {

  totalOrderPrice :number =0;
  filteredProducts: Iproduct[];
  @Input() receivedCatId:number=0;
   
    @Output() onProductBought: EventEmitter<Iproduct> 
    constructor(private _staticProductsService:StaticProductService,private router:Router){
   
     this.onProductBought=new EventEmitter<Iproduct>();
      this.filteredProducts=this._staticProductsService.products;
    }
    ngOnChanges(){
      console.log(this.receivedCatId)
      if(this.receivedCatId == 0){
        this.filteredProducts = this._staticProductsService.products;
      } else {
        this.filteredProducts = this._staticProductsService.getProductByCatId(this.receivedCatId);
      }
    }
    buyProduct(product: Iproduct) {
      if (product.quantity > 0) {
        product.quantity--;
        this.totalOrderPrice +=product.quantity *product.price;
      }
      //fire event
      this.onProductBought.emit(product);
    }
    
    // filterProducts(){
    //   if(this.receivedCatId==0){
    //     this.filteredProducts=this.products;
    //   }else{
    //     this.filteredProducts=this.products.filter((item)=>item.categoryID==this.receivedCatId);
    //   }
    // }
  
    navigateToDetailes(id:number){
      // this.router.navigate(['/details']);
       this.router.navigateByUrl( `/details/${id}`);
    }
  }
  
  
  
  
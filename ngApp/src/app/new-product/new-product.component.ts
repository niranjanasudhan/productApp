import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { ProductModel } from '../product-list/product.model';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
title:String="Add Product";
  constructor(private productService:ProductService,private router:Router,private fb:FormBuilder) { }

  newProductForm=this.fb.group(
    {
      p_id:['',[Validators.required,Validators.pattern("^-?[0-9]\\d*(\\.\\d{1,4})?$")]],
      p_name:['',[Validators.required]],
      p_code:['',[Validators.required]],
      p_date:['',[Validators.required]],
      p_desc:['',[Validators.required]],
      p_price:['',[Validators.required,Validators.pattern("^-?[0-9]\\d*(\\.\\d{1,4})?$")]],
      p_rating:['',[Validators.required,Validators.pattern("^-?[0-9]\\d*(\\.\\d{1,4})?$")]],
      p_image:['',[Validators.required,Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")]]
    }
  )


  productItem=new ProductModel(null,null,null,null,null,null,null,null);

  ngOnInit(): void {
  }
  AddProduct()
  {
    this.productService.newProduct(this.productItem);
    console.log("Called");
    alert("success");
    this.router.navigate(['/product']);
  }

}

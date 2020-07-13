import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';
import { ProductModel } from '../product-list/product.model';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  title:String="Edit Product";
  _id:String;
  private sub:any;
  products:ProductModel[];
  constructor(private productService:ProductService,private router:Router,private route: ActivatedRoute,private fb:FormBuilder) { }

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
  // productItemEdit=new ProductModel(null,null,null,null,null,null,null,null);
  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this._id = params['id'];
    //   console.log(this._id);
    // });

    this.sub = this.route.params.subscribe(params => {
      this._id = params['id']; // (+) converts string 'id' to a number
console.log(this._id+"current Id");
      // In a real app: dispatch action to load the details here.
   });
  //  map._id = new ObjectID.createFromHexString( map._id);
     this.productService.getEditProducts(this._id).subscribe((data)=>{
     var productsdata=JSON.parse(JSON.stringify(data));
     console.log(productsdata);
     this.productItem.productId=productsdata.productId;
     this.productItem.productName=productsdata.productName;
     this.productItem.productCode=productsdata.productCode;
     this.productItem.description=productsdata.description;
     this.productItem.releaseDate=productsdata.releaseDate;
     this.productItem.price=productsdata.price;
     this.productItem.starRating=productsdata.starRating;
     this.productItem.imageUrl=productsdata.imageUrl;
     
     console.log(productsdata.productName);
      
    })
   
  }
  EditProduct()
  {
    console.log(this._id);
    this.productService.editProduct(this.productItem,this._id);
    console.log("Called");
    alert("success");
    this.router.navigate(['/product']);
  }
}

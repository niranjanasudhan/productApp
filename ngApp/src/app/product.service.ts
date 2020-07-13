import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  getProducts()
  {
    return this.http.get('http://localhost:3000/api/products');
  }
  newProduct(item)
  {
    return this.http.post('http://localhost:3000/api/insert',{"product":item})
    .subscribe(data=>{console.log(data)})
  }
  getEditProducts(item)
  {
    console.log(item);
   
    let params = new HttpParams();
    params = params.append('_id', item);
   

//this.http.get('http://localhost:63203/api/CallCenter/GetSupport', { headers: headers, search: params })
 return this.http.get('http://localhost:3000/api/product', {params: params});
  }
  editProduct(item,id)
  {
    return this.http.post('http://localhost:3000/api/update',{"product":item,"id":id})
    .subscribe(data=>{console.log(data)})
  }
  deleteProductData(id)
  {
    return this.http.post('http://localhost:3000/api/delete',{"id":id})
    .subscribe(data=>{console.log(data)})
  }
}

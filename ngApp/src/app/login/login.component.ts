import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
// import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginUserDetails={email:'',password:''};
  constructor(private _auth:AuthService,private _router:Router,private fb:FormBuilder) { 
    
  }



  loginForm=this.fb.group(
    {
      // email:['',[Validators.required,Validators.pattern('')]],
      // password:['',[Validators.required,Validators.minLength(6)]]

      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password:['',[Validators.required,Validators.minLength(6)]]
    }
  )

  loginUser(){
    console.log("login details");
    console.log(this.loginUserDetails);
    this._auth.loginUser(this.loginUserDetails)
  .subscribe(
    res =>
    {
      console.log(res.token);
       localStorage.setItem('token', res.token)
      this._router.navigate(['/product'])
    },
    err=>console.log(err)
  )
  }

  ngOnInit(): void {
  }

}

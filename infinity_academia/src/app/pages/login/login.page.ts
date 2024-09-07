import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  screen: any = 'signin'
  formData: FormGroup;
  isLoading: boolean = false;


  constructor(
    private fb:FormBuilder,
    private auth: AuthService
  ) {
    this.formData = this.fb.group({
      name: ['',[Validators.required]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]],
    })
   }

  ngOnInit() {
    ''
  }

  change(event: string){
    this.screen = event;
  }

  login(){
    var formData: any = new FormData();
    if(this.formData.valid){
      this.isLoading = true;
      // formData.append('email', this.formData.get('email').value);
      // formData.append('password', this.formData.get('password').value);
      console.log(this.formData);
    //   this.auth.userLogin(formData).subscribe((data:any)=>{
    //     console.log(data);
    // });
    }
  }
  


}

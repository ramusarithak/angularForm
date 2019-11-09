import { Component, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, PatternValidator } from '@angular/forms'

import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  FormBuilder: any;
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef

  ) { }

@ViewChild('fileInput', { static: false })  el: ElementRef;
  imageUrl: any = '/assets/ir.png';
  editFile: boolean = true;
  removeUpload: boolean = false;
  // city select
  City: any = ['Tamilnadu', 'Delhi', 'Mumbai', 'AndraPradesh']
  registrationForm = this.fb.group({
    address: this.fb.group({
      city: ['']
    })
  })

  changeCity(e) {
    this.registrationFor.get('address.cityName').setValue(e.target.value, {
      onlySelf: true
    })
  }


  // 2 start


  // registrationForm = this.fb.group({
  //   file: [null]

  // })  


  

  uploadFile(event) {
    let reader = new FileReader();
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);


      reader.onload = () => {
        this.imageUrl = reader.result;
        this.registrationForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }

      this.cd.markForCheck();
    }
  }

  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = '/assets/ir.png';
    this.editFile = true;
    this.removeUpload = false;
    this.registrationForm.patchValue({
      file: [null]
    });
  }


  // 2 end


  // 1 start

  // constructor(public fb:FormBuilder){}
  registrationFor = this.fb.group({
    file: [null],
    fullname: this.fb.group({
      firstname: [''],
      lastname: ['']
    }),

    email: [''],
    phoneNumber: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      cityName: ['']
    }),
    gender: [''],
    passwordValidation: this.fb.group({
      password: [''],
      confirmPassword: ['']
    }),
    addDynamicElements: this.fb.array([])
  });

  onSubmit() {
    console.log("your form submited successfully");
    let emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    this.registrationForm=this.FormBuilder.group({
      
      Name:['',Validators.required],
      Email:['',Validators.required,Validators.pattern(emailRegEx)],
      Password:['',Validators.required],
      ConfirmPassword:['',Validators.required]
    })
  }
}
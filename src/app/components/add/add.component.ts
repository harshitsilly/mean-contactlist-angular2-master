import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms/src/directives';
import { Subscription } from 'rxjs/Rx';
import { concat } from 'rxjs/observable/concat';
import { Component, OnInit, ViewChild } from '@angular/core';

import {ContactService} from '../../services/contact.service'
import {Contact} from '../../Contact';
@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls:['./add.component.css']
})
export class AddComponent implements OnInit   {

    contact: Contact;
    bMobileAlreadyPresent:boolean;
    
    constructor(private router:Router ,private contactService: ContactService){
        this.contactService.bMobileNumberAlreadyPresent.subscribe(
            flag => {this.bMobileAlreadyPresent  = flag}
        );
    }
    
    myForm: FormGroup;

    ngOnInit(){
        this.myForm = new FormGroup({
            ImageUrl: new FormControl(null),
            Name: new FormControl(null, [
                Validators.required,
                Validators.minLength(1)
            ]),
            Number: new FormControl(null, [
                Validators.required
               
            ]),
            Email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            bFavourite: new FormControl(null)

        });

         var numbersOnly = (<HTMLInputElement>document.getElementById("numbersOnly"));
         numbersOnly.onkeyup = function myFunction() {
             
             numbersOnly.value = numbersOnly.value.replace(/[^0-9]/g, '');
         };
     }
    

    onSubmit(myForm: NgForm){
        var data = this.myForm.value;
        data.Number = parseInt(data.Number);
        
        
        this.contactService.addContact(data).subscribe(
            saved => {
                this.contactService.addContactToContactList(saved.obj);
            },
            error => {}
        );
        this.router.navigate(['/Main']);
    }

    onCancel(){
        this.router.navigate(['/Main']);
    }



    
       

}
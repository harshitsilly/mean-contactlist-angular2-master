import { NgForm } from '@angular/forms/src/directives';

import { Subscription } from 'rxjs/Rx';
import { concat } from 'rxjs/observable/concat';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../Contact';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls:['./edit.component.css']
})
export class EditComponent implements OnInit{ 
    
    bMobileAlreadyPresent:boolean;

    ngOnInit(){
       
        var numbersOnly = (<HTMLInputElement>document.getElementById("numbersOnly"));
        numbersOnly.onkeyup = function myFunction() {
            
            numbersOnly.value = numbersOnly.value.replace(/[^0-9]/g, '');
        };
    }

    id : string;
    contact: Contact;
    subscription : Subscription;

    constructor(private router:Router,private activatedRoute: ActivatedRoute, private contactService: ContactService){
        this.contactService.bMobileNumberAlreadyPresent.subscribe(
            flag => {this.bMobileAlreadyPresent  = flag}
        );
        
        this.activatedRoute.params.subscribe(
            (param:any) => { 
                this.id = param["id"];
                
                this.contact = this.contactService.getContactById(parseInt(this.id));
            }
        );
        
        
    }
        
    onSubmit(form: NgForm){
        var data = form.value;
        data._id  = this.contact._id;
        data.Number = parseInt(data.Number);
        this.contactService.updateContactHelper(data);
        this.router.navigate(['/Main']);
        
    }

    onCancel(){
        this.router.navigate(['/Main']);
    }
}
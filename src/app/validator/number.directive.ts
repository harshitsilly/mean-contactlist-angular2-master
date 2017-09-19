import { ContactService } from '../services/contact.service';
import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
    selector: '[UniqueNumber][formControlName],[UniqueNumber][formControl],[UniqueNumber][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => NumberValidator), multi: true }
    ]
})
export class NumberValidator implements Validator {
    constructor( @Attribute('UniqueNumber') public UniqueNumber: string, private ContactService:ContactService) {}

    validate(c: AbstractControl): { [key: string]: any } {
        
        let v = c.value;
        
        if(v && v.length == 10){
      
            v = parseInt(v);
            var aContacts = this.ContactService.aContacts;
            for(var i=0;i<aContacts.length; i++){
                if(aContacts[i].Number === v){
                    debugger;
                    this.ContactService.bMobileNumberAlreadyPresent.emit(true);
                    return {
                        UniqueNumber: false
                    }
                }
            }
        }
        this.ContactService.bMobileNumberAlreadyPresent.emit(false);
        return null;
    }
}
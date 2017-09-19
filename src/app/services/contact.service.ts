import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Contact } from '../Contact';


@Injectable()
export class ContactService {
    
    bMobileNumberAlreadyPresent:EventEmitter<boolean> = new EventEmitter();
    searchTriggredOrFavouritesClicked: EventEmitter<any> = new EventEmitter();
    
    aContacts : Contact[] = [];
    
    constructor(private http: Http){
    this.getContacts().subscribe(
        saved => {
            for(var i=0;i<saved.obj.length;i++){
                this.aContacts.push(saved.obj[i]);
            }
        }
    );
   }

    
    

    /////////////// GET /////////////////////
    
    getContacts(){
        return this.http.get('http://localhost:3000/contacts')
        .map((data:any) => data.json());
    }
    getContactById(id: number){
        for(var i=0; i<this.aContacts.length;i++){
            if(id === this.aContacts[i].Number){
                return JSON.parse(JSON.stringify(this.aContacts[i]));
            }
        }
    }

    ///////////////////// DELETE ////////////////////

    deleteContact(contact: Contact){
        return this.http.delete('http://localhost:3000/contacts/'+contact._id)
        .map((data: Response) => data.json())
        .catch(error => Observable.throw("Error in x service"));
    }


    //////////////////// UPDATE /////////////////////
    updateContact(contact: Contact){
        var body = JSON.stringify(contact);
        const header = new Headers({'Content-Type':'application/json'});

        return this.http.patch('http://localhost:3000/contacts/'+contact._id,body,{headers:header})
        .map((data: Response) => data.json())
        .catch(error => Observable.throw("Error in x service"));
    }

    //////////////////// POST ////////////////////
    addContact(contact: Contact){
        
        var body = JSON.stringify(contact);
        const header = new Headers({'Content-Type':'application/json'});

        //this.aContacts.push(contact);

        return this.http.post('http://localhost:3000/contacts',body,{headers:header})
        .map((data: Response) => data.json())
        .catch(error => Observable.throw("Error in x service"));
        
    }
    ///////////////////////////// helper methods ///////////////////////
    addContactToContactList(data: any){
        this.aContacts.push(data);
    }

    getContactsList(){
        return this.aContacts;
    }

    updateContactHelper(contact: Contact){
        this.updateContact(contact).subscribe(
            updatedContact => {
                console.log(updatedContact.obj);
                for(var i=0; i< this.aContacts.length; i++){
                    if(this.aContacts[i]._id === updatedContact.obj._id){
                        for(var key in updatedContact.obj){
                             this.aContacts[i][key] = updatedContact.obj[key];
                             console.log(this.aContacts[i][key]+" --------  "+ updatedContact.obj[key]);
                        }
                        break;
                    }
                    
                }
            },
            error => {}
        );
    }   
    
    deletContactHelper(contact: Contact){
        this.deleteContact(contact).subscribe(
            deletedContact => {
               for(var i=0;i<this.aContacts.length;i++){
                    if(this.aContacts[i]._id === deletedContact._id._id){
                        this.aContacts.splice(i,1);
                        break;
                    }
               }
            },
            error => {}
        );

    }
    IsUniqueNumber(number){
        number = parseInt(number);
        for(var i= 0;i<this.aContacts.length;i++){
            if(this.aContacts[i].Number === number){
                return false;
            }
        }
        return true;
    }
}

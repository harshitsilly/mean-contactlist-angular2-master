import { ContactService } from '../../services/contact.service';
import { Contact } from '../../Contact';
import { Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html'
})
export class ContactsComponent  implements OnInit, OnDestroy{
    

    contacts: Contact[]= [];
    subscription2: Subscription;
    filterargs: any;

    constructor(private contactService: ContactService){
        this.subscription2 = this.contactService.searchTriggredOrFavouritesClicked.subscribe(
            (searchQuery) => {
                this.filterargs = searchQuery;
            }
        );
    }

    public ngOnInit(): void {
        this.contacts = this.contactService.getContactsList();
    }

    public ngOnDestroy() {
        this.subscription2.unsubscribe();
        
        
    }

    

    

    
    
    
    
}
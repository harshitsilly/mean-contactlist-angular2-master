import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls:['./search.component.css']
})
export class SearchBarComponent {
    constructor(private contactService:ContactService , private router: Router){
        
    }

    onAddContact(){
        this.router.navigate(['Add']);
    }
    searchContacts(value){
       this.contactService.searchTriggredOrFavouritesClicked.emit(value);
    }
    
}
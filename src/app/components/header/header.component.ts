import { ContactService } from '../../services/contact.service';
import { Component ,OnInit} from '@angular/core';

@Component({
    selector: 'app-header',
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    bContactsClicked: boolean;
    constructor(private contactService: ContactService){
        this.bContactsClicked = true;
    }
    ngOnInit(){
        this.bContactsClicked = true;
    }

    onClickContacts(){
        this.bContactsClicked = true;
        this.contactService.searchTriggredOrFavouritesClicked.emit("");
    }
    onClickFavourites(){
        this.bContactsClicked = false;
        this.contactService.searchTriggredOrFavouritesClicked.emit("fiilterFavourites");
    }
    
   
}
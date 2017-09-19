import { Contact } from '../Contact';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myfilter',
    pure: false
})
export class MyFilterPipe implements PipeTransform {
    transform(contacts: Contact[], filter: string): any {
        
        
        if (!contacts || !filter) {
            return contacts;
        }

        //for favourites contacts
        if(filter === "fiilterFavourites"){
            return contacts.filter(contact => contact.bFavourite !== false);
        }
        //for search box filtering
        var name =  contacts.filter(contact => contact.Name.toLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1);
        var number =  contacts.filter(contact => contact.Number.toString().indexOf(filter) !== -1);
        var contacts = name.concat(number);
        
        var map = [];
        var result = [];
        contacts.forEach(function (contact) {
            if (!map[contact._id]) {
                result.push(contact);
                map[contact._id]=true;
            }
        });
        return result;



    }
}
export class Contact{
    ImageUrl: string;
    Name: string;
    Number: number;
    Email: string;
    bFavourite: boolean
    _id: string;

    constructor(url:string, name:string, number: number, email:string, favourite: boolean, id: string){
        this.ImageUrl = url;
        this.Name = name;
        this.Number = number;
        this.Email = email;
        this.bFavourite = favourite;
        this._id = id;
    }
}
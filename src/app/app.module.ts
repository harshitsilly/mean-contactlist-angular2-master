import { ContactService } from './services/contact.service';
import { SearchBarComponent } from './components/searchBar/search.component';
import { EditComponent } from './components/edit/edit.component';
import { HeaderComponent } from './components/header/header.component';
import { AddComponent } from './components/add/add.component';

import { routes } from './routes/app.routing';
import { NumberValidator } from './validator/number.directive';
import { MyFilterPipe } from './pipe/filter.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ContactItemComponent } from './components/contacts/contact-item.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    ContactItemComponent,
    ContactsComponent,
    ContactItemComponent,
    EditComponent,
    HeaderComponent,
    MainComponent,
    MyFilterPipe,
    NumberValidator,
    MainComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routes

  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }

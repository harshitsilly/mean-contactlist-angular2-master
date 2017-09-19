import { AddComponent } from '../components/add/add.component';
import { EditComponent } from '../components/edit/edit.component';
import { MainComponent } from '../components/main/main.component';

import { RouterModule, Routes } from '@angular/router';

const APP_ROUTES: Routes = [
    { path: '', component: MainComponent, pathMatch:'full'},
    { path: 'Main', component: MainComponent},
    { path: 'Edit/:id', component: EditComponent},
    { path: 'Add', component: AddComponent}
    
]; 

export const routes = RouterModule.forRoot(APP_ROUTES);
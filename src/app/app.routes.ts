import { Routes } from '@angular/router';
import { AboutComponent } from './components/pages/about/about.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NewMomentComponent } from './components/pages/new-moment/new-moment.component';
import { MomentsComponent } from './components/pages/moments/moments.component';
import { EditMomentsComponent } from './components/pages/edit-moments/edit-moments.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'moments/new', component: NewMomentComponent },
    { path: 'moments/edit/:id', component: EditMomentsComponent },
    { path: 'moments/:id', component: MomentsComponent }
];

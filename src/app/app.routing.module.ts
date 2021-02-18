import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { AuthGuard } from './core/auth/auth.guard';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
    },
    { 
        path: 'user/:userName',
        component: PhotoListComponent,
        resolve: { 
            photos: PhotoListResolver 
        }
    },
    {
        path: 'photo/add',
        component: PhotoFormComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'photo/:photoId',
        component: PhotoDetailsComponent,

    },
    { 
        path:'not-found',
        component: NotFoundComponent
    },
    { 
        path:'**',
        redirectTo: 'not-found'
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
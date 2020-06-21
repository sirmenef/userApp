import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutsComponent} from './layouts/layouts.component';
import {AppComponent} from './app.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // redirectTo: 'lay',
    component: AppComponent,
  },
  {
    path: 'lay',
    component: LayoutsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

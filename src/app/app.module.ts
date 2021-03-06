import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { LayoutsComponent } from './layouts/layouts.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewcardComponent } from './newcard/newcard.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    SidebarComponent,
    MainContentComponent,
    LayoutsComponent,
    NewcardComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

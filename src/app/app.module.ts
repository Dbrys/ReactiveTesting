import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BandListComponent } from '../app/band-list/band-list.component';

const routes: Routes = [ 
  {path: 'bands', component: BandListComponent}, 
  {path: '', redirectTo: 'bands', pathMatch: 'full'}
]; 

@NgModule({
  declarations: [
    AppComponent,
    BandListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

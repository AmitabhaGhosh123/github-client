import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgModule , NO_ERRORS_SCHEMA } from '@angular/core';
// mdb import
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
// ngx progressbar import
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Ng2CompleterModule } from 'ng2-completer';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchuserComponent } from './searchuser/searchuser.component';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { AuthService } from './auth/auth.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { ApiService } from './api.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    SearchuserComponent,
    SearchboxComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    MDBBootstrapModule.forRoot(),
    TabsModule.forRoot(),
    Ng2CompleterModule,
    PaginationModule.forRoot()
  ],
  providers: [AuthService,ApiService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
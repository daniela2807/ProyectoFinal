import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';

import { GoogleMapsModule } from '@angular/google-maps'

import { QRCodeModule } from 'angularx-qrcode';
import { ChartsModule } from 'ng2-charts';


import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';

import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { AdminComponent } from './admin/admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { LayoutComponent } from './layout/layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterComponent } from './footer/footer.component';
import { CursesComponent } from './curses/curses.component';
import { RegisterComponent } from './register/register.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PerfiladmiComponent } from './perfiladmi/perfiladmi.component';
import { HttpClientModule} from '@angular/common/http';
import { MessageService } from './services/message.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    FaqComponent,
    AdminComponent,
    NavbarComponent,
    SidenavListComponent,
    LayoutComponent,
    FooterComponent,
    CursesComponent,
    RegisterComponent,
    PerfilComponent,
    PerfiladmiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule,
    AngularFireModule,
    ChartsModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot(),
    NgbModule,
    GoogleMapsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

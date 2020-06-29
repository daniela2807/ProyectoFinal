import { PerfiladmiComponent } from './perfiladmi/perfiladmi.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegisterComponent } from './register/register.component';
import { CursesComponent } from './curses/curses.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'curses', component: CursesComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'registrar', component: RegisterComponent},
  { path: 'perfiladmi', component: PerfiladmiComponent},
  { path: 'faq', component: FaqComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

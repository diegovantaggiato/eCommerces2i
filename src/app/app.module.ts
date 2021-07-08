import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { HomePageComponent } from './home-page/home-page.component';
import { RightPageComponent } from './right-page/right-page.component';
import { SummaryPipe } from './summary.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { GetProductsService } from './services/get-products.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './login-page/login-page.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceService } from './services/auth-service.service';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RightPageComponent,
    SummaryPipe,
    DashboardComponent,
    NotFoundComponent,
    NavbarComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    NgbModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'', component: HomePageComponent},
      {path:'product/:id', component: RightPageComponent},
      {path: 'dashboard', component: DashboardComponent, canActivate:[AuthServiceService]},
      {path: 'login', component: LoginPageComponent},
      {path: '**', component: NotFoundComponent}
    ])
  ],
  providers: [
    GetProductsService,
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }

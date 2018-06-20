import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { SelectRequiredValidatorDirective } from './models/selectValidator.directive'
import { PasswordMatchDirective } from './models/matchPasswords.directive'
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { HttpClientModule } from '@angular/common/http'
import { CookieService } from 'angular2-cookie/services/cookies.service'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { BlogsComponent } from './blogs/blogs.component';
import { NavComponent } from './nav/nav.component';
import { HeadComponent } from './head/head.component';
import { SectionComponent } from './section/section.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { GetinComponent } from './getin/getin.component';
import { LatestComponent } from './latest/latest.component';
import { ExploreComponent } from './explore/explore.component';
import { ComposeComponent } from './compose/compose.component';
import { HomeComponent } from './home/home.component';
import { AddUserService } from './add-user.service';
import { ProfileComponent } from './profile/profile.component'
import { EditorModule } from '@tinymce/tinymce-angular';
import { SearchComponent } from './search/search.component';
 



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    BlogsComponent,
    SelectRequiredValidatorDirective,
    PasswordMatchDirective,
    NavComponent,
    HeadComponent,
    SectionComponent,
    LoginComponent,
    FooterComponent,
    GetinComponent,
    LatestComponent,
    ExploreComponent,
    ComposeComponent,
    HomeComponent,
    ProfileComponent,
    SearchComponent
  ],
  imports: [
    EditorModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    Angular2FontawesomeModule,
    HttpClientModule
  ],
  providers: [AddUserService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

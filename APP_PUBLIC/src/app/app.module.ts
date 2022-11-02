import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TripService } from './services/trip.service';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrameworkComponent } from './framework/framework.component';
import { HeaderComponent } from './header/header.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { AboutComponent } from './about/about.component';
import { HomelistComponent } from './homelist/homelist.component';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule } from '@angular/forms';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    FrameworkComponent,
    HeaderComponent,
    DetailsComponent,
    CreateComponent,
    AboutComponent,
    HomelistComponent,
    HomepageComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomepageComponent
      },
      {
        path: 'list',
        component: HomelistComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'list/create',
        component: CreateComponent
      },
      {
        path: 'list/update/:packageId',
        component: UpdateComponent
      },
      {
        path: 'packages/:packageId',
        component: DetailsComponent
      },
      {
        path: 'delete/:packageId',
        component: DetailsComponent
      }
    ])
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'} ],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }

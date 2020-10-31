import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConvertComponent } from './components/convert/convert.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxFileDropModule } from 'ngx-file-drop';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'convert', component: ConvertComponent },
  { path: '',   redirectTo: '/convert', pathMatch: 'full' },
  
];

@NgModule({
  declarations: [
    AppComponent,
    ConvertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxFileDropModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true },
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

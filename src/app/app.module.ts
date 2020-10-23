import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http'
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC_bZDLca3grMgR8vkqN84cP_kblau_Qks',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

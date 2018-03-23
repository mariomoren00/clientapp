import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CreateclientPage } from '../pages/createclient/createclient';
import { EditclientPage } from '../pages/editclient/editclient';
import { DetailsclientPage } from '../pages/detailsclient/detailsclient';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreateclientPage,
    EditclientPage,
    DetailsclientPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreateclientPage,
    EditclientPage,
    DetailsclientPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

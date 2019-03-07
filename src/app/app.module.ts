import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { RegisterPage } from '../pages/register/register';
import { VerifyPage } from '../pages/verify/verify';
import { NewschemePage } from '../pages/newscheme/newscheme';
import { SchemesPage } from '../pages/schemes/schemes';
import { CreatedschemePage } from '../pages/createdscheme/createdscheme';
import { AddmembersPage } from '../pages/addmembers/addmembers';
import { JoinedschemePage } from '../pages/joinedscheme/joinedscheme';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Contacts } from '@ionic-native/contacts';
import { Device } from '@ionic-native/device/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { RestProvider } from '../providers/rest/rest';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    VerifyPage,
    LogoutPage,
    NewschemePage,
    SchemesPage,
    CreatedschemePage,
    AddmembersPage,
    JoinedschemePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    VerifyPage,
    LogoutPage,
    NewschemePage,
    SchemesPage,
    CreatedschemePage,
    AddmembersPage,
    JoinedschemePage
  ],
  providers: [
    AndroidPermissions,
    Contacts,
    StatusBar,
    SplashScreen,
    Device,
    UniqueDeviceID,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}

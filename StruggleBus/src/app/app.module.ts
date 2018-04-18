import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { CoursePage } from '../pages/course/course';
import { AddPage } from '../pages/add/add';

import { PipesModule} from '../pipes/pipes.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { DatabaseProvider } from '../providers/database/database';

import { environment } from '../enviornments/environment';

import { Facebook } from '@ionic-native/facebook';
import { UserProvider } from '../providers/user/user';
import { Firebase } from '@ionic-native/firebase';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    SettingsPage,
    HomePage,
    TabsPage,
    SigninPage,
    CoursePage,
    AddPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    SettingsPage,
    HomePage,
    TabsPage,
    SigninPage,
    CoursePage,
    AddPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    Facebook,
    UserProvider,
    Firebase
  ]
})
export class AppModule {}

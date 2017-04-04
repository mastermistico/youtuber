import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Youtube } from '../providers/youtube';
import { AngularFireModule } from 'angularfire2';
 
// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyA84-diQHRxjpMvPVhDGJitz7aoUyu7cWA",
    authDomain: "elrubiusomgvsholasoygerman.firebaseapp.com",
    databaseURL: "https://elrubiusomgvsholasoygerman.firebaseio.com",
    storageBucket: "elrubiusomgvsholasoygerman.appspot.com",
    messagingSenderId: "191639943982"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [Youtube,
              {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

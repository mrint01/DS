import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';


import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// config of the database FireBase
const firebaseConfig = {
  apiKey: 'AIzaSyDbpR0SZfz2LtQAO3ClTRYyo24HaDTYJQU',
  authDomain: 'tasks-55135.firebaseapp.com',
  databaseURL: 'https://tasks-55135-default-rtdb.firebaseio.com',
  projectId: 'tasks-55135',
  storageBucket: 'tasks-55135.appspot.com',
  messagingSenderId: '134224327500',
  appId: '1:134224327500:web:e0bf915bc5493e2788d5e9',
  measurementId: 'G-SGB22862YH'
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // we add thos import for AngularFire
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

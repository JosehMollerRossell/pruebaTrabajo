import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//config Login firebase
import { GooglePlus } from '@ionic-native/google-plus/ngx'; //plugin google
import {   firebaseConfig } from 'src/environments/environment'; //variable de configuracion firebase
import { AngularFirestoreModule } from "@angular/fire/firestore"; //Modulo Firestore (BD)
import { AngularFireAuthModule } from "@angular/fire/auth";  //Modulo de authenticacion
import { AngularFireModule } from "@angular/fire";            //Modulo para inicializar y que todo funcione bien vergas
import * as firebase from 'firebase';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    GooglePlus,
    AngularFirestoreModule,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GoogleauthService {

  constructor(private AFauth: AngularFireAuth, private dbFirebase: AngularFirestore, private google: GooglePlus, public alertCtrl: AlertController, private router: Router,
              public loadingController: LoadingController) { }
    datos;
  logeoConGooogle(){
   return this.google.login({}).then(res =>{
      const data = res;      
      this.datos = res;
      return auth().signInWithCredential(auth.GoogleAuthProvider.credential(res.idToken)).then(success => {
        console.log("Firebase success: " + JSON.stringify(success));
      } ).catch( error => this.alerta("¡Ho noo!", JSON.stringify(error)));     
    }).catch(err => this.alerta("¡Ho!", err) );
  }

  async deslogeo(){
    const loading = await this.loadingController.create({
      message: "Cerrando Sesión..."
    });
    await loading.present(); 
    auth().signOut().then(()=>{
      this.router.navigate(['/home']);
      loading.dismiss();  
    }).catch( err => {
      loading.dismiss();  
      this.alerta("¡Ho!", "Ocurrió un error al cerrar sesión")
    }      
       )
  }
  async alerta(header, subheader){
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subheader,
      buttons: [
        {
          text: 'OK',
          handler: data => console.log("ok"),
          role: '',
        },
      ]
    });
    await alert.present();
  }
}

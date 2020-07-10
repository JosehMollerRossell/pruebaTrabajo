import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase';
import { AlertController, LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class FireauthService {

  constructor(private AFauth : AngularFireAuth, private router : Router, private db : AngularFirestore, public alertCtrl: AlertController, public loadingController: LoadingController) { }

  login(email:string, password:string){
    return new Promise((resolve, rejected) =>{
      auth().signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
      }).catch(err => rejected(err));
    });
  }

 async cerrarSesion(){
    const loading = await this.loadingController.create({
      message: "Cerrando Sesión..."
    });
    await loading.present(); 
    auth().signOut().then(() => {
      loading.dismiss();  
      this.router.navigate(['/bienvenida']);
    }).catch( err => {
      loading.dismiss();  
      this.alerta("¡Ho noo!", "Ocurrió un error al cerrar sesión")
    }      
       )
  }

  nuevoUser(email : string, password : string, name : string){
    return new Promise ((resolve, reject) => {
      auth().createUserWithEmailAndPassword(email, password).then( res =>{
          // console.log(res.user.uid);
        const uid = res.user.uid;
          this.db.collection('users').doc(uid).set({
            name : name,
            uid : uid
          })        
        resolve(res)
      }).catch( err => reject(err))
    })
    

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

import { Component } from '@angular/core';
import * as EmailValidator from 'email-validator';
import { AlertController, LoadingController } from '@ionic/angular';
import { GoogleauthService } from '../servicios/google/googleauth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FireauthService } from '../servicios/firebase/fireauth.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public alertCtrl: AlertController, private googleauthService: GoogleauthService, private router: Router, public loadingController: LoadingController,
            private fireauthService: FireauthService) {

            }
  origen;          
  email;
  password;
  botonlogin= true;
  
 desabilitarBoton(ev){
  if (ev.password && ev.email) {
    this.botonlogin = false;
  } else {
    this.botonlogin = true;
  }
 }

  validarEmail() {      
    let correo = EmailValidator.validate(this.email);
    if (!correo )  {
      this.alerta("Cuidado", "Ingrese un Correo válido")      
    } else if(correo && this.password){
      this.iniciarSesion(this.email, this.password);
    }  
  }


 async logeoGoogle(){
    const loading = await this.loadingController.create({
      message: "Espere porfavor..."
    });
    await loading.present();
    this.googleauthService.logeoConGooogle().then((res)=>{
      loading.dismiss();
     // this.alerta("RES", res )
     this.origen="google"
      this.router.navigate(['/bienvenida',this.origen]);
    }).catch((error) =>{
      loading.dismiss();
      this.alerta("¡Ho noo!", "Ocurrió un error")
    });
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

 async iniciarSesion(correo, password){
    const loading = await this.loadingController.create({
      message: "Validando datos..."
    });
    await loading.present();
    this.fireauthService.login(correo, password).then( () =>{
      loading.dismiss();
      this.origen="fire"
      this.router.navigate(['/bienvenida',this.origen]);
    }).catch(err => {
      loading.dismiss();
      this.alerta("¡Ho noo!", "Los datos son incorrectos o no existe el usuario");
    })
  }
}

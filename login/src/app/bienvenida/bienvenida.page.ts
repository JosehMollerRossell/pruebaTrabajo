import { Component, OnInit } from '@angular/core';
import { GoogleauthService } from '../servicios/google/googleauth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FireauthService } from '../servicios/firebase/fireauth.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {

  constructor(private googleauthService: GoogleauthService, public alertCtrl: AlertController, private activateRoute: ActivatedRoute, private fireauthService: FireauthService) {
    this.origen = this.activateRoute.snapshot.paramMap.get('origen');
    if (this.origen == "google") {
      this.aviso = "Hola, te has logeado desde Google"
    } else {
      this.aviso = "Hola, te has logeado desde Firebase"
    }
    this.aviso 
   }

  ngOnInit() {
  }
  aviso;
  origen;
  datos;
  cerrarCesion(){    
    if (this.origen == "google") {
      this.googleauthService.deslogeo()
    } else {
      this.fireauthService.cerrarSesion();
    }
  }

  async alertacesion() {
    const alert = await this.alertCtrl.create({
      header: "Cerrar Sesión",
      subHeader: "¿Estas seguro de cerrar sesión?",
      buttons: [
        {
          text: 'Si',
          handler: data => this.cerrarCesion(),
          role: '',
        },
        {
          text: 'No',
          handler: data => console.log("no cerrar"),
          role: '',
        },
      ]
    });
    await alert.present();
  }

}

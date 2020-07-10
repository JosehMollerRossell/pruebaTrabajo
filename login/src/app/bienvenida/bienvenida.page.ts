import { Component, OnInit } from '@angular/core';
import { GoogleauthService } from '../servicios/google/googleauth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {

  constructor(private googleauthService: GoogleauthService, public alertCtrl: AlertController) {
    this.datos = googleauthService.datos;
   }

  ngOnInit() {
  }
  datos;
  cerrarCesion(){
    this.alertacesion();
  }

  async alertacesion() {
    const alert = await this.alertCtrl.create({
      header: "Cerrar Sesión",
      subHeader: "¿Estas seguro de cerrar sesión?",
      buttons: [
        {
          text: 'Si',
          handler: data => this.googleauthService.deslogeo(),
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

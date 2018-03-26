import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { ClientsProvider } from '../../providers/clients/clients';

/**
 * Generated class for the EditclientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editclient',
  templateUrl: 'editclient.html',
})
export class EditclientPage {

  client = { 
    name: '', 
    phone:'', 
    email: '', 
    enterprise: '', 
    latitude: 0, 
    longitude: 0
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private geolocation: Geolocation,
    public clientsProvider: ClientsProvider,
  ) {
      this.client = navParams.get('client');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditclientPage');
  }


  /**
   * 
   * Método para obtener la geolocalización haciendo una instancia a la clase con su respectivo método heredado.
   * Nos retorna una respuesta que es un objeto con valores de latitude y longitude
   */
  geolocalitation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.client.latitude = resp.coords.latitude;
      this.client.longitude = resp.coords.longitude; 
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  /**
   * 
   */
  edit(){
    this.clientsProvider.update(this.client).then(client => {
      this.viewCtrl.dismiss(this.client);
    }).catch( error => {
      console.error( error );
    });
  }
}

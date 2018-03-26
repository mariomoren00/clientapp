import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { Events } from 'ionic-angular';

import { ClientsProvider } from '../../providers/clients/clients';

/**
 * Generated class for the CreateclientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createclient',
  templateUrl: 'createclient.html',
})
export class CreateclientPage {

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
    private geolocation: Geolocation,
    public events: Events,
    public clientsProvider: ClientsProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateclientPage');
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
  save(){
    this.clientsProvider.create(this.client).then(client => {
      this.events.publish('addClient', this.client);      
      this.navCtrl.pop();
    }).catch( error => {
      console.error( error );
    });
  }
}

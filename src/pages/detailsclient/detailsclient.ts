import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';



/**
 * Generated class for the DetailsclientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailsclient',
  templateUrl: 'detailsclient.html',
})
export class DetailsclientPage {

  client = {};

  map: GoogleMap;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
    //Acá debemos hacer una referencia al param que deseamos obtener para mostrar.
    this.client = navParams.get('client');
    console.log('details');
  }

  ionViewDidLoad(){
    console.log('loadmap');
    this.loadMap();
  }

  loadMap(){
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.client['latitude'], // default location
          lng: this.client['longitude'] // default location
        },
        zoom: 18,
        tilt: 30
      }
    };
  
    this.map = GoogleMaps.create('map_canvas', mapOptions);
    //this.map = this.googleMaps.create('map_canvas', mapOptions);
  
    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      // Now you can use all methods safely.
      this.getPosition();
    }).catch(error =>{
      console.log(error);
    });
  
  }

  getPosition(): void{
    this.map.getMyLocation()
    .then(response => {
      this.map.moveCamera({
        target: response.latLng
      });
      this.map.addMarker({
        title: 'My Position',
        icon: 'blue',
        animation: 'DROP',
        position: response.latLng
      });
    })
    .catch(error =>{
      console.log(error);
    });
  }

}

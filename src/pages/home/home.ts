import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

/**
 * Importamos los componentes de pages
 */
import { CreateclientPage } from '../createclient/createclient';
import { EditclientPage } from '../editclient/editclient';
import { DetailsclientPage } from '../detailsclient/detailsclient';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /**
   * Creamos un objeto de clientes para poder iterar en la vista home
   */
  clients = [
    { name: 'José López', phone:'9434323232', email: 'polloshermanos@gmail', enterprise: 'Pollos hermanos', latitude: '243232324.34', longitude: '-232324513.23'},
    { name: 'José López', phone:'9434323232', email: 'polloshermanos@gmail', enterprise: 'Pollos hermanos', latitude: '243232324.34', longitude: '-232324513.23'},
    { name: 'José López', phone:'9434323232', email: 'polloshermanos@gmail', enterprise: 'Pollos hermanos', latitude: '243232324.34', longitude: '-232324513.23'},
    { name: 'José López', phone:'9434323232', email: 'polloshermanos@gmail', enterprise: 'Pollos hermanos', latitude: '243232324.34', longitude: '-232324513.23'},
  ];

  /**
   * Agregamos los controladores que usaremos para modal y actionsheet
   */
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
  ) {

  }

  /**
   * Método para activar el modal que contiene el formulario para crear un nuevo cliente.
   */
  getModal(){    
    let modal = this.modalCtrl.create(CreateclientPage);
    modal.present();
  }

   /**
   * Método que activa un action sheet para seleccionar acciones de editar y eliminar un cliente.
   * Recibe dos parametros uno de tipo any y el indice
   */
  action(item: any, index){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Client',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.clients.splice(index,1);
          }
        },{
          text: 'Edit',
          handler: () => {
            let modal = this.modalCtrl.create(EditclientPage);
            modal.present();
          }
        },{
          text: 'Detail',
          handler: () => {
            let modal = this.modalCtrl.create(DetailsclientPage);
            modal.present();
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { ClientsProvider } from '../../providers/clients/clients';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /**
   * Creamos un objeto de clientes para poder iterar en la vista home
   */
  clients = [];

  /**
   * Agregamos los controladores que usaremos para modal y actionsheet
   */
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public event: Events,
    public clientsProvider: ClientsProvider,
  ) {
    event.subscribe('addClient', (client) => {
      this.clients = this.clients.concat(client);
    });

    this.getClients();
  }

  /**
   * 
   */
  getClients(){
    this.clientsProvider.getAll().then(clients => {
      console.log(clients);
      this.clients = clients;
    }).catch( error => {
      console.error( error );
    });
  }

  /**
   * Método para activar el modal que contiene el formulario para crear un nuevo cliente.
   */
  getModal(){    
    let modal = this.modalCtrl.create('CreateclientPage');
    modal.present();
  }

   /**
   * Método que activa un action sheet para seleccionar acciones de editar y eliminar un cliente.
   * Recibe dos parametros uno de tipo any y el indice
   */
  action(item: any, index){
    console.log(item);
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Client',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.clientsProvider.delete(item).then(response => {
              this.clients.splice(index, 1);
            }).catch( error => {
              console.error( error );
            })
          }
        },{
          text: 'Edit',
          handler: () => {
            let modal = this.modalCtrl.create('EditclientPage', {'client' : item});
            modal.onDidDismiss(data => {
              console.log(data);
            });
            modal.present();
          }
        },{
          text: 'Detail',
          handler: () => {
            let modal = this.modalCtrl.create('DetailsclientPage', {'client' : item});
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

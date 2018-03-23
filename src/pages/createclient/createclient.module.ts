import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateclientPage } from './createclient';

@NgModule({
  declarations: [
    CreateclientPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateclientPage),
  ],
})
export class CreateclientPageModule {}

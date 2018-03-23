import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditclientPage } from './editclient';

@NgModule({
  declarations: [
    EditclientPage,
  ],
  imports: [
    IonicPageModule.forChild(EditclientPage),
  ],
})
export class EditclientPageModule {}

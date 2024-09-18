import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
// import { AngularFireDatabaseModule } from '@angular/fire/compat/database'; // Módulo do Realtime Database


@NgModule({
  declarations: [AppComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFirestoreModule,
    // AngularFireDatabaseModule,
  
    AngularFireModule.initializeApp(environment.firebaseConfig),  // Inicializa Firebase com as credenciais
    

  ],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy,
   }],
  bootstrap: [AppComponent],
})
export class AppModule {}

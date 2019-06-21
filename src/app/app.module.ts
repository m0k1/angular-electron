import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { FilesComponent } from './files/files.component';

import {AudioService} from './shared/services/audio.service';
//import {ControlComponent} from './components/control/control.component';
import {PlaylistService} from './shared/services/playlist.service';
import {HttpClientService } from './shared/services/http-client.service';
import {UserAlertService} from './shared/services/user-alert.service';

//Import joymap component;
import createJoyMap, { createQueryModule } from 'joymap';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    FilesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService,
    AudioService,
    HttpClient,
    PlaylistService,
    HttpClientService,
    UserAlertService
],
  bootstrap: [AppComponent]
})
export class AppModule { }

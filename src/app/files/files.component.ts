import { Component, OnInit } from '@angular/core';
import { readdir, stat } from 'fs';
import { resolve } from 'path';
import { of } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

import {AudioService} from '../shared/services/audio.service';
import {ControlService} from '../shared/services/control.service';



//declare var Pizzicato: any;
//import * as Howl from 'howler';
declare var Howl: any;

//import { remote } from 'electron';
//var fs = remote.require('fs');
const fs = require('fs');


@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  //private currentPath: string = process.cwd();
  private currentPath: string = '/SAMPLES/dj/set1';
  private entries: any;
  private cursor = 0;
  private selected = 0;
  track = null;

  constructor(private chRef: ChangeDetectorRef,
    private _audioService: AudioService,
    public _pad: ControlService
    ) {
    this.updateEntries();
    _pad.init();

    this._pad.configObservable.subscribe(value => {
      if(value==12) this.goUp();
      if(value==13) this.goDown();
    })
  }

  ngOnInit() {
  }

  onKeyDown(e) {
    console.log(e.code);
    if (e.code == 'ArrowDown') {
      e.preventDefault();
      this.goDown();
    }
    if (e.code == 'ArrowUp') {
      e.preventDefault();
      this.goUp();
    }
    if (e.code == 'Enter') {
      e.preventDefault();
      this.openSelectedDir();
    }
  }

  goUp() {
    if (this.cursor == 0) return;
    this.cursor--;
    this.selected = this.cursor;
    console.log("Going up. Selected: ", this.entries[this.selected]);
  }

  goDown() {
    this.cursor++;
    this.selected = this.cursor;
    this.entries.subscribe(res =>
      console.log("Going down. Selected: ", res[this.selected])
    );
  }

  openSelectedDir() {
    console.log("Opening dir:", this.entries[this.selected]);
    this.entries.subscribe(res =>
      this.changeDir(res[this.selected])
    );
  }

  private updateEntries() {
    readdir(this.currentPath, (err: Error, files: [string]) => {
      if (err) {
        console.error(err);
      }
      console.log("ENTRIES: ", this.entries);
      this.selected = this.cursor = 0;
      this.entries = of(['../'].concat(files));
      this.chRef.detectChanges();
      console.log("Opened dir:", this.entries[this.selected]);
    });
  }

  private changeDir(newDir: string) {
    const targetPath = resolve(this.currentPath, newDir);
    stat(targetPath, (err, stats) => {
      if (err) {
        console.error(err);
      }
      if (stats.isFile()) {
        this.openFile(targetPath);
      } else if (stats.isDirectory()) {
        this.currentPath = targetPath;
        this.updateEntries();
      } else {
        console.error(new Error(`Unknown file system object: ${targetPath}`));
      }
    });
    // reset cursor position to first entry item
  }
  private openFile(path: string) {
    // TODO: Implement file opening
    console.log("Opening file: ", path);

    this._audioService.playPath("file://"+path);

    
    /*
    let sound = new Howl({
       src: ["file://"+path],
        html5: true,
      });
     sound.play();
    */
    
  }
}  
 
      
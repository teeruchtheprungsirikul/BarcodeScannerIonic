import { DatabaseService } from './../sevices/database.service';
import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  barcodeResult;
  barcodeInfoArray = [];

  constructor(private scanner: BarcodeScanner, private dbService: DatabaseService, private platform: Platform){
    this.init();
  }

  async init(){
    await this.platform.ready();
    await this.dbService.initDB();
    this.showPreviousBarcode();
  }

  async showPreviousBarcode(){
    this.barcodeInfoArray = await this.dbService.getAllBarcode();
  }
  async startScan(){
    console.log('do scanning...');
    const result = await this.scanner.scan();
    
    await this.dbService.saveBarcodeInfo(result);
    this.showPreviousBarcode();
  }

}

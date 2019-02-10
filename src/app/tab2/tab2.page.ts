import { Component } from '@angular/core';
declare var cordova: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  handleButtonClick = () => {
    // (<any>window).cordova.plugins.AlanVoice.greet('hiii', () => console.log('sucess'), () => console.log('fail'));
    cordova.plugins.AlanVoice.greet('hiii', () => console.log('sucess'), () => console.log('fail'));

  }
}

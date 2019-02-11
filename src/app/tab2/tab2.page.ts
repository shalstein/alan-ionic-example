import { Component } from '@angular/core';
declare var cordova: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  handleButtonClick = () => {
    // (<any>window).cordova.plugins.AlanVoice.greet('hiii', (r) => console.log('sucessxxxx' + r), (r) => console.log('fail ddfs' + r));
    console.log('in the callback');
    cordova.plugins.AlanVoice.greet('h', (response) => console.log('sucess' + response), (error) => console.log('myError' + error));

  }
}

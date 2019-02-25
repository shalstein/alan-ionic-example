import { NgZone, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Platform } from '@ionic/angular';
import {Router} from '@angular/router';
declare var AlanVoice: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  constructor(public changeDetectorRef: ChangeDetectorRef, public platform: Platform , public router: Router, public ngZone: NgZone) { }

  dialogState = 'IDLE';
  currentButtonColor = 'light';
  alanText = '';
  events = 'my event not set';
  ionViewDidLeave() {
    if (this.dialogState !== 'IDLE' ) {
      AlanVoice.toggle();
    }
  }



  ngOnInit() {
    this.platform.ready().then(() => {

      if (this.platform.is('android')) {
        const logError = error => console.log(error);
        AlanVoice.subscribeToTextEvent((text: string) => {
          this.alanText = text;
          this.changeDetectorRef.detectChanges();
        }, logError);
        AlanVoice.subscribeToCommands((event: any) => {
          this.events += event;
          const parsedEvent = JSON.parse(event);
          const navigateTo = parsedEvent.data.navigateTo;
          this.ngZone.run(() => {
            this.router.navigate([navigateTo]);
          });
          this.changeDetectorRef.detectChanges();
        }, logError);
        AlanVoice.subscribeToDialogState((state: string) => {
          this.dialogState = state;
          this.changeDetectorRef.detectChanges();
        }, logError);
      }
    });


  }


  handleButtonClick = () => {
    console.log('clikced button');
    if (this.platform.is('android')) {
        AlanVoice.toggle();
    } else {
      this.router.navigate(['/tabs/tab3']);
    }
}

  handleReplyState = () => {
    this.dialogState = 'REPLY';
    this.setButtonColor('REPLY');

    }
    handleProcessState = () => {
      this.dialogState = 'PROCESS';
      this.setButtonColor('PROCESS');

     }
     handleListenState = () => {

      this.dialogState = 'LISTEN';
      this.setButtonColor('LISTEN');

     }
     handleIdleState = () => {
      this.dialogState = 'IDLE';
      this.setButtonColor('IDLE');

     }

     getButtonColor = (state) => {
        const colors = new Map([['IDLE', 'light'], ['LISTEN', 'secondary'], ['PROCESS', 'danger'], ['REPLY', 'success']]);


        return colors.get(state);
     }

     setButtonColor = (state: String) => {
       this.currentButtonColor = this.getButtonColor(state);
     }
  }

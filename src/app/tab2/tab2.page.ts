import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
declare var AlanVoice: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  constructor(public changeDetectorRef: ChangeDetectorRef, public platform: Platform) { }

  dialogState = 'IDLE';
  currentButtonColor = 'light';
  alanText = '';
  events = 'my event not set';




  ngOnInit() {
    console.log('loaded');
    this.platform.ready().then(() => {


      console.log('loaded ready platform ion');
      const logError = error => console.log(error)
      AlanVoice.subscribeToTextEvent((text: string) => {
        console.log(text);
        console.log('event text fires');
        this.alanText = text;
        this.changeDetectorRef.detectChanges();
      }, logError);
      AlanVoice.subscribeToEvents((event: string) => {
        this.events = event;
        console.log(event);
        this.changeDetectorRef.detectChanges();
      }, logError);
      AlanVoice.subscribeToDialogState((state: string) => {
        console.log('in dialogstate callback js')
        this.dialogState = state;
        this.changeDetectorRef.detectChanges();
      }, logError);

    });


  }

  ionViewWillUnload = () => {

  }

  handleButtonClick = () => {
    console.log('clikced button')
    AlanVoice.toggle((state) => {
    console.log('toggle callback');


    }, (error) => console.error('myError' + error)
    );



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

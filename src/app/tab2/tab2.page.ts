import { ChangeDetectorRef, Component } from '@angular/core';
declare var AlanVoice: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {

  constructor(public changeDetectorRef: ChangeDetectorRef){

  }

  dialogState = 'IDLE';
  currentButtonColor = 'light';

  dialogStatex = 'IDLE';
  currentButtonColorx = 'light';

  handleButtonClick = () => {
    AlanVoice.toggle((state) => {
    console.log(state);
    this.dialogState = state;
    this.changeDetectorRef.detectChanges();
    // switch (state) {
    //   case 'IDLE':
    //     this.handleIdleState();
    //     break;
    //   case 'LISTEN':
    //     this.handleListenState();
    //     break;
    //   case 'PROCESS':
    //     this.handleProcessState();
    //   break;
    //   case 'REPLY':
    //     this.handleReplyState();
    //   break;
    // }
    }, (error) => console.error('myError' + error)
    );
  }

  handleButtonClickx = () => {
    this.currentButtonColorx = this.currentButtonColorx === 'danger' ? 'primary' : 'danger';
    this.dialogStatex = 'talking';
  }

  handleReplyState = () => {
    this.dialogState = 'REPLY';
    console.log('reply');
    this.setButtonColor('REPLY');
    console.log(this.currentButtonColor);

    }
    handleProcessState = () => {
      console.log(this.currentButtonColor);
      this.dialogState = 'PROCESS';
      console.log('pr');
      this.setButtonColor('PROCESS');

     }
     handleListenState = () => {
      console.log(this.currentButtonColor);

      this.dialogState = 'LISTEN';
      console.log('lis');
      this.setButtonColor('LISTEN');

     }
     handleIdleState = () => {
      console.log(this.currentButtonColor);
      this.dialogState = 'IDLE';
      console.log('idle');
      this.setButtonColor('IDLE');

     }

     getButtonColor = (state) => {
        const colors = new Map([['IDLE', 'light'], ['LISTEN', 'secondary'], ['PROCESS', 'danger'], ['REPLY', 'success']]);
        console.log(colors.get(state));


        return colors.get(state);
     }

     setButtonColor = (state: String) => {
       this.currentButtonColor = this.getButtonColor(state);
     }
  }

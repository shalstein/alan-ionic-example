import { Component } from '@angular/core';
declare var AlanVoice: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  handleButtonClick = () => {
    AlanVoice.toggle((dialogState) => {
    console.log(dialogState);
    switch (dialogState) {
      case 'IDLE':
        this.handleIdleState();
        break;
      case 'LISTEN':
        this.handleListenState();
        break;
      case 'PROCESS':
        this.handleProcessState();
      break;
      case 'REPLY':
        this.handleReplyState();
      break;
    }
    }, (error) => console.error('myError' + error));
  }

  handleReplyState = () => {
    let a = 1 + 3;
    }
    handleProcessState = () => {
      let a = 1 + 3;
     }
     handleListenState = () => {
      let a = 1 + 3;
     }
     handleIdleState = () => {
      let a = 1 + 3;
     }
  }



// case IDLE: 
//       setIdleState();
//       break;
//     case LISTEN: 
//       setListenState();
//       break;
//     case PROCESS: 
//       setUnderstoodState();
//       break;
//     case REPLY: 
//       setSpeakBackState();
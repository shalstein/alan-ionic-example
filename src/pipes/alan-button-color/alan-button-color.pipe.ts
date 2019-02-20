import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alanButtonColor'
})
export class AlanButtonColorPipe implements PipeTransform {

  transform(dialogState: string): string {

    console.log(dialogState, 'of or pipe');
    const colors = {IDLE: 'light', LISTEN: 'secondary', PROCESS: 'danger', REPLY: 'success'};
    console.log('in the pipe ', colors[dialogState]);

    return colors[dialogState];
  }



}

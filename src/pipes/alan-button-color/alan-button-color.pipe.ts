import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alanButtonColor'
})
export class AlanButtonColorPipe implements PipeTransform {

  transform(dialogState: string): string {

    const colors = {IDLE: 'light', LISTEN: 'secondary', PROCESS: 'danger', REPLY: 'success'};

    return colors[dialogState];
  }



}

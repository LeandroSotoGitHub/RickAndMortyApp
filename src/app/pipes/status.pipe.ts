import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'Dead':
        return 'Muerto';
      case 'Alive':
        return 'Vivo';
      case 'Unknown':
        return 'Desconocido';
      default:
        return value;
    }
  }
}

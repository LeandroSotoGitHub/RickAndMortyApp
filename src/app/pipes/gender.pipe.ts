import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: string): string{
    switch (value) {
      case 'Female':
        return 'Femenino';
      case 'Male':
        return 'Masculino';
      case 'Genderless':
        return 'Gin género';
      case 'Unknown':
        return 'Desconocido';
      default:
        return value;
    }
  }

}

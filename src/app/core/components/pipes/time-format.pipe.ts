import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    const [hours, minutes] = value.split(':').map(num => parseInt(num, 10));

    let period = 'AM';
    let newHours = hours;

    if (hours >= 12) {
      period = 'PM';
      if (hours > 12) {
        newHours = hours - 12;
      }
    } else if (hours === 0) {
      newHours = 12;
    }

    return `${newHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToMinutes',
})
export class SecondsToMinutesPipe implements PipeTransform {
  transform(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    return (
      minutes.toString().padStart(2, '0') +
      ':' +
      (seconds - minutes * 60).toString().padStart(2, '0')
    );
  }
}

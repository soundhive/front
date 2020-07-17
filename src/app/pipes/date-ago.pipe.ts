// tslint:disable: forin
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo',
})
export class DateAgoPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      // `+` is to get the timestamp value in milliseconds
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 30) {
        // less than 30 seconds ago will show as 'Just now'
        return 'Just now';
      }
      const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
      };
      let counter: number;
      for (const intervalName in intervals) {
        counter = Math.floor(seconds / intervals[intervalName]);
        if (counter > 0) {
          // if at least 1 * current interval
          // i.e. if interval is year, value will be >= 1 year
          if (counter === 1) {
            // singular (1 day ago)
            return counter + ' ' + intervalName + ' ago';
          } else {
            // plural (2 days ago)
            return counter + ' ' + intervalName + 's ago';
          }
        }
      }
    }
    return value;
  }
}

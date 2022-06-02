import { Pipe, PipeTransform } from '@angular/core';
import { historyList } from './game/game.component';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(items: Array<historyList>, sortByTime: boolean): Array<historyList> {
    if (sortByTime) {
      return items.sort((a, b) => a.timeStamp - b.timeStamp); // ascending
    } else {
      return items.sort((a, b) => b.timeStamp - a.timeStamp); // descending
    }
  }
}
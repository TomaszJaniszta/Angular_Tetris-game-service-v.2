import { Pipe, PipeTransform } from '@angular/core';
import { historyList } from './game/game.component';

@Pipe({
  name: 'filterEvents',
})

export class FilterPipe implements PipeTransform {
  transform(items: Array<historyList>,
            selectedOption: string,
            historyListLenght?: number // optional to refresh data pipe on change / filter on
            ): Array<historyList> {
    if (selectedOption === 'All') {
      return items
    } else {
    let filteredArray = items.filter(
      (item) => item.gameEvent === selectedOption );
      return filteredArray;
    }
  }
}
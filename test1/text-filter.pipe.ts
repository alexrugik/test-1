import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textFilter',
})
export class TextFilterPipe<G> implements PipeTransform {
  transform(items: G[], text: string, filterCallback: (item: G, text: string) => boolean) {
    if (!text) {
      return items;
    }
    if (!filterCallback) {
      throw new Error('TextFilterPipe not working correctly!');
    }
    return items.filter((item) => filterCallback(item, text));
  }
}

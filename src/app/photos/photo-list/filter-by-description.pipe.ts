import { Pipe, PipeTransform } from '@angular/core';

import { Photo } from '../photo/photo';

@Pipe({ name: 'filterByDescription' })
export class FilterByDescriptionPipe implements PipeTransform {
    transform(photos: Photo[], descriptionFilter: string) {
        descriptionFilter = descriptionFilter
            .trim()
            .toLowerCase();

        if(descriptionFilter) {
            return photos.filter(photo =>
                photo
                    .description
                    .toLowerCase()
                    .includes(descriptionFilter)
            );
        }
        
        return photos;
    }

}
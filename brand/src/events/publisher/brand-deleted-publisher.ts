import {Publisher, BrandDeletedEvent, Subjects} from '@hoteldev/common';


export class BrandDeletePublisher extends Publisher<BrandDeletedEvent> {
  subject: Subjects.BrandDelete = Subjects.BrandDelete;
}

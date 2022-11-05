import {Publisher, BrandUpdatedEvent, Subjects} from '@hoteldev/common';


export class BrandUpdatedPublisher extends Publisher<BrandUpdatedEvent> {
  subject: Subjects.BrandUpdate = Subjects.BrandUpdate;
}

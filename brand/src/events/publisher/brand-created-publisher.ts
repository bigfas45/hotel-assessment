import {Publisher, BrandCreatedEvent, Subjects} from '@hoteldev/common';


export class BrandCreatedPublisher extends Publisher<BrandCreatedEvent> {
  subject: Subjects.BrandCreated = Subjects.BrandCreated;
}

import { Message } from 'node-nats-streaming';
import { Subjects, Listener, BrandCreatedEvent } from '@hoteldev/common';
import { Brand } from '../../models/brand';
import { queueGroupName } from './queue-group-name';

export class BrandCreatedListener extends Listener<BrandCreatedEvent> {
  subject: Subjects.BrandCreated = Subjects.BrandCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: BrandCreatedEvent['data'], msg: Message) {
    const { id, name } = data;
    const brand = Brand.build({
      id,
      name,
    });

    try {
      await brand.save();
      console.log('Brand Created', brand);
    } catch (error) {
      console.log(error);
    }

    msg.ack();
  }
}

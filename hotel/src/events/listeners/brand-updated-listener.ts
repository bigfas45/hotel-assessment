import { Message } from 'node-nats-streaming';
import {
  Subjects,
  Listener,
  BrandUpdatedEvent,
  BadRequestError,
  NotFoundError,
} from '@hoteldev/common';
import { Brand } from '../../models/brand';
import { queueGroupName } from './queue-group-name';

export class BrandUpdatedListener extends Listener<BrandUpdatedEvent> {
  subject: Subjects.BrandUpdate = Subjects.BrandUpdate;
  queueGroupName = queueGroupName;

  async onMessage(data: BrandUpdatedEvent['data'], msg: Message) {
    console.log(data);
    const brand = await Brand.findByEvent(data);


    try {
      if (!brand) {
        throw new BadRequestError('brand not found..');
      }
      const { id, name } = data;

      brand.set({
        id,
        name,
      });
      await brand.save();
    } catch (error) {
      console.log(error)
    }

    msg.ack();
  }
}

import { Message } from 'node-nats-streaming';
import {
  Subjects,
  Listener,
  BrandDeletedEvent,
  BadRequestError,
  NotFoundError,
} from '@hoteldev/common';
import { Brand } from '../../models/brand';
import { queueGroupName } from './queue-group-name';

export class BrandDeletedListener extends Listener<BrandDeletedEvent> {
  subject: Subjects.BrandDelete = Subjects.BrandDelete;
  queueGroupName = queueGroupName;

  async onMessage(data: BrandDeletedEvent['data'], msg: Message) {
    console.log(data);
    const brand = await Brand.findByEventDelete(data);

    console.log(brand)

    try {
      if (!brand) {
        throw new BadRequestError('brand not found..');
      }

  
      await brand.remove();

    } catch (error) {
      // console.log(error)
    }

    msg.ack();
  }
}

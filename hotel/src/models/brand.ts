import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
interface BrandAttrs {
  id: string;

  name: string;
}

interface BrandDoc extends mongoose.Document {
  id: string;

  name: string;
  version: number;
}

interface BrandModel extends mongoose.Model<BrandDoc> {
  build(attrs: BrandAttrs): BrandDoc;
  findByEvent(event: { id: string; version: number }): Promise<BrandDoc | null>;
  findByEventDelete(event: { id: string; version: number }): Promise<BrandDoc | null>;
}

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

BrandSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

BrandSchema.set('versionKey', 'version');
BrandSchema.plugin(updateIfCurrentPlugin);

BrandSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  console.log('event', event);
  return Brand.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

BrandSchema.statics.findByEventDelete = (event: { id: string; version: number }) => {
  console.log('event', event);
  return Brand.findOne({
    _id: event.id,
    version: event.version ,
  });
};

BrandSchema.statics.build = (attrs : BrandAttrs) => {
  return new Brand({
    _id: attrs.id,
    name: attrs.name,

  });
};

const Brand = mongoose.model<BrandDoc, BrandModel>('Brand', BrandSchema);

export { Brand };

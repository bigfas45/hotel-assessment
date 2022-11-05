import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
interface HotelsAttrs {
  name: string;
  city: string;
  country: string;
  address: string;
  brand: mongoose.Types.ObjectId;
  location?: object;
}

interface HotelsDoc extends mongoose.Document {
  name: string;
  version: number;
  city: string;
  country: string;
  address: string;
  brand: mongoose.Types.ObjectId;
  location?: object;
}

interface HotelsModel extends mongoose.Model<HotelsDoc> {
  build(attrs: HotelsAttrs): HotelsDoc;
}

const HotelsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    city: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

HotelsSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

HotelsSchema.set('versionKey', 'version');
HotelsSchema.plugin(updateIfCurrentPlugin);

HotelsSchema.statics.build = (attrs: HotelsAttrs) => {
  return new Hotels(attrs);
};

const Hotels = mongoose.model<HotelsDoc, HotelsModel>('Hotels', HotelsSchema);

export { Hotels };

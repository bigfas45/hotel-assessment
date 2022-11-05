import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
interface BrandAttrs {
  name: string;
}

interface BrandDoc extends mongoose.Document {
  name: string;
  version: number;
}

interface BrandModel extends mongoose.Model<BrandDoc> {
  build(attrs: BrandAttrs): BrandDoc;
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

BrandSchema.statics.build = (attrs: BrandAttrs) => {
  return new Brand(attrs);
};

const Brand = mongoose.model<BrandDoc, BrandModel>('Brand', BrandSchema);

export { Brand };

import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'vendor', 'user'], required: true },
  category: { type: String, enum: ['Catering', 'Florist', 'Decoration', 'Lighting'] },
}, { timestamps: true });

export const User = models.User || model('User', UserSchema);

const ProductSchema = new Schema({
  vendorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
}, { timestamps: true });

export const Product = models.Product || model('Product', ProductSchema);

const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  vendorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Received', 'Ready for Shipping', 'Out For Delivery'], default: 'Received' },
  customerDetails: {
    name: String,
    email: String,
    address: String,
    city: String,
    number: String,
    paymentMethod: String,
    state: String,
    pinCode: String
  }
}, { timestamps: true });

export const Order = models.Order || model('Order', OrderSchema);

const MembershipSchema = new Schema({
  vendorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  membershipNumber: { type: String, required: true, unique: true },
  duration: { type: String, enum: ['6 months', '1 year', '2 years'], required: true },
  expiresAt: { type: Date, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const Membership = models.Membership || model('Membership', MembershipSchema);

const GuestSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  status: { type: String, enum: ['Invited', 'Confirmed', 'Declined'], default: 'Invited' }
}, { timestamps: true });

export const Guest = models.Guest || model('Guest', GuestSchema);

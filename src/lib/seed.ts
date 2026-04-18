import mongoose from 'mongoose';
import connectToDatabase from './db';
import { User, Product } from '../models';

const seedData = async () => {
  try {
    await connectToDatabase();
    console.log('Connected to database for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data.');

    // Seed Admin
    const admin = await User.create({
      name: 'Super Admin',
      email: 'admin@event.com',
      password: 'admin',
      role: 'admin'
    });
    console.log('Created Admin user.');

    // Seed Vendors
    const cateringVendor = await User.create({
      name: 'Deluxe Catering',
      email: 'catering@vendor.com',
      password: 'vendor',
      role: 'vendor',
      category: 'Catering'
    });

    const floristVendor = await User.create({
      name: 'Bloom Florals',
      email: 'florist@vendor.com',
      password: 'vendor',
      role: 'vendor',
      category: 'Florist'
    });
    console.log('Created Vendor users.');

    // Seed Products
    await Product.create([
      {
        vendorId: cateringVendor._id,
        name: 'Gourmet Buffet',
        price: 1500,
        imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400'
      },
      {
        vendorId: cateringVendor._id,
        name: 'Wedding Cake',
        price: 500,
        imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400'
      },
      {
        vendorId: floristVendor._id,
        name: 'Rose Bouquet',
        price: 120,
        imageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400'
      }
    ]);
    console.log('Created products.');

    // Seed Regular User
    await User.create({
      name: 'John Doe',
      email: 'user@user.com',
      password: 'user',
      role: 'user'
    });
    console.log('Created regular User.');

    console.log('Seeding completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedData();

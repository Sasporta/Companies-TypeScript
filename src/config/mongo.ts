import mongoose from 'mongoose';

import config from '.';

const { mongo: { mongoUrl } } = config;

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoUrl);

    console.log('MongoDB has been connected!');
  } catch (error) {
    console.error('Error during MongoDB connection ', error);
  }
};

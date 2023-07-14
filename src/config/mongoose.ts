import mongoose from 'mongoose';

// Define the connection URI
const uri = `mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`;
// Set up the Mongoose connection
mongoose.connect(uri);
const AppDataSource = mongoose.connection;

export default AppDataSource;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const DataSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
});

const DataModel = mongoose.model('Data', DataSchema);

exports.handler = async (event, context) => {
  try {
    const data = await DataModel.find();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching data' }),
    };
  }
};

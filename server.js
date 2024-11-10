require('dotenv').config(); // Load environment variables for sensitive data (like Mongo URI)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable Cross-Origin Requests (for frontend access)
app.use(express.json()); // Parse incoming JSON requests

// MongoDB connection using environment variable for security
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Define your data schema and model
const DataSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
});
const DataModel = mongoose.model('Data', DataSchema);

// API route to fetch data from MongoDB
app.get('/api/getData', async (req, res) => {
  try {
    const data = await DataModel.find(); // Fetch all records
    res.json(data);  // Return the data as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// Start the server on port 3000 (or any available port)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

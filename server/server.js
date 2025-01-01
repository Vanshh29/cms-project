const express = require('express');
const cors = require('cors');
const wordsRouter = require('./routes/words');

const app = express();
app.use(cors());
app.use(express.json());

// Use the /api/words route
app.use('/api/words', wordsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
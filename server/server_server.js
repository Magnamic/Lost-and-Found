const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3001;

// In-memory DB, replace with real DB in production
let items = [];

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
const upload = multer({ storage: storage });

app.post('/api/items', upload.single('image'), (req, res) => {
  const { itemType, studentName } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`;
  const id = Date.now();
  items.push({ id, itemType, studentName, imageUrl, claimed: false });
  res.json({ id });
});

app.get('/api/items', (req, res) => {
  const { itemType, onlyUnclaimed } = req.query;
  let filtered = items.filter(i => !onlyUnclaimed || !i.claimed);
  if (itemType) filtered = filtered.filter(i => i.itemType === itemType);
  res.json(filtered);
});

app.post('/api/items/:id/claim', (req, res) => {
  const item = items.find(i => i.id == req.params.id);
  if (item && !item.claimed) {
    item.claimed = true;
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Item not found or already claimed' });
  }
});

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
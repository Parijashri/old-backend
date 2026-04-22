require('dotenv').config();
const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const aiRoutes = require('./routes/ai');
const authRoutes    = require('./routes/auth');
const itemRoutes    = require('./routes/items');
const ideaRoutes    = require('./routes/ideas');
const likeRoutes    = require('./routes/likes');
const historyRoutes = require('./routes/history');
const adminRoutes   = require('./routes/admin');
 
const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());
 
app.use('/api/auth',    authRoutes);
app.use('/api/items',   itemRoutes);
app.use('/api/ideas',   ideaRoutes);
app.use('/api/likes',   likeRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/admin',   adminRoutes);
 app.use('/api/ai', aiRoutes);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✦ MongoDB connected');
    app.listen(process.env.PORT || 4000, () =>
      console.log(`✿ Server running on port ${process.env.PORT || 4000}`)
    );
  })
  .catch(err => { console.error('MongoDB error:', err); process.exit(1); });
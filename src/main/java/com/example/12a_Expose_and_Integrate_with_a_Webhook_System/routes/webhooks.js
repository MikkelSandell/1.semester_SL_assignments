import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import db from '../utils/db.js';
import { triggerWebhooks } from '../utils/triggerWebhooks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

function loadWebhooks() {
  const rows = db.prepare('SELECT url, events FROM webhooks').all();
  return rows.map(row => ({
    url: row.url,
    events: JSON.parse(row.events)
  }));
}

router.post('/register', async (req, res) => {
  try {
    const { url, events } = req.body;

    if (!url || !Array.isArray(events)) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    db.prepare('INSERT INTO webhooks (url, events) VALUES (?, ?)').run(url, JSON.stringify(events));

    try {
      await axios.post(url, {
        event: 'register',
        payload: { message: 'Webhook registered successfully' }
      });
    } catch (e) {
      console.warn('⚠️ Could not send register confirmation:', e.message);
    }

    console.log(`✅ Webhook registered: ${url} for events: [${events.join(', ')}]`);
    res.json({ message: 'Webhook registered successfully' });
  } catch (error) {
    console.error('🔥 Error in /register:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/unregister', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    db.prepare('DELETE FROM webhooks WHERE url = ?').run(url);

    try {
      await axios.post(url, {
        event: 'unregister',
        payload: { message: 'Webhook unregistered successfully' }
      });
    } catch (e) {
      console.warn('⚠️ Could not send unregister confirmation:', e.message);
    }

    console.log(`❌ Webhook unregistered: ${url}`);
    res.json({ message: 'Webhook unregistered successfully' });
  } catch (error) {
    console.error('🔥 Error in /unregister:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/ping', async (req, res) => {
  const webhooks = loadWebhooks();
  const results = await triggerWebhooks('ping', { message: 'This is a test ping' }, webhooks);
  res.json({ results });
});

router.post('/trigger', async (req, res) => {
  const { event, payload } = req.body;
  if (!event || !payload) {
    return res.status(400).json({ error: 'Missing event or payload' });
  }
  const webhooks = loadWebhooks();
  const results = await triggerWebhooks(event, payload, webhooks);
  res.json({ results });
});

export default router;

import axios from 'axios';

export async function triggerWebhooks(event, payload, webhooks) {
  const matching = event === 'ping'
    ? webhooks
    : webhooks.filter(hook => hook.events.includes(event));

  const results = [];

  for (const hook of matching) {
    try {
      const response = await axios.post(
        hook.url,
        { event, payload },
        { timeout: 3000 } // ⏱️ Timeout added here
      );
      results.push({ url: hook.url, status: response.status });
    } catch (err) {
      results.push({ url: hook.url, error: err.message });
    }
  }

  return results;
}

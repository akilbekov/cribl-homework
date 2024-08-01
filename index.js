import { parseArgs } from 'node:util';

(async () => {
  const options = {
    url: { type: 'string', default: 'http://ergast.com/api/f1/drivers.json' },
  };
  const { values } = parseArgs({ options });

  try {
    const response = await fetch(values.url);
    if (response.ok) {
      const response_body = await response.json();
      try {
        const hec = await fetch(`${process.env.URL}`, {
          method: 'POST',
          body: JSON.stringify({
            event: response_body,
            index: `${process.env.INDEX}` || 'default',
            sourcetype: `${process.env.SOURCETYPE}` || 'httpevent',
          }),
          headers: {
            Authorization: `${process.env.TOKEN}`,
          },
        });
        if (hec.ok) {
          console.log('File sent, HTTP', hec.status);
        } else {
          if (hec.status === 400) throw new Error('400, Bad request');
          if (hec.status === 401) throw new Error('403, Unauthorized');
          if (hec.status === 403) throw new Error('403, Forbidden');
          if (hec.status === 500) throw new Error('500, Internal server error');
          if (hec.status === 503) throw new Error('503, Service unavailable');
          throw new Error(hec.status);
        }
      } catch (err) {
        console.error('Sending', err);
      }
    } else {
      if (response.status === 404) throw new Error('404, Not found');
      if (response.status === 500) throw new Error('500, Internal server error');
      throw new Error(response.status);
    }
  } catch (err) {
    console.error('Fetching', err);
  }
})();

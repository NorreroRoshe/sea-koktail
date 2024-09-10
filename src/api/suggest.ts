import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({ error: 'Text query is required' });
  }

  try {
    const response = await axios.get(
      `https://suggest-maps.yandex.ru/v1/suggest`,
      {
        params: {
          apikey: process.env.NEXT_PUBLIC_YANDEX_API_KEY, // ключ в .env
          text,
          ll: '55.75583,37.61778',
          lang: 'ru_RU',
          type: 'geo',
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching suggestions' });
  }
}

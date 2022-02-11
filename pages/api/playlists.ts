import { NextApiHandler } from 'next';
import { getToken } from 'next-auth/jwt';

import { getUsersPlaylists } from '../../lib/spotify';

const handler: NextApiHandler = async (req, res) => {
  const token = await getToken({ req });
  if (token == null) {
    return res.status(500).json({ error: 'User is not authenticated' });
  }
  const response = await getUsersPlaylists(token.accessToken as string);
  const { items } = await response.json();

  return res.status(200).json({ items });
};

export default handler;

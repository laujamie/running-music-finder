import type { NextPage } from 'next';
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [list, setList] = useState([]);

  const getMyPlaylists = async () => {
    const res = await fetch('/api/playlists');
    const { items } = await res.json();
    setList(items);
  };

  if (session != null) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <hr />
        <button onClick={() => getMyPlaylists()}>Get all my playlists</button>
        {list.map((item: any) => (
          <div key={item.id}>
            <h1>{item.name}</h1>
            <img src={item.images[0]?.url} width="100" />
          </div>
        ))}
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default Home;

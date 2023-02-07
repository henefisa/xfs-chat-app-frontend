import { createContext, useState, useEffect, useContext } from 'react';
import Peer from 'peerjs';
import { useAppSelector } from 'src/store/hooks';
import { selectUserProfile } from 'src/store/userSlice';
import type { FC, ReactNode, Dispatch, SetStateAction } from 'react';
import type { Peer as TPeer } from 'peerjs';

export const PeerContext = createContext<
  [Peer | undefined, Dispatch<SetStateAction<Peer | undefined>>]
>([
  undefined,
  () => {
    return;
  },
]);

const PeerProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [peer, setPeer] = useState<TPeer>();
  const userProfileStore = useAppSelector(selectUserProfile);

  useEffect(() => {
    if (!userProfileStore?.id) return;

    const chunksBySlash = (
      import.meta.env.VITE_APP_API_BASE_URL as string
    ).split('/');
    const hostNameAndPort = chunksBySlash[2].split(':');

    console.log(hostNameAndPort[0], +hostNameAndPort[1], location.hostname);

    const peer = new Peer(userProfileStore?.id, {
      secure: true,
      host: hostNameAndPort[0],
      port: +hostNameAndPort[1],
      path: '/peerjs',
      debug: 3,
    });
    peer.on('open', (id) => {
      console.log('peer id', id);
    });
    setPeer(peer);
  }, [userProfileStore?.id]);

  return (
    <PeerContext.Provider value={[peer, setPeer]}>
      {children}
    </PeerContext.Provider>
  );
};

export default PeerProvider;

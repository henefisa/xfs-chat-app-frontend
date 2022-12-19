import { Peer } from 'peerjs';
import * as React from 'react';

interface ITestPeerProps {}

const TestPeer: React.FC<ITestPeerProps> = () => {
  const [myId, setMyId] = React.useState<string>();
  const [remotePeerIdValue, setRemotePeerIdValue] = React.useState('');
  const [isMute, setIsMute] = React.useState(true);

  const remoteVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const currentUserVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const peerInstance = React.useRef<Peer | null>(null);
  const answerBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const denyBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const leaveBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const muteBtnRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    const peer = new Peer();

    peer.on('open', (id) => {
      setMyId(id);
    });

    peer.on('call', (call) => {
      const getUserMedia = navigator.mediaDevices.getUserMedia;

      getUserMedia({ video: { width: 300, height: 200 }, audio: true }).then(
        (mediaStream) => {
          answerBtnRef.current?.addEventListener('click', () => {
            if (currentUserVideoRef.current) {
              currentUserVideoRef.current.srcObject = mediaStream;
              currentUserVideoRef.current.play();
            }

            call.answer(mediaStream);
            call.on('stream', (remoteStream) => {
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
                remoteVideoRef.current.play();
              }
            });
          });

          denyBtnRef.current?.addEventListener('click', () => {
            call.close();
          });
        }
      );
    });

    leaveBtnRef.current?.addEventListener('click', () => {
      peer.destroy();
    });

    // muteBtnRef.current?.addEventListener('click', () => {
    //   setIsMute(!isMute);
    // });

    peerInstance.current = peer;

    return () => {
      leaveBtnRef.current?.removeEventListener('click', () => {
        peer.destroy();
      });
    };
  }, []);

  const call = (remotePeerId: string) => {
    const getUserMedia = navigator.mediaDevices.getUserMedia;

    getUserMedia({ video: { width: 300, height: 200 }, audio: true }).then(
      (mediaStream) => {
        if (currentUserVideoRef.current) {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
        }

        const call = peerInstance.current?.call(remotePeerId, mediaStream);

        call?.on('stream', (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          }
        });
      }
    );
  };

  return (
    <div className="test-peer">
      <h1>{`Current user id is "${myId}"`}</h1>
      <input
        type="text"
        value={remotePeerIdValue}
        onChange={(e) => setRemotePeerIdValue(e.target.value)}
      />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <div>
        <h3>myVideo</h3>
        <video ref={currentUserVideoRef} />
      </div>
      <button ref={answerBtnRef}>Answer</button>
      <button ref={denyBtnRef}>Deny</button>
      <button ref={leaveBtnRef}>Leave</button>
      <button ref={muteBtnRef}>{isMute ? 'Mute' : 'UnMute'}</button>
      <div>
        <h3>friendVideo</h3>
        <video ref={remoteVideoRef} />
      </div>
    </div>
  );
};

export default TestPeer;

import * as React from 'react';
import { SocketContext } from 'src/context/socket/context';

async function getConnectedDevices(type: string) {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === type);
}

async function openCamera(
  cameraId: string,
  minWidth: number,
  minHeight: number
) {
  const constraints: MediaStreamConstraints = {
    audio: { echoCancellation: true },
    video: {
      deviceId: cameraId,
      width: { min: minWidth },
      height: { min: minHeight },
    },
  };

  return navigator.mediaDevices.getUserMedia(constraints);
}

const Test: React.FC = () => {
  const [id, setId] = React.useState('');
  const socket = React.useContext(SocketContext);

  React.useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    socket.on('video-offer', async (data: any) => {
      const description = new RTCSessionDescription(data.sdp);
      await peerConnection.setRemoteDescription(description);
    });

    socket.on('video-answer', async (data: any) => {
      const description = new RTCSessionDescription(data.sdp);
      await peerConnection.setRemoteDescription(description);
    });
  }, [socket]);

  const peerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: ['stun:stun.l.google.com:19302'],
      },
    ],
  });

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit('new-ice-candidate', {
        target: 'AAA',
        candidate: event.candidate,
      });
    }
  };

  peerConnection.ontrack = (event) => {
    if (!ref.current) return;

    ref.current.srcObject = event.streams[0];
  };

  peerConnection.onnegotiationneeded = async (event) => {
    const offer = await peerConnection.createOffer();

    peerConnection.setLocalDescription(offer);

    socket.emit('video-offer', {
      name: 'NEGOATION NEEDED',
      sdp: peerConnection.localDescription,
    });
  };

  const ref = React.useRef<HTMLVideoElement | null>(null);
  const localVideoRef = React.useRef<HTMLVideoElement | null>(null);

  const handleClick = async () => {
    if (!localVideoRef.current || !ref.current) return;

    const cameras = await getConnectedDevices('videoinput');
    if (cameras && cameras.length > 0) {
      // Open first available video camera with a resolution of 1280x720 pixels
      const stream = await openCamera(cameras[0].deviceId, 1280, 720);

      stream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, stream));

      const offer = await peerConnection.createOffer();

      peerConnection.setLocalDescription(offer);

      socket.emit('video-offer', {
        name: 'AAA',
        target: 'BBB',
        sdp: peerConnection.localDescription,
      });

      localVideoRef.current.srcObject = stream;
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Call</button>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />

      <video ref={ref} autoPlay playsInline controls={false} />
      <video ref={localVideoRef} autoPlay playsInline controls={false} />
      <button
        onClick={() => {
          socket.connect();
        }}
      >
        Click
      </button>
    </div>
  );
};

export default Test;

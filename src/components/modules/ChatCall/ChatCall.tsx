import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { CloseOutlined, PhoneOutlined } from '@ant-design/icons';
import Button from '@common/Button/Button';
import Modal from '@common/Modal/Modal';
import AvatarConversation from 'src/components/modules/AvatarConversation/AvatarConversation';
import './ChatCall.scss';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectConversation } from 'src/store/conversationSlice';
import type { DataConnection, MediaConnection } from 'peerjs';
import { selectUserProfile } from 'src/store/userSlice';
import getMemberConversation from 'src/utils/getMemberConversation';
import { PeerContext } from 'src/context/peer';
import { removeCaller } from 'src/store/callSlice';
import { message } from 'antd';

interface IChatCallProps {
  onClose(): void;
  title: string;
  isOpen: boolean;
  receivingCall?: MediaConnection;
  remoteConnection?: DataConnection;
}

const ChatCall: FC<IChatCallProps> = ({
  onClose,
  title,
  isOpen,
  receivingCall,
  remoteConnection,
}) => {
  const { selectedConversation } = useAppSelector(selectConversation);
  const userProfileStore = useAppSelector(selectUserProfile);
  const localAudioRef = useRef<HTMLAudioElement | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
  const member = getMemberConversation(selectedConversation, userProfileStore);
  const [localConnection, setLocalConnection] = useState<DataConnection>();
  const [peerStream, setPeerStream] = useState<MediaStream>();
  const [isWaitingForCallee, setIsWaitingForCallee] = useState(false);
  const [peer] = useContext(PeerContext);
  const dispatch = useAppDispatch();

  const handleOpenPeer = async () => {
    try {
      if (!localAudioRef.current) return;

      // request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });

      localAudioRef.current.srcObject = stream;
      localAudioRef.current.autoplay = true;

      // connect with peer (peer.connect)
      const con = peer?.connect(member?.id as string);

      // send data once connection open
      con?.on('open', () => {
        con?.send(userProfileStore);
      });

      // list for close event coming from the remote peer (close call from remote)
      con?.on('close', () => {
        handleClosePeer();
      });
      setLocalConnection(con);

      // call with local audio (peer.call)
      const call = peer?.call(
        member?.id as string,
        localAudioRef.current.srcObject
      );

      setIsWaitingForCallee(true);

      // callee accept the call, show the remote audio stream
      call?.on('stream', (stream) => {
        if (!remoteAudioRef.current) return;

        setIsWaitingForCallee(false);

        remoteAudioRef.current.srcObject = stream;
        remoteAudioRef.current.autoplay = true;
        setPeerStream(stream);
      });
    } catch (error) {
      console.error(`Err: ${error}`);
      message.error(
        'Please allow media permission from your computer, then refresh and try again'
      );
    }
  };

  const handleAcceptCall = async () => {
    try {
      if (!localAudioRef.current) return;

      // request microphone permission (callee's stream)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });

      localAudioRef.current.srcObject = stream;
      localAudioRef.current.autoplay = true;

      // answer the call
      receivingCall?.answer(stream);

      // listen for stream event to add remote audio (caller's audio)
      receivingCall?.on('stream', (stream) => {
        if (!remoteAudioRef.current) return;

        remoteAudioRef.current.srcObject = stream;
        remoteAudioRef.current.autoplay = true;
        setPeerStream(stream);
      });
    } catch (error) {
      console.error(`Err: ${error}`);
      handleClosePeer();
      message.error(
        'Please allow media permission from your computer, then refresh and try again'
      );
    }
  };

  // reject call from callee or close the call from caller
  const handleClosePeer = useCallback(() => {
    if (!localAudioRef.current) return;
    if (!remoteAudioRef.current) return;

    // close connection
    localConnection?.close();
    setLocalConnection(undefined);
    setPeerStream(undefined);
    dispatch(removeCaller());

    // remove stream
    const stream = localAudioRef.current.srcObject;
    const remoteStream = remoteAudioRef.current.srcObject;

    if (stream !== null) {
      const tracks = (stream as MediaStream).getTracks();

      tracks.forEach((track) => {
        track.stop();
      });
    }

    if (remoteStream !== null) {
      const tracks = (remoteStream as MediaStream).getTracks();

      tracks.forEach((track) => {
        track.stop();
      });
    }

    localAudioRef.current.srcObject = null;
    remoteAudioRef.current.srcObject = null;
    onClose();
  }, [dispatch, localConnection, onClose]);

  // close call from both side if user close the web
  useEffect(() => {
    window.addEventListener('beforeunload', handleClosePeer);

    return () => {
      window.removeEventListener('beforeunload', handleClosePeer);
    };
  }, [handleClosePeer]);

  useEffect(() => {
    // listen when caller hang up
    remoteConnection?.on('close', () => {
      handleClosePeer();
    });
  }, [remoteConnection, handleClosePeer]);

  return (
    <Modal transitionName="none" maskTransitionName="none" open={isOpen}>
      <div className="modal-body">
        <div className="modal-body__items">
          {receivingCall ? (
            <>
              <div>You have a call</div>
              <AvatarConversation imgSize={96} />
            </>
          ) : (
            <AvatarConversation imgSize={96} titleCall={title} />
          )}
          {isWaitingForCallee ? <div>Calling...</div> : null}
          <audio ref={localAudioRef} />
          <audio ref={remoteAudioRef} />
        </div>
        <div className="actions">
          <Button
            className="actions__btn actions__btn--close"
            onClick={handleClosePeer}
          >
            <CloseOutlined className="custom-icon" />
          </Button>
          {!(isWaitingForCallee || !!peerStream) && (
            <Button
              className="actions__btn actions__btn--success"
              onClick={receivingCall ? handleAcceptCall : handleOpenPeer}
            >
              <PhoneOutlined className="custom-icon" />
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ChatCall;

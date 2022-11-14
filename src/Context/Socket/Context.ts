import React from 'react';
import { Socket } from 'socket.io-client';
import { socket } from './config';

export interface ISocketContextState {
  socket: Socket;
}

export const defaultSocketContextState: ISocketContextState = {
  socket: socket,
};

export type TSocketContextActions = 'update_socket';
export type TSocketContextPayload = Socket;
export interface ISocketContextActions {
  type: TSocketContextActions;
  payload: TSocketContextPayload;
}

export const socketReducer = (
  state: ISocketContextState,
  action: ISocketContextActions
) => {
  switch (action.type) {
    case 'update_socket': {
      return {
        ...state,
        socket: action.payload as Socket,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export interface ISocketContextProps {
  SocketState: ISocketContextState;
  SocketDispatch: React.Dispatch<ISocketContextActions>;
}

export const SocketContext = React.createContext<ISocketContextProps>({
  SocketState: defaultSocketContextState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  SocketDispatch: () => {},
});

export const SocketContextConsumer = SocketContext.Consumer;
export const SocketContextProvider = SocketContext.Provider;

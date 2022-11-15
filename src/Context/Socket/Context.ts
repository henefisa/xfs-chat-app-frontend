import React from 'react';
import { Socket } from 'socket.io-client';
import { socket } from './config';

export type TSocketContextState = Socket;

export const defaultSocketContextState: TSocketContextState = socket;

export const SocketContext = React.createContext<TSocketContextState>(
  defaultSocketContextState
);

export const SocketContextConsumer = SocketContext.Consumer;
export const SocketContextProvider = SocketContext.Provider;

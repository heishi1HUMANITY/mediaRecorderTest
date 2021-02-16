'use strict';

import * as io from 'socket.io-client';

export const socket = io.io();

export const sendBlobData = (event: string, data: Blob): void => {
  socket.emit(event, data);
};

export const sendStringData = (event: string, data: string): void => {
  socket.emit(event, data);
};
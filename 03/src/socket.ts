'use strict';

import * as io from 'socket.io-client';

export const socket = io.io();

export const sendBlobData = (event: string, data: Blob) => {
  socket.emit(event, data);
};
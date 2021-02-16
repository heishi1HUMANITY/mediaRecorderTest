'use strict';

import * as stream from './stream';
import { socket, sendBlobData } from './socket';

const startStreamButton = document.querySelector('#stream');

startStreamButton.addEventListener('click', async (): Promise<void> => {
  try {
    const localStream: MediaStream = await stream.startAudioStream();
    const [recorder, chunks] = stream.getMediaRecorder(localStream);
    startStreamButton.setAttribute('disabled', '');
    recorder.addEventListener('stop', () => {
      const blobTmp: Blob = new Blob(chunks);
      chunks.splice(0, chunks.length);
      sendBlobData('send', blobTmp);
    });
    stream.startMediaRecorder(recorder);
    setInterval((): void => {
      stream.stopMediaRecorder(recorder);
      stream.startMediaRecorder(recorder);
    }, 1000);
  } catch (err) {
    return;
  }
});

socket.on('update', (data: ArrayBuffer): void => {
  let audio: HTMLAudioElement = document.createElement('audio');
  const blobTmp: Blob = new Blob([data]);
  const url: string = URL.createObjectURL(blobTmp);
  audio.src = url;
  audio.play();
  audio.addEventListener('ended', (): void => {
    audio = null;
  })
});

'use strict';

export const startAudioStream = async (): Promise<MediaStream> => {
  try {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    return localStream
  }
  catch (err: any) {
    throw new Error(err);
  }
};

export const getMediaRecorder = (localStream: MediaStream): [ recorder: MediaRecorder, chunks: Blob[] ] => {
  const recorder: MediaRecorder = new MediaRecorder(localStream);
  const chunks: Blob[] = [];
  recorder.addEventListener('dataavailable', (e: BlobEvent) => {
    chunks.push(e.data);
  });
  return [recorder, chunks]
};

export const startMediaRecorder = (recorder: MediaRecorder): void => {
  recorder.start();
};

export const stopMediaRecorder = (recorder: MediaRecorder): void => {
  recorder.stop();
};

'use strict';

const encoder = new TextEncoder();

export const hash = async (string: string): Promise<string> => {
  const uint8: Uint8Array = encoder.encode(string);
  const buffer: ArrayBuffer = await crypto.subtle.digest('SHA-256', uint8);
  const hash = Array.from(new Uint8Array(buffer)).map(v => v.toString(16).padStart(2, '0')).join('');
  return hash;
};
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcRenderer, contextBridge } from 'electron';
import EventChannel from './shared/EventChannel';

contextBridge.exposeInMainWorld(
  "electron", {
    send: (channel: string, data: any): void => {
      const validChannels = Object.values(EventChannel);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    on: (channel: string, func: any): void => {
      const validChannels = Object.values(EventChannel);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event: any, ...args: any) => func(...args));
      }
    }
  }
);

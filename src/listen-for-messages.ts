import {messaging, onMessage } from './firebase-config';

const listenForMessages = (): void => {
  onMessage(messaging,(payload) => {
    console.log('Message received. ', payload);
    // Hiển thị thông báo hoặc xử lý theo nhu cầu của bạn
  });
};

export default listenForMessages;

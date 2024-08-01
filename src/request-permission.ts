import { messaging, getToken } from './firebase-config';

const requestPermission = async (): Promise<void> => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, { vapidKey: 'BK8vdR2bt8XKBNVDIt6Pc0Bihu9bbyHb9Hyq9A91Tpg3IFKQiPoMKP_iYNofFZKyiG9FW0Z2zU2JPAj0qVSgr_s' });
      console.log('FCM Token:', token);
      // Lưu token vào server hoặc sử dụng theo nhu cầu của bạn
    } else {
      console.log('Permission not granted');
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
  }
};

export default requestPermission;

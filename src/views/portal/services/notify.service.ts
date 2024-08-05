import { FirebaseApp, initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "../../../utils/inject";
import { MessagePayload } from "firebase/messaging/sw";
interface ConfigFirebase {
    firebaseConfig: {
        apiKey: string;
        authDomain: string;
        databaseURL: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
        measurementId: string;
    };
    vapidKey: string;
}
export const SET_FIREBASE_CONFIG = 'SET_FIREBASE_CONFIG';
@Injectable
export class NotifyService  {
    _app: FirebaseApp | null = null;
    public _couter = 0;
    private _message:MessagePayload[] = [];
    private $message = new BehaviorSubject<MessagePayload[]>([]);
    private $deviceId = new BehaviorSubject<string>("");
    constructor() {}
    setMessage(message: MessagePayload ) {
        this._couter++;
        this._message.push(message);
        this.$message.next(this._message);
    }
    getCouter(): Observable<MessagePayload[]> {
      return this.$message.asObservable();
    }
   private getConfig(): ConfigFirebase | null  {
        const configStr = localStorage.getItem(SET_FIREBASE_CONFIG);
              try {
                if(configStr) {
                   return JSON.parse(configStr);
                }
              } catch (e) {
                console.log('cannot parse');
              }
          return null;        
    }
   public setConfig(config: ConfigFirebase ) {
         try {
           localStorage.setItem(SET_FIREBASE_CONFIG, JSON.stringify(config));
         } catch (error) {
            console.log('cannot find config');
         }
    }
    public init() { 
        const firebaseConfig = this.getConfig();
        if ('serviceWorker' in navigator && firebaseConfig ) {
              navigator.serviceWorker
                .register('/firebase-messaging-sw.js')
                .then((registration) => {
                  console.log(
                    'Service Worker registered with scope:',
                    registration.scope
                  );
                  // Kiểm tra trạng thái đăng ký
                  if (registration.active) {
                       registration.active.postMessage({
                        type: SET_FIREBASE_CONFIG,
                        config: firebaseConfig.firebaseConfig,
                      });
                    console.log('Service Worker is active');
                  } else {
                    console.log('Service Worker is not active');
                  }
                })
                .catch((error) => {
                  console.error('Service Worker registration failed:', error);
                });
          } else {
            console.warn('cannot find config firebase');
          }
    }
   private getApp(): FirebaseApp | null{
        if(this._app) {
            return this._app;
        } else {
            const firebaseConfig = this.getConfig();
            if(firebaseConfig) {
                return initializeApp(firebaseConfig.firebaseConfig);
            } else {
                return null;
            }
        }
    }
   public requestPermission = async (): Promise<string> => {
        const app = this.getApp();
        const firebaseConfig = this.getConfig();
        if(app && firebaseConfig) {
            const messaging = getMessaging(app);
            try {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                  const token = await getToken(messaging, { vapidKey: firebaseConfig.vapidKey});
                  console.log('FCM Token:', token);
                  this.$deviceId.next(token);
                  onMessage(messaging,(payload) => {
                      console.log('Message received. ', payload);
                      this.setMessage(payload);
                  // Hiển thị thông báo hoặc xử lý theo nhu cầu của bạn
                    });
                  return token;
                  // Lưu token vào server hoặc sử dụng theo nhu cầu của bạn
                } else {
                  console.log('Permission not granted');
                }
              } catch (error) {
                console.error('Error getting FCM token:', error);
              }
        }
        return "";
    };
}
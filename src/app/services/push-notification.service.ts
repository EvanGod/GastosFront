import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { getMessaging, getToken } from "firebase/messaging";

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  userToken: string | null = null;

  constructor() {}

  async initPushNotifications() {
    try {
      // Solicitar permisos de notificaciones
      const permission = await PushNotifications.requestPermissions();
      if (permission.receive === 'granted') {
        PushNotifications.register(); // Registra el dispositivo

        // Captura eventos
        PushNotifications.addListener('registration', (token) => {
          console.log('Device token:', token.value);
          this.userToken = token.value;
        });

        PushNotifications.addListener('registrationError', (error) => {
          console.error('Registration error:', error);
        });
      }
    } catch (error) {
      console.error('Error initializing push notifications:', error);
    }
  }

  async getUserToken(): Promise<string | null> {
    if (this.userToken) {
      return this.userToken;
    }

    // Si no se obtiene de PushNotifications, intenta desde Firebase Messaging
    try {
      const messaging = getMessaging();
      const token = await getToken(messaging);
      console.log('Firebase token:', token);
      return token;
    } catch (error) {
      console.error('Error obtaining Firebase token:', error);
      return null;
    }
  }
}

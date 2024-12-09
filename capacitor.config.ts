import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.control.gastos', // ID único para tu aplicación
  appName: 'ControlGastos', // Nombre de tu aplicación
  webDir: 'www', // Directorio donde se encuentran los archivos generados por Ionic/Angular

  plugins: {
    Camera: {
      androidPermissions: ['CAMERA', 'READ_EXTERNAL_STORAGE', 'WRITE_EXTERNAL_STORAGE'],
    },
    Filesystem: {
      androidPermissions: ['READ_EXTERNAL_STORAGE', 'WRITE_EXTERNAL_STORAGE'],
    },
    Share: {
      // Configuraciones adicionales para el plugin de compartir, si es necesario.
    },
  },


};

export default config;

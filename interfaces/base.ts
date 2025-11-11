// Interfaz para respuestas que solo traen un mensaje de éxito o error
export interface IMessageResponse {
  mensaje: string;
  [key: string]: any; 
}
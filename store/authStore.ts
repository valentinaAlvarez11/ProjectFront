// store/authStore.ts
import { create } from 'zustand';
import { IUser} from '@/interfaces/users';
import AuthService from '@/libs/auth.service'; 

interface AuthState {
  isLoggedIn: boolean;
  user: IUser | null;
  loadingAuth: boolean;
  
  // Acciones
  login: (userData: IUser) => void; 
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

// Creación del Store
export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: false,
  user: null,
  loadingAuth: true,

  // Login
 login: (userData) => {
    set({ 
      isLoggedIn: true, 
      user: userData, 
      loadingAuth: false,
    });
  },
  
  // Logout
  logout: async () => {
    set({ loadingAuth: true });
    try {
      // 1. Llama al servicio para borrar la cookie del servidor
      await AuthService.logout(); 
      
      // 2. Limpia el estado
      set({ isLoggedIn: false, user: null, loadingAuth: false });
      
    } catch (error) {
       console.error("Error al cerrar sesión, limpiando estado local:", error);
       set({ isLoggedIn: false, user: null, loadingAuth: false }); 
    }
  },
  
  // Estado
  checkAuthStatus: async () => {
    if (get().user && get().isLoggedIn && !get().loadingAuth) return;
    
    set({ loadingAuth: true });

    try {
      // 1. Llama a la ruta protegida /users/status
      const { usuario } = await AuthService.checkStatus(); 
      
      // 2. Si es exitoso, el token es válido y el usuario está activo.
      set({ 
        isLoggedIn: true, 
        user: usuario,
        loadingAuth: false,
      });
      
    } catch (error: any) {
      set({ isLoggedIn: false, user: null, loadingAuth: false });
    } 
  },
}));

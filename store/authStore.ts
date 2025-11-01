// store/authStore.ts
import { create } from 'zustand';
import { UserWithRoles } from '@/interfaces/user';

interface AuthUser extends UserWithRoles {
  id?: number;
}

interface AuthState {
  isLoggedIn: boolean;
  user: AuthUser | null;
  
  // Acciones
  login: (userData: AuthUser) => void;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,

  login: (userData) => set({ isLoggedIn: true, user: userData }),
  
  logout: () => {
    set({ isLoggedIn: false, user: null });
    fetch('http://localhost:3000/logout', { method: 'POST', credentials: 'include' })
      .catch(error => console.error("Error al cerrar sesión en el BE:", error));
  },
  
  checkAuthStatus: async () => {
    try {
      const res = await fetch('http://localhost:3000/user-data', {
        method: 'GET',
        credentials: 'include',
      });
      
      if (res.ok) {
        const data = await res.json();
        set({ 
          isLoggedIn: true, 
          user: { 
            email: data.email, 
            nombre: data.nombre,
            telefono: data.telefono || '',
            rol_comprador: data.rol_comprador || false,
            rol_vendedor: data.rol_vendedor || false
          } 
        });
      } else {
        set({ isLoggedIn: false, user: null });
      }
    } catch (error) {
      console.error("Fallo al verificar la autenticación:", error);
      set({ isLoggedIn: false, user: null });
    } 
  },
}));
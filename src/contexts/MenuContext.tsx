
// ===================================================================
// DOSYA 2: src/context/MenuContext.tsx
// Sorumluluğu: Uygulama genelindeki menü ve yetki verilerini yönetmek ve
// alt bileşenlere dağıtmak (Pinia store'un karşılığı).
// ===================================================================
import  { createContext, useState, type ReactNode } from 'react';
import type { MenuState } from '../types';

// Örnek verilerle bir başlangıç state'i oluşturuyoruz.
const initialMenuState: MenuState = {
  menu: [
    { 
      name: "customer", 
      title: "Müşteriler", 
      children: [
        { name: "CustomerList", path: "/customers" },
        { name: "CustomerCreate", path: "/customers/create" },
        { name: "SecretFeature", path: "/secret" } // Bu menü filtrelenecek
      ] 
    }
  ],
  getClaimPages: ["CustomerList"],
  getModulePages: ["CustomerCreate"],
  getFreePages: [],
};

// Context'i oluşturuyoruz.
// eslint-disable-next-line react-refresh/only-export-components
export const MenuContext = createContext<MenuState>(initialMenuState);

// Provider bileşeni: Bu bileşen, tüm uygulamayı sararak state'i sağlar.
export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuState] = useState(initialMenuState);

  return (
    <MenuContext.Provider value={menuState}>
      {children}
    </MenuContext.Provider>
  );
};

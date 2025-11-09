// ===================================================================
// DOSYA 3: src/hooks/useMenu.ts
// Sorumluluğu: MenuContext'e erişimi kolaylaştıran bir custom hook sağlamak.
// Bu, bileşenlerin `useContext(MenuContext)` yazmak yerine `useMenu()` yazmasını sağlar.
// ===================================================================
import { useContext } from "react";
import { MenuContext } from "../contexts/MenuContext";

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};

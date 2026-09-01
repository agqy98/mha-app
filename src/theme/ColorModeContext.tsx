import {
  createContext,
  useContext,
} from "react";

import type { PaletteMode } from "@mui/material";

export type ColorModeContextType = {
  mode: PaletteMode;
  toggleColorMode: () => void;
};

export const ColorModeContext =
  createContext<ColorModeContextType | undefined>(undefined);

export function useColorMode() {
  const context = useContext(ColorModeContext);

  if (!context) {
    throw new Error(
      "useColorMode must be used within AppThemeProvider"
    );
  }

  return context;
}
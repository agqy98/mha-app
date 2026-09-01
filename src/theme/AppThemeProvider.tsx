import { CssBaseline, ThemeProvider, type PaletteMode } from "@mui/material";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { createAppTheme } from "./theme";

type ColorModeContextType = {
    mode: PaletteMode;
    toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(
    undefined
);

const STORAGE_KEY = "parcel-app-theme";

export function AppThemeProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [mode, setMode] = useState<PaletteMode>(() => {
        const savedMode = localStorage.getItem(STORAGE_KEY);

        if (savedMode === 'dark' || savedMode === 'light') {
            return savedMode;
        }

        return 'light'
    })

    const toggleColorMode = () => {
        setMode((currentMode) => {
            const newMode = currentMode === "light" ? "dark" : "light";

            localStorage.setItem(STORAGE_KEY, newMode);

            return newMode;
        })
    }

    const theme = useMemo(() =>
        createAppTheme(mode),
        [mode])

    return (
        <ColorModeContext.Provider
            value={{
                mode,
                toggleColorMode,
            }}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />

                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export function useColorMode() {
    const context = useContext(ColorModeContext);

    if (!context){
        throw new Error(
            "useColorMode must be used inside AppThemeProvider"
        )
    }

    return context
}
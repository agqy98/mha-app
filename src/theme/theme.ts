import type { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export const createAppTheme = (mode: PaletteMode) =>
    createTheme({
        palette: {
            mode,

            primary: {
                main:
                    mode === 'light'
                        ? "#5F819D"
                        : "#82AFCB", //"#1C2C39"
                contrastText:
                    mode === "light"
                        ? "#FFFFFF"
                        : "#10202C",
            },

            background: {
                default:
                    mode === 'light'
                        ? "#E9EBEC"
                        : "#1B2B38",//"#223443",
                paper:
                    mode === 'light'
                        ? "#FFFFFF" :
                        "#223443",
            },

            divider:
                mode === "light"
                    ? "#D6DADD"
                    : "#3A5060"
        },
        shape: {
            borderRadius: 10,
        },

        typography: {
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),

            h5: {
                fontWeight: 700,
            },

            h6: {
                fontWeight: 600
            },

            button: {
                textTransform: "none",
                fontWeight: 600
            }
        },

        components: {
            MuiTextField: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        '& input[type="date"]::-webkit-calendar-picker-indicator': {
                            filter:
                                theme.palette.mode === "dark"
                                    ? "invert(1)"
                                    : "none",

                            opacity: 0.8,
                            cursor: "pointer",
                        },
                    }),
                },
            },

            MuiButton: {
                defaultProps: {
                    disableElevation: true,
                }
            },

            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: "none"
                    }
                }
            }
        }
    })

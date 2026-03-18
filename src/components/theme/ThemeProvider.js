import React, { useEffect, useState, createContext } from "react";
import { LightTheme, DarkTheme } from "./Themes";
import { MuiThemeProvider } from "@material-ui/core/styles";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const getPrefColorScheme = () =>
        window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)").matches : false;

    const getInitialMode = () => {
        if (typeof localStorage === "undefined") return true;
        const isReturningUser = "dark" in localStorage;
        return isReturningUser
            ? JSON.parse(localStorage.getItem("dark"))
            : !!getPrefColorScheme();
    };

    const [theme, setTheme] = useState(getInitialMode() ? "dark" : "light");

    const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

    useEffect(() => {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("dark", JSON.stringify(theme === "dark"));
        }
        // Sync CSS custom property theming
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <MuiThemeProvider theme={theme === "light" ? LightTheme : DarkTheme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

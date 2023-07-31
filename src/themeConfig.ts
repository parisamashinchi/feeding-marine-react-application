import {PaletteMode} from '@mui/material';
import {amber, grey} from '@mui/material/colors';

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                primary: {
                    dark: '#007476',
                    main: '#00a5a5',
                    light: '#58d5d6'
                },
                secondary: {
                    dark: '#045C77',
                    main: '#0077aa',
                    light: '#53a6dc'
                },
                on_surface: {
                    dark: 'rgba(0,0,0,0.87)',
                    main: 'rgba(0,0,0,0.60)',
                    light: 'rgba(0,0,0,0.30)'
                },
                text: {
                    primary: '#777',
                    secondary: grey[500]
                },
                divider: amber[200],

            }
            : {
                primary: {
                    dark: '#045C77',
                    main: '#0077aa',
                    light: '#53a6dc'
                },
                secondary: {
                    dark: '#007476',
                    main: '#00a5a5',
                    light: '#58d5d6'
                },
                on_surface: {
                    dark: 'rgba(0,0,0,0.87)',
                    main: 'rgba(0,0,0,0.60)',
                    light: 'rgba(0,0,0,0.30)'
                },
                text: {
                    primary: '#777',
                    secondary: grey[500]
                }
            }),
    },
    overrides: {
        MuiButton: {
            raisedPrimary: {
                color: 'white',
            },
        },
    }
});

import { createTheme } from "@mui/material";

const font =  "'Quicksand', 'Open Sans'";

//Create a theme instance
export const appTheme = createTheme({
    palette:{
        primary:{
            main: '#0EABB7'
        }, 
        secondary:{
            main: "#919191"
        }
    },
    // typography:{
    //     fontFamily: font,
    //     fontSize: 16, 
    //     textAlign: 'left',
                     
    //     overline: {
    //         textAlign: "left",
    //         textTransform: "none"
    //     }
    // },
    spacing: 8
});


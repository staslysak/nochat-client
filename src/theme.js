import { createMuiTheme } from "@material-ui/core/styles";
import { grey as primary, blue as secondary } from "@material-ui/core/colors";
import { lighten, darken } from "@material-ui/core/styles/colorManipulator";
// import defaultTheme from "@material-ui/core/styles/defaultTheme";

const preferColorSchema = window.matchMedia("(prefers-color-scheme: dark)")
  .matches;

export const theme = createMuiTheme({
  palette: {
    type: preferColorSchema ? "dark" : "light",
    primary,
    secondary,
  },
  props: {
    sidebar: 280,
    sidebarMin: 150,
    classes: {
      ellipsis: {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      },
    },
  },
  lighten,
  darken,
});

// console.log("defaultTheme", defaultTheme);
// console.log("customTheme", theme);

// background:
// theme.palette.type === "dark"
//   ? theme.lighten(theme.palette.background.default, 0.235)
//   : theme.darken(theme.palette.background.default, 0.057),

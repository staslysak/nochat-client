import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  StyledList: {},
  StyledList_subheader: {
    background:
      theme.palette.type === "dark"
        ? theme.lighten(theme.palette.background.default, 0.235)
        : theme.darken(theme.palette.background.default, 0.057),
    lineHeight: "32px",
    fontSize: theme.typography.body2.fontSize,
  },
}));

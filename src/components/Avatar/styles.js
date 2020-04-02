import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  Avatar: {
    fontSize: theme.typography.body1.fontSize,
    textTransform: "uppercase",
    color: theme.palette.common.white
  }
}));

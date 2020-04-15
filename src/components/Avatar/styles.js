import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  Avatar: {
    fontSize: theme.typography.body1.fontSize,
    // width: 44,
    // height: 44,
    textTransform: "uppercase",
    color: theme.palette.common.white,
  },
  Avatar_small: {
    width: 30,
    height: 30,
  },
}));

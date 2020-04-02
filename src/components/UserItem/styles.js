import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  UserItem_primary: {
    ...theme.props.classes.ellipsis
  },
  UserItem_secondary: {
    ...theme.props.classes.ellipsis,
    color: theme.palette.secondary[200]
  }
}));

import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  ChatItem_badge: {
    height: 15,
    "& .MuiBadge-badge": {
      position: "relative",
      transform: "none",
      height: "inherit"
    }
  },
  ChatItem_primary: {
    display: "flex"
  },
  ChatItem_secondary: {
    display: "flex",
    alignItems: "center"
  },
  ChatItem_primaryText: {
    width: "100%",
    ...theme.props.classes.ellipsis
  },
  ChatItem_secondaryText: {
    width: "100%",
    marginRight: theme.spacing(1),
    ...theme.props.classes.ellipsis
  }
}));

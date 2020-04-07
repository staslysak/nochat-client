import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  DirectChat_header: {
    width: "100%",
    paddingLeft: 0,
    paddingRight: 0,
  },
  DirectChat_header_status: {
    color: theme.palette.secondary[200],
  },
}));

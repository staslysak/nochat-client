import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  DirectFallback: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  Loader: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

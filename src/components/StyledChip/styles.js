import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  StyledChip: {
    // background: "none",
    alignSelf: "center",
    background: theme.palette.action.hover,

    "& .MuiChip-label": {
      // borderRadius: "inherit",
    },
  },
}));

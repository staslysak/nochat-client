import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  Typing: {
    display: "inline-flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: theme.palette.text.secondary,
    "& span": {
      width: 5,
      height: 5,
      marginRight: 4,
      background: theme.palette.text.secondary,
      borderRadius: "50%",
      "&:nth-child(1)": {
        animation: "$animation 1s ease-in-out infinite 0s",
      },
      "&:nth-child(2)": {
        animation: "$animation 1s ease-in-out infinite 0.2s",
      },
      "&:nth-child(3)": {
        animation: "$animation 1s ease-in-out infinite 0.4s",
      },
    },
  },
  Typing_secondary: {
    color: theme.palette.secondary[200],
    "& span": {
      background: theme.palette.secondary[200],
    },
  },
  "@keyframes animation": {
    "0%, 100%": {
      transform: "scale(1)",
      opacity: 1,
    },
    "50%": {
      transform: "scale(.8)",
      opacity: 0.5,
    },
  },
}));

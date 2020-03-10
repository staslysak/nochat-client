import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputBase, IconButton, Typography } from "@material-ui/core";
import Message from "components/Message";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles(theme => ({
  chatWindow: {
    position: "relative",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  messageField: {
    alignSelf: "flex-end",
    display: "flex",
    alignItems: "center",
    width: "100%",
    minHeight: 64,
    padding: `${theme.spacing(1)}px ${theme.spacing(1.5)}px ${theme.spacing(
      0.5
    )}px ${theme.spacing(2)}px`,
    borderTop: `1px solid ${theme.palette.divider}`,
    "& .MuiInputBase-inputMultiline": {
      "&::-webkit-scrollbar": { display: "none" }
    },
    "& .MuiInputBase-root": {
      fontSize: theme.typography.body2.fontSize
    }
  },
  empty: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  messages: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    maxHeight: "calc(100% - 64px)",
    overflow: "auto",
    background: "transparent",
    padding: theme.spacing(2),
    "&::-webkit-scrollbar": {
      width: 5,
      background: "transparent",
      "&-thumb": {
        background:
          theme.palette.type === "dark"
            ? theme.lighten(theme.palette.background.default, 0.235)
            : theme.darken(theme.palette.background.default, 0.057),
        borderRadius: theme.shape.borderRadius * 3,
        display: "none"
      }
    },
    "&:hover::-webkit-scrollbar-thumb": { display: "block" }
  }
}));

const ChatWindow = ({ messages, user, onSend, ...props }) => {
  const [state, setstate] = React.useState({ text: "", sent: false });
  const classes = useStyles();
  const containerRef = React.createRef();
  const messageFieldRef = React.createRef();

  const handleViewUpdate = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  React.useEffect(() => {
    if (containerRef.current.scrollTop > 0) {
      return;
    }
    handleViewUpdate();
  }, [containerRef, handleViewUpdate]);

  const onSendMessage = () => {
    onSend(state.text);
    setstate({ text: "", sent: true });
    handleViewUpdate();
  };

  const handleChange = e => {
    if (state.sent) {
      return setstate({ text: "" });
    }
    setstate({ text: e.target.value });
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      if (state.text.trim().length) {
        onSendMessage();
      } else {
        setstate({ text: "" });
      }
    }
  };

  const renderMessages = () => {
    if (!messages || !messages.length)
      return (
        <div className={classes.empty}>
          <Typography variant="body2">No messages here yet...</Typography>
        </div>
      );

    return messages.map((msg, idx) => {
      const variant = msg.user.id === user.id ? "sender" : "receiver";
      return <Message key={idx} {...msg} variant={variant} />;
    });
  };

  return (
    <div className={classes.chatWindow}>
      <div className={classes.messages} ref={containerRef}>
        {renderMessages()}
      </div>
      <div className={classes.messageField}>
        <InputBase
          autoFocus
          ref={messageFieldRef}
          fullWidth
          multiline
          rowsMax={5}
          value={state.text}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Write a message..."
        />
        <IconButton onClick={onSendMessage} disabled={!state.text.trim().length}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatWindow;

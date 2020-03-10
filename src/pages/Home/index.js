import React from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { DIRECT } from "graphql/queries";
import { CREATE_MESSAGE, CREATE_DIRECT } from "graphql/mutations";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core";
import { connect } from "react-redux";
import { pasreQuery, formatDate } from "utils/index";
import MainBlock from "components/MainBlock";
import ChatWindow from "components/ChatWindow";
import Avatar from "components/Avatar";
import { dispatchActiveChat } from "redux/actions/auth";

const useStyles = makeStyles(theme => ({
  appBarContent: {
    width: "100%",
    paddingLeft: 0,
    paddingRight: 0
  }
}));

const Home = props => {
  const classes = useStyles();

  const [createMessage] = useMutation(CREATE_MESSAGE);
  const [createDirect] = useMutation(CREATE_DIRECT);
  const [direct] = useLazyQuery(DIRECT, {
    onCompleted: data => {
      props.dispatchActiveChat(data.direct);
    }
  });

  React.useEffect(() => {
    const userId = pasreQuery(props.location).p;
    if (userId) direct({ variables: { userId } });
  }, [props.location]);

  const onSend = text => {
    const { activeDirect, user } = props.activeChat;
    if (!props.activeChat.activeDirect) {
      createDirect({
        variables: {
          userId: user.id,
          text
        }
      });
    } else {
      createMessage({
        variables: { text, chatId: activeDirect }
      });
    }
  };

  return (
    <MainBlock
      header={
        pasreQuery(props.location).p ? (
          <ListItem dense className={classes.appBarContent}>
            <ListItemText
              primary={props.activeChat.user.username}
              primaryTypographyProps={{ component: "div" }}
              secondary={`last seen ${formatDate(props.activeChat.user.createdAt)}`}
              secondaryTypographyProps={{ variant: "caption" }}
            />
            <Avatar
              src={props.activeChat.user.avatar}
              alt={props.activeChat.user.username}
            />
          </ListItem>
        ) : (
          <ListItem dense className={classes.appBarContent}>
            <ListItemText primary="NoChat" />
          </ListItem>
        )
      }
    >
      {pasreQuery(props.location).p && (
        <ChatWindow
          onSend={onSend}
          messages={props.activeChat.messages}
          user={props.user}
        />
      )}
    </MainBlock>
  );
};

export default connect(
  ({ auth }) => ({
    user: auth.user,
    activeChat: auth.activeChat
  }),
  {
    dispatchActiveChat
  }
)(Home);

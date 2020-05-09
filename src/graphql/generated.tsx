import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Direct = {
   __typename?: 'Direct';
  id: Scalars['Int'];
  user?: Maybe<User>;
  unread?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  lastMessage?: Maybe<Message>;
};

export type CurrentDirect = {
   __typename?: 'CurrentDirect';
  direct?: Maybe<Direct>;
  recipient?: Maybe<User>;
};

export type Subscription = {
   __typename?: 'Subscription';
  newDirect?: Maybe<Direct>;
  deleteDirect: Direct;
  newMessage: Message;
  deleteMessage: Message;
  userTyping: Scalars['String'];
  onlineUser: User;
};


export type SubscriptionNewMessageArgs = {
  chatId: Scalars['Int'];
};


export type SubscriptionDeleteMessageArgs = {
  chatId: Scalars['Int'];
};


export type SubscriptionUserTypingArgs = {
  chatId: Scalars['Int'];
};

export type Query = {
   __typename?: 'Query';
  directs?: Maybe<Array<Direct>>;
  currentDirect?: Maybe<CurrentDirect>;
  directLastMessage: Message;
  messages: Array<Message>;
  currentUser: User;
  users?: Maybe<Array<User>>;
  onlineUsers?: Maybe<Array<User>>;
};


export type QueryCurrentDirectArgs = {
  userId: Scalars['Int'];
};


export type QueryDirectLastMessageArgs = {
  chatId: Scalars['Int'];
};


export type QueryMessagesArgs = {
  chatId: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryUsersArgs = {
  username?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  createDirect: Direct;
  deleteDirect: Scalars['Boolean'];
  readMessage: Scalars['Int'];
  deleteMessage: Scalars['Boolean'];
  createMessage: Scalars['Boolean'];
  userTyping: Scalars['Boolean'];
  logout?: Maybe<Scalars['Boolean']>;
  verifyUser: LoginResponse;
  login: LoginResponse;
  register: Scalars['Boolean'];
};


export type MutationCreateDirectArgs = {
  userId: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
};


export type MutationDeleteDirectArgs = {
  id: Scalars['Int'];
};


export type MutationReadMessageArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['Int'];
};


export type MutationCreateMessageArgs = {
  chatId?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
};


export type MutationUserTypingArgs = {
  chatId: Scalars['Int'];
  username?: Maybe<Scalars['String']>;
};


export type MutationVerifyUserArgs = {
  secret: Scalars['String'];
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Message = {
   __typename?: 'Message';
  id: Scalars['Int'];
  userId: Scalars['Int'];
  chatId: Scalars['Int'];
  text: Scalars['String'];
  unread: Scalars['Boolean'];
  createdAt: Scalars['String'];
};

export type User = {
   __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  avatar: Scalars['String'];
  status: Scalars['String'];
  username: Scalars['String'];
  createdAt: Scalars['String'];
  online: Scalars['Boolean'];
  lastSeen: Scalars['String'];
};

export type LoginResponse = {
   __typename?: 'LoginResponse';
  user?: Maybe<User>;
  token?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type RegisterMutationVariables = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type LoginMutationVariables = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'token' | 'refreshToken'>
  ) }
);

export type VerifyUserMutationVariables = {
  secret: Scalars['String'];
};


export type VerifyUserMutation = (
  { __typename?: 'Mutation' }
  & { verifyUser: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'token' | 'refreshToken'>
  ) }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type CreateDirectMutationVariables = {
  userId: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
};


export type CreateDirectMutation = (
  { __typename?: 'Mutation' }
  & { createDirect: (
    { __typename?: 'Direct' }
    & Pick<Direct, 'id'>
  ) }
);

export type DeleteDirectMutationVariables = {
  id: Scalars['Int'];
};


export type DeleteDirectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteDirect'>
);

export type DirectsQueryVariables = {};


export type DirectsQuery = (
  { __typename?: 'Query' }
  & { directs?: Maybe<Array<(
    { __typename?: 'Direct' }
    & Pick<Direct, 'id' | 'unread'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'avatar' | 'online' | 'username' | 'lastSeen' | 'createdAt'>
    )>, lastMessage?: Maybe<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'text' | 'userId' | 'createdAt'>
    )> }
  )>> }
);

export type CurrentDirectQueryVariables = {
  userId: Scalars['Int'];
};


export type CurrentDirectQuery = (
  { __typename?: 'Query' }
  & { currentDirect?: Maybe<(
    { __typename?: 'CurrentDirect' }
    & { direct?: Maybe<(
      { __typename?: 'Direct' }
      & Pick<Direct, 'id'>
    )>, recipient?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'avatar' | 'online' | 'username' | 'lastSeen' | 'createdAt'>
    )> }
  )> }
);

export type DirectLastMessageQueryVariables = {
  chatId: Scalars['Int'];
};


export type DirectLastMessageQuery = (
  { __typename?: 'Query' }
  & { directLastMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'userId' | 'createdAt'>
  ) }
);

export type SubDeleteDirectSubscriptionVariables = {};


export type SubDeleteDirectSubscription = (
  { __typename?: 'Subscription' }
  & { deleteDirect: (
    { __typename?: 'Direct' }
    & Pick<Direct, 'id'>
  ) }
);

export type SubNewDirectSubscriptionVariables = {};


export type SubNewDirectSubscription = (
  { __typename?: 'Subscription' }
  & { newDirect?: Maybe<(
    { __typename?: 'Direct' }
    & Pick<Direct, 'id' | 'unread'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'avatar' | 'online' | 'username' | 'lastSeen' | 'createdAt'>
    )>, lastMessage?: Maybe<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'text' | 'userId' | 'unread' | 'createdAt'>
    )> }
  )> }
);

export type CreateMessageMutationVariables = {
  chatId?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
};


export type CreateMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createMessage'>
);

export type DeleteMessageMutationVariables = {
  id: Scalars['Int'];
};


export type DeleteMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMessage'>
);

export type ReadMessageMutationVariables = {
  id: Scalars['Int'];
};


export type ReadMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'readMessage'>
);

export type GetChatMessagesQueryVariables = {
  chatId: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type GetChatMessagesQuery = (
  { __typename?: 'Query' }
  & { messages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'userId' | 'unread' | 'createdAt'>
  )> }
);

export type SubNewMessageSubscriptionVariables = {
  chatId: Scalars['Int'];
};


export type SubNewMessageSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'userId' | 'chatId' | 'unread' | 'createdAt'>
  ) }
);

export type SubDeleteMessageSubscriptionVariables = {
  chatId: Scalars['Int'];
};


export type SubDeleteMessageSubscription = (
  { __typename?: 'Subscription' }
  & { deleteMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'userId'>
  ) }
);

export type UserTypingMutationVariables = {
  chatId: Scalars['Int'];
  username?: Maybe<Scalars['String']>;
};


export type UserTypingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'userTyping'>
);

export type UsersQueryVariables = {
  username?: Maybe<Scalars['String']>;
};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'avatar' | 'online' | 'username' | 'lastSeen' | 'createdAt'>
  )>> }
);

export type CurrentUserQueryVariables = {};


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'avatar' | 'online' | 'username' | 'createdAt'>
  ) }
);

export type SubOnlineUserSubscriptionVariables = {};


export type SubOnlineUserSubscription = (
  { __typename?: 'Subscription' }
  & { onlineUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'online' | 'lastSeen'>
  ) }
);

export type SubUserTypingSubscriptionVariables = {
  chatId: Scalars['Int'];
};


export type SubUserTypingSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'userTyping'>
);


export const RegisterDocument = gql`
    mutation register($username: String!, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password)
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;
export type RegisterComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RegisterMutation, RegisterMutationVariables>, 'mutation'>;

    export const RegisterComponent = (props: RegisterComponentProps) => (
      <ApolloReactComponents.Mutation<RegisterMutation, RegisterMutationVariables> mutation={RegisterDocument} {...props} />
    );
    

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    refreshToken
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const VerifyUserDocument = gql`
    mutation verifyUser($secret: String!) {
  verifyUser(secret: $secret) {
    token
    refreshToken
  }
}
    `;
export type VerifyUserMutationFn = ApolloReactCommon.MutationFunction<VerifyUserMutation, VerifyUserMutationVariables>;
export type VerifyUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<VerifyUserMutation, VerifyUserMutationVariables>, 'mutation'>;

    export const VerifyUserComponent = (props: VerifyUserComponentProps) => (
      <ApolloReactComponents.Mutation<VerifyUserMutation, VerifyUserMutationVariables> mutation={VerifyUserDocument} {...props} />
    );
    

/**
 * __useVerifyUserMutation__
 *
 * To run a mutation, you first call `useVerifyUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyUserMutation, { data, loading, error }] = useVerifyUserMutation({
 *   variables: {
 *      secret: // value for 'secret'
 *   },
 * });
 */
export function useVerifyUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyUserMutation, VerifyUserMutationVariables>) {
        return ApolloReactHooks.useMutation<VerifyUserMutation, VerifyUserMutationVariables>(VerifyUserDocument, baseOptions);
      }
export type VerifyUserMutationHookResult = ReturnType<typeof useVerifyUserMutation>;
export type VerifyUserMutationResult = ApolloReactCommon.MutationResult<VerifyUserMutation>;
export type VerifyUserMutationOptions = ApolloReactCommon.BaseMutationOptions<VerifyUserMutation, VerifyUserMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;
export type LogoutComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LogoutMutation, LogoutMutationVariables>, 'mutation'>;

    export const LogoutComponent = (props: LogoutComponentProps) => (
      <ApolloReactComponents.Mutation<LogoutMutation, LogoutMutationVariables> mutation={LogoutDocument} {...props} />
    );
    

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const CreateDirectDocument = gql`
    mutation createDirect($userId: Int!, $text: String) {
  createDirect(userId: $userId, text: $text) {
    id
  }
}
    `;
export type CreateDirectMutationFn = ApolloReactCommon.MutationFunction<CreateDirectMutation, CreateDirectMutationVariables>;
export type CreateDirectComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateDirectMutation, CreateDirectMutationVariables>, 'mutation'>;

    export const CreateDirectComponent = (props: CreateDirectComponentProps) => (
      <ApolloReactComponents.Mutation<CreateDirectMutation, CreateDirectMutationVariables> mutation={CreateDirectDocument} {...props} />
    );
    

/**
 * __useCreateDirectMutation__
 *
 * To run a mutation, you first call `useCreateDirectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDirectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDirectMutation, { data, loading, error }] = useCreateDirectMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateDirectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateDirectMutation, CreateDirectMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateDirectMutation, CreateDirectMutationVariables>(CreateDirectDocument, baseOptions);
      }
export type CreateDirectMutationHookResult = ReturnType<typeof useCreateDirectMutation>;
export type CreateDirectMutationResult = ApolloReactCommon.MutationResult<CreateDirectMutation>;
export type CreateDirectMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateDirectMutation, CreateDirectMutationVariables>;
export const DeleteDirectDocument = gql`
    mutation deleteDirect($id: Int!) {
  deleteDirect(id: $id)
}
    `;
export type DeleteDirectMutationFn = ApolloReactCommon.MutationFunction<DeleteDirectMutation, DeleteDirectMutationVariables>;
export type DeleteDirectComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteDirectMutation, DeleteDirectMutationVariables>, 'mutation'>;

    export const DeleteDirectComponent = (props: DeleteDirectComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteDirectMutation, DeleteDirectMutationVariables> mutation={DeleteDirectDocument} {...props} />
    );
    

/**
 * __useDeleteDirectMutation__
 *
 * To run a mutation, you first call `useDeleteDirectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDirectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDirectMutation, { data, loading, error }] = useDeleteDirectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDirectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteDirectMutation, DeleteDirectMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteDirectMutation, DeleteDirectMutationVariables>(DeleteDirectDocument, baseOptions);
      }
export type DeleteDirectMutationHookResult = ReturnType<typeof useDeleteDirectMutation>;
export type DeleteDirectMutationResult = ApolloReactCommon.MutationResult<DeleteDirectMutation>;
export type DeleteDirectMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteDirectMutation, DeleteDirectMutationVariables>;
export const DirectsDocument = gql`
    query directs {
  directs {
    id
    user {
      id
      email
      avatar
      online
      username
      lastSeen
      createdAt
    }
    lastMessage {
      id
      text
      userId
      createdAt
    }
    unread
  }
}
    `;
export type DirectsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<DirectsQuery, DirectsQueryVariables>, 'query'>;

    export const DirectsComponent = (props: DirectsComponentProps) => (
      <ApolloReactComponents.Query<DirectsQuery, DirectsQueryVariables> query={DirectsDocument} {...props} />
    );
    

/**
 * __useDirectsQuery__
 *
 * To run a query within a React component, call `useDirectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDirectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDirectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDirectsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DirectsQuery, DirectsQueryVariables>) {
        return ApolloReactHooks.useQuery<DirectsQuery, DirectsQueryVariables>(DirectsDocument, baseOptions);
      }
export function useDirectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DirectsQuery, DirectsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<DirectsQuery, DirectsQueryVariables>(DirectsDocument, baseOptions);
        }
export type DirectsQueryHookResult = ReturnType<typeof useDirectsQuery>;
export type DirectsLazyQueryHookResult = ReturnType<typeof useDirectsLazyQuery>;
export type DirectsQueryResult = ApolloReactCommon.QueryResult<DirectsQuery, DirectsQueryVariables>;
export const CurrentDirectDocument = gql`
    query currentDirect($userId: Int!) {
  currentDirect(userId: $userId) {
    direct {
      id
    }
    recipient {
      id
      email
      avatar
      online
      username
      lastSeen
      createdAt
    }
  }
}
    `;
export type CurrentDirectComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<CurrentDirectQuery, CurrentDirectQueryVariables>, 'query'> & ({ variables: CurrentDirectQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const CurrentDirectComponent = (props: CurrentDirectComponentProps) => (
      <ApolloReactComponents.Query<CurrentDirectQuery, CurrentDirectQueryVariables> query={CurrentDirectDocument} {...props} />
    );
    

/**
 * __useCurrentDirectQuery__
 *
 * To run a query within a React component, call `useCurrentDirectQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentDirectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentDirectQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCurrentDirectQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentDirectQuery, CurrentDirectQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentDirectQuery, CurrentDirectQueryVariables>(CurrentDirectDocument, baseOptions);
      }
export function useCurrentDirectLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentDirectQuery, CurrentDirectQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentDirectQuery, CurrentDirectQueryVariables>(CurrentDirectDocument, baseOptions);
        }
export type CurrentDirectQueryHookResult = ReturnType<typeof useCurrentDirectQuery>;
export type CurrentDirectLazyQueryHookResult = ReturnType<typeof useCurrentDirectLazyQuery>;
export type CurrentDirectQueryResult = ApolloReactCommon.QueryResult<CurrentDirectQuery, CurrentDirectQueryVariables>;
export const DirectLastMessageDocument = gql`
    query directLastMessage($chatId: Int!) {
  directLastMessage(chatId: $chatId) {
    id
    text
    userId
    createdAt
  }
}
    `;
export type DirectLastMessageComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<DirectLastMessageQuery, DirectLastMessageQueryVariables>, 'query'> & ({ variables: DirectLastMessageQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const DirectLastMessageComponent = (props: DirectLastMessageComponentProps) => (
      <ApolloReactComponents.Query<DirectLastMessageQuery, DirectLastMessageQueryVariables> query={DirectLastMessageDocument} {...props} />
    );
    

/**
 * __useDirectLastMessageQuery__
 *
 * To run a query within a React component, call `useDirectLastMessageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDirectLastMessageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDirectLastMessageQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useDirectLastMessageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DirectLastMessageQuery, DirectLastMessageQueryVariables>) {
        return ApolloReactHooks.useQuery<DirectLastMessageQuery, DirectLastMessageQueryVariables>(DirectLastMessageDocument, baseOptions);
      }
export function useDirectLastMessageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DirectLastMessageQuery, DirectLastMessageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<DirectLastMessageQuery, DirectLastMessageQueryVariables>(DirectLastMessageDocument, baseOptions);
        }
export type DirectLastMessageQueryHookResult = ReturnType<typeof useDirectLastMessageQuery>;
export type DirectLastMessageLazyQueryHookResult = ReturnType<typeof useDirectLastMessageLazyQuery>;
export type DirectLastMessageQueryResult = ApolloReactCommon.QueryResult<DirectLastMessageQuery, DirectLastMessageQueryVariables>;
export const SubDeleteDirectDocument = gql`
    subscription subDeleteDirect {
  deleteDirect {
    id
  }
}
    `;
export type SubDeleteDirectComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<SubDeleteDirectSubscription, SubDeleteDirectSubscriptionVariables>, 'subscription'>;

    export const SubDeleteDirectComponent = (props: SubDeleteDirectComponentProps) => (
      <ApolloReactComponents.Subscription<SubDeleteDirectSubscription, SubDeleteDirectSubscriptionVariables> subscription={SubDeleteDirectDocument} {...props} />
    );
    

/**
 * __useSubDeleteDirectSubscription__
 *
 * To run a query within a React component, call `useSubDeleteDirectSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubDeleteDirectSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubDeleteDirectSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubDeleteDirectSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<SubDeleteDirectSubscription, SubDeleteDirectSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<SubDeleteDirectSubscription, SubDeleteDirectSubscriptionVariables>(SubDeleteDirectDocument, baseOptions);
      }
export type SubDeleteDirectSubscriptionHookResult = ReturnType<typeof useSubDeleteDirectSubscription>;
export type SubDeleteDirectSubscriptionResult = ApolloReactCommon.SubscriptionResult<SubDeleteDirectSubscription>;
export const SubNewDirectDocument = gql`
    subscription subNewDirect {
  newDirect {
    id
    user {
      id
      email
      avatar
      online
      username
      lastSeen
      createdAt
    }
    lastMessage {
      id
      text
      userId
      unread
      createdAt
    }
    unread
  }
}
    `;
export type SubNewDirectComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<SubNewDirectSubscription, SubNewDirectSubscriptionVariables>, 'subscription'>;

    export const SubNewDirectComponent = (props: SubNewDirectComponentProps) => (
      <ApolloReactComponents.Subscription<SubNewDirectSubscription, SubNewDirectSubscriptionVariables> subscription={SubNewDirectDocument} {...props} />
    );
    

/**
 * __useSubNewDirectSubscription__
 *
 * To run a query within a React component, call `useSubNewDirectSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubNewDirectSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubNewDirectSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubNewDirectSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<SubNewDirectSubscription, SubNewDirectSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<SubNewDirectSubscription, SubNewDirectSubscriptionVariables>(SubNewDirectDocument, baseOptions);
      }
export type SubNewDirectSubscriptionHookResult = ReturnType<typeof useSubNewDirectSubscription>;
export type SubNewDirectSubscriptionResult = ApolloReactCommon.SubscriptionResult<SubNewDirectSubscription>;
export const CreateMessageDocument = gql`
    mutation createMessage($chatId: Int, $text: String!) {
  createMessage(chatId: $chatId, text: $text)
}
    `;
export type CreateMessageMutationFn = ApolloReactCommon.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;
export type CreateMessageComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateMessageMutation, CreateMessageMutationVariables>, 'mutation'>;

    export const CreateMessageComponent = (props: CreateMessageComponentProps) => (
      <ApolloReactComponents.Mutation<CreateMessageMutation, CreateMessageMutationVariables> mutation={CreateMessageDocument} {...props} />
    );
    

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, baseOptions);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = ApolloReactCommon.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation deleteMessage($id: Int!) {
  deleteMessage(id: $id)
}
    `;
export type DeleteMessageMutationFn = ApolloReactCommon.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;
export type DeleteMessageComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteMessageMutation, DeleteMessageMutationVariables>, 'mutation'>;

    export const DeleteMessageComponent = (props: DeleteMessageComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteMessageMutation, DeleteMessageMutationVariables> mutation={DeleteMessageDocument} {...props} />
    );
    

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, baseOptions);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = ApolloReactCommon.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const ReadMessageDocument = gql`
    mutation readMessage($id: Int!) {
  readMessage(id: $id)
}
    `;
export type ReadMessageMutationFn = ApolloReactCommon.MutationFunction<ReadMessageMutation, ReadMessageMutationVariables>;
export type ReadMessageComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ReadMessageMutation, ReadMessageMutationVariables>, 'mutation'>;

    export const ReadMessageComponent = (props: ReadMessageComponentProps) => (
      <ApolloReactComponents.Mutation<ReadMessageMutation, ReadMessageMutationVariables> mutation={ReadMessageDocument} {...props} />
    );
    

/**
 * __useReadMessageMutation__
 *
 * To run a mutation, you first call `useReadMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readMessageMutation, { data, loading, error }] = useReadMessageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReadMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReadMessageMutation, ReadMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<ReadMessageMutation, ReadMessageMutationVariables>(ReadMessageDocument, baseOptions);
      }
export type ReadMessageMutationHookResult = ReturnType<typeof useReadMessageMutation>;
export type ReadMessageMutationResult = ApolloReactCommon.MutationResult<ReadMessageMutation>;
export type ReadMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<ReadMessageMutation, ReadMessageMutationVariables>;
export const GetChatMessagesDocument = gql`
    query getChatMessages($chatId: Int!, $offset: Int) {
  messages(chatId: $chatId, offset: $offset) {
    id
    text
    userId
    unread
    createdAt
  }
}
    `;
export type GetChatMessagesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables>, 'query'> & ({ variables: GetChatMessagesQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetChatMessagesComponent = (props: GetChatMessagesComponentProps) => (
      <ApolloReactComponents.Query<GetChatMessagesQuery, GetChatMessagesQueryVariables> query={GetChatMessagesDocument} {...props} />
    );
    

/**
 * __useGetChatMessagesQuery__
 *
 * To run a query within a React component, call `useGetChatMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatMessagesQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetChatMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetChatMessagesQuery, GetChatMessagesQueryVariables>(GetChatMessagesDocument, baseOptions);
      }
export function useGetChatMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetChatMessagesQuery, GetChatMessagesQueryVariables>(GetChatMessagesDocument, baseOptions);
        }
export type GetChatMessagesQueryHookResult = ReturnType<typeof useGetChatMessagesQuery>;
export type GetChatMessagesLazyQueryHookResult = ReturnType<typeof useGetChatMessagesLazyQuery>;
export type GetChatMessagesQueryResult = ApolloReactCommon.QueryResult<GetChatMessagesQuery, GetChatMessagesQueryVariables>;
export const SubNewMessageDocument = gql`
    subscription subNewMessage($chatId: Int!) {
  newMessage(chatId: $chatId) {
    id
    text
    userId
    chatId
    unread
    createdAt
  }
}
    `;
export type SubNewMessageComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<SubNewMessageSubscription, SubNewMessageSubscriptionVariables>, 'subscription'>;

    export const SubNewMessageComponent = (props: SubNewMessageComponentProps) => (
      <ApolloReactComponents.Subscription<SubNewMessageSubscription, SubNewMessageSubscriptionVariables> subscription={SubNewMessageDocument} {...props} />
    );
    

/**
 * __useSubNewMessageSubscription__
 *
 * To run a query within a React component, call `useSubNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubNewMessageSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useSubNewMessageSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<SubNewMessageSubscription, SubNewMessageSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<SubNewMessageSubscription, SubNewMessageSubscriptionVariables>(SubNewMessageDocument, baseOptions);
      }
export type SubNewMessageSubscriptionHookResult = ReturnType<typeof useSubNewMessageSubscription>;
export type SubNewMessageSubscriptionResult = ApolloReactCommon.SubscriptionResult<SubNewMessageSubscription>;
export const SubDeleteMessageDocument = gql`
    subscription subDeleteMessage($chatId: Int!) {
  deleteMessage(chatId: $chatId) {
    id
    userId
  }
}
    `;
export type SubDeleteMessageComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<SubDeleteMessageSubscription, SubDeleteMessageSubscriptionVariables>, 'subscription'>;

    export const SubDeleteMessageComponent = (props: SubDeleteMessageComponentProps) => (
      <ApolloReactComponents.Subscription<SubDeleteMessageSubscription, SubDeleteMessageSubscriptionVariables> subscription={SubDeleteMessageDocument} {...props} />
    );
    

/**
 * __useSubDeleteMessageSubscription__
 *
 * To run a query within a React component, call `useSubDeleteMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubDeleteMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubDeleteMessageSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useSubDeleteMessageSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<SubDeleteMessageSubscription, SubDeleteMessageSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<SubDeleteMessageSubscription, SubDeleteMessageSubscriptionVariables>(SubDeleteMessageDocument, baseOptions);
      }
export type SubDeleteMessageSubscriptionHookResult = ReturnType<typeof useSubDeleteMessageSubscription>;
export type SubDeleteMessageSubscriptionResult = ApolloReactCommon.SubscriptionResult<SubDeleteMessageSubscription>;
export const UserTypingDocument = gql`
    mutation userTyping($chatId: Int!, $username: String) {
  userTyping(chatId: $chatId, username: $username)
}
    `;
export type UserTypingMutationFn = ApolloReactCommon.MutationFunction<UserTypingMutation, UserTypingMutationVariables>;
export type UserTypingComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UserTypingMutation, UserTypingMutationVariables>, 'mutation'>;

    export const UserTypingComponent = (props: UserTypingComponentProps) => (
      <ApolloReactComponents.Mutation<UserTypingMutation, UserTypingMutationVariables> mutation={UserTypingDocument} {...props} />
    );
    

/**
 * __useUserTypingMutation__
 *
 * To run a mutation, you first call `useUserTypingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserTypingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userTypingMutation, { data, loading, error }] = useUserTypingMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserTypingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UserTypingMutation, UserTypingMutationVariables>) {
        return ApolloReactHooks.useMutation<UserTypingMutation, UserTypingMutationVariables>(UserTypingDocument, baseOptions);
      }
export type UserTypingMutationHookResult = ReturnType<typeof useUserTypingMutation>;
export type UserTypingMutationResult = ApolloReactCommon.MutationResult<UserTypingMutation>;
export type UserTypingMutationOptions = ApolloReactCommon.BaseMutationOptions<UserTypingMutation, UserTypingMutationVariables>;
export const UsersDocument = gql`
    query users($username: String) {
  users(username: $username) {
    id
    email
    avatar
    online
    username
    lastSeen
    createdAt
  }
}
    `;
export type UsersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<UsersQuery, UsersQueryVariables>, 'query'>;

    export const UsersComponent = (props: UsersComponentProps) => (
      <ApolloReactComponents.Query<UsersQuery, UsersQueryVariables> query={UsersDocument} {...props} />
    );
    

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
export const CurrentUserDocument = gql`
    query currentUser {
  currentUser {
    id
    email
    avatar
    online
    username
    createdAt
  }
}
    `;
export type CurrentUserComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<CurrentUserQuery, CurrentUserQueryVariables>, 'query'>;

    export const CurrentUserComponent = (props: CurrentUserComponentProps) => (
      <ApolloReactComponents.Query<CurrentUserQuery, CurrentUserQueryVariables> query={CurrentUserDocument} {...props} />
    );
    

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = ApolloReactCommon.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const SubOnlineUserDocument = gql`
    subscription subOnlineUser {
  onlineUser {
    id
    online
    lastSeen
  }
}
    `;
export type SubOnlineUserComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<SubOnlineUserSubscription, SubOnlineUserSubscriptionVariables>, 'subscription'>;

    export const SubOnlineUserComponent = (props: SubOnlineUserComponentProps) => (
      <ApolloReactComponents.Subscription<SubOnlineUserSubscription, SubOnlineUserSubscriptionVariables> subscription={SubOnlineUserDocument} {...props} />
    );
    

/**
 * __useSubOnlineUserSubscription__
 *
 * To run a query within a React component, call `useSubOnlineUserSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubOnlineUserSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubOnlineUserSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubOnlineUserSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<SubOnlineUserSubscription, SubOnlineUserSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<SubOnlineUserSubscription, SubOnlineUserSubscriptionVariables>(SubOnlineUserDocument, baseOptions);
      }
export type SubOnlineUserSubscriptionHookResult = ReturnType<typeof useSubOnlineUserSubscription>;
export type SubOnlineUserSubscriptionResult = ApolloReactCommon.SubscriptionResult<SubOnlineUserSubscription>;
export const SubUserTypingDocument = gql`
    subscription subUserTyping($chatId: Int!) {
  userTyping(chatId: $chatId)
}
    `;
export type SubUserTypingComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<SubUserTypingSubscription, SubUserTypingSubscriptionVariables>, 'subscription'>;

    export const SubUserTypingComponent = (props: SubUserTypingComponentProps) => (
      <ApolloReactComponents.Subscription<SubUserTypingSubscription, SubUserTypingSubscriptionVariables> subscription={SubUserTypingDocument} {...props} />
    );
    

/**
 * __useSubUserTypingSubscription__
 *
 * To run a query within a React component, call `useSubUserTypingSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubUserTypingSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubUserTypingSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useSubUserTypingSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<SubUserTypingSubscription, SubUserTypingSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<SubUserTypingSubscription, SubUserTypingSubscriptionVariables>(SubUserTypingDocument, baseOptions);
      }
export type SubUserTypingSubscriptionHookResult = ReturnType<typeof useSubUserTypingSubscription>;
export type SubUserTypingSubscriptionResult = ApolloReactCommon.SubscriptionResult<SubUserTypingSubscription>;
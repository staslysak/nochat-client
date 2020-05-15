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
  id?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
  unread?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['String']>;
  messages?: Maybe<Array<Maybe<Message>>>;
  lastMessage?: Maybe<Message>;
};

export type Subscription = {
   __typename?: 'Subscription';
  directCreated?: Maybe<Direct>;
  directDeleted: Direct;
  messageCreated: Message;
  messageDeleted: MessageDeleted;
  typingUser: Scalars['String'];
  onlineUser: User;
};


export type SubscriptionMessageCreatedArgs = {
  chatIds?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type SubscriptionMessageDeletedArgs = {
  chatIds?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type SubscriptionTypingUserArgs = {
  chatId: Scalars['Int'];
};

export type Query = {
   __typename?: 'Query';
  directs?: Maybe<Array<Direct>>;
  direct?: Maybe<Direct>;
  messages: Array<Message>;
  self: User;
  user: User;
  users?: Maybe<Array<User>>;
  onlineUsers?: Maybe<Array<User>>;
  refreshTokens?: Maybe<TokensResponse>;
};


export type QueryDirectArgs = {
  userId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};


export type QueryMessagesArgs = {
  chatId: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryUsersArgs = {
  username?: Maybe<Scalars['String']>;
};


export type QueryRefreshTokensArgs = {
  refreshToken: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  createDirect: Direct;
  deleteDirect: Scalars['Boolean'];
  readMessage: Scalars['Int'];
  deleteMessage: Scalars['Boolean'];
  createMessage: Scalars['Boolean'];
  typeMessage: Scalars['Boolean'];
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


export type MutationTypeMessageArgs = {
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

export type MessageDeleted = {
   __typename?: 'MessageDeleted';
  ids?: Maybe<Scalars['Int']>;
  chat?: Maybe<Direct>;
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
  accessToken?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};

export type TokensResponse = {
   __typename?: 'TokensResponse';
  accessToken?: Maybe<Scalars['String']>;
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
    & Pick<LoginResponse, 'accessToken' | 'refreshToken'>
  ) }
);

export type VerifyUserMutationVariables = {
  secret: Scalars['String'];
};


export type VerifyUserMutation = (
  { __typename?: 'Mutation' }
  & { tokens: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken' | 'refreshToken'>
  ) }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RefreshTokensQueryVariables = {
  refreshToken: Scalars['String'];
};


export type RefreshTokensQuery = (
  { __typename?: 'Query' }
  & { tokens?: Maybe<(
    { __typename?: 'TokensResponse' }
    & Pick<TokensResponse, 'accessToken' | 'refreshToken'>
  )> }
);

export type CreateDirectMutationVariables = {
  userId: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
};


export type CreateDirectMutation = (
  { __typename?: 'Mutation' }
  & { createDirect: (
    { __typename?: 'Direct' }
    & Pick<Direct, 'id' | 'unread'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )>, lastMessage?: Maybe<(
      { __typename?: 'Message' }
      & MessageFragmentFragment
    )> }
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
      & UserFragmentFragment
    )>, lastMessage?: Maybe<(
      { __typename?: 'Message' }
      & MessageFragmentFragment
    )> }
  )>> }
);

export type DirectQueryVariables = {
  id: Scalars['Int'];
};


export type DirectQuery = (
  { __typename?: 'Query' }
  & { direct?: Maybe<(
    { __typename?: 'Direct' }
    & Pick<Direct, 'id' | 'unread'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )>, lastMessage?: Maybe<(
      { __typename?: 'Message' }
      & MessageFragmentFragment
    )> }
  )> }
);

export type GetCurrentDirectQueryVariables = {
  userId: Scalars['Int'];
};


export type GetCurrentDirectQuery = (
  { __typename?: 'Query' }
  & { direct?: Maybe<(
    { __typename?: 'Direct' }
    & Pick<Direct, 'id' | 'unread'>
    & { lastMessage?: Maybe<(
      { __typename?: 'Message' }
      & MessageFragmentFragment
    )> }
  )>, recipient: (
    { __typename?: 'User' }
    & UserFragmentFragment
  ) }
);

export type DirectDeletedSubscriptionVariables = {};


export type DirectDeletedSubscription = (
  { __typename?: 'Subscription' }
  & { direct: (
    { __typename?: 'Direct' }
    & Pick<Direct, 'id'>
  ) }
);

export type DirectCreatedSubscriptionVariables = {};


export type DirectCreatedSubscription = (
  { __typename?: 'Subscription' }
  & { direct?: Maybe<(
    { __typename?: 'Direct' }
    & Pick<Direct, 'id' | 'unread'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )>, lastMessage?: Maybe<(
      { __typename?: 'Message' }
      & MessageFragmentFragment
    )> }
  )> }
);

export type MessageFragmentFragment = (
  { __typename?: 'Message' }
  & Pick<Message, 'id' | 'text' | 'userId' | 'chatId' | 'unread' | 'createdAt'>
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'avatar' | 'online' | 'username' | 'lastSeen' | 'createdAt'>
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

export type TypeMessageMutationVariables = {
  chatId: Scalars['Int'];
  username?: Maybe<Scalars['String']>;
};


export type TypeMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'typeMessage'>
);

export type GetMessagesQueryVariables = {
  chatId: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type GetMessagesQuery = (
  { __typename?: 'Query' }
  & { messages: Array<(
    { __typename?: 'Message' }
    & MessageFragmentFragment
  )> }
);

export type MessageCreatedSubscriptionVariables = {
  chatIds?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type MessageCreatedSubscription = (
  { __typename?: 'Subscription' }
  & { messageCreated: (
    { __typename?: 'Message' }
    & MessageFragmentFragment
  ) }
);

export type MessageDeletedSubscriptionVariables = {
  chatIds?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type MessageDeletedSubscription = (
  { __typename?: 'Subscription' }
  & { messageDeleted: (
    { __typename?: 'MessageDeleted' }
    & Pick<MessageDeleted, 'ids'>
    & { chat?: Maybe<(
      { __typename?: 'Direct' }
      & Pick<Direct, 'id' | 'unread'>
      & { lastMessage?: Maybe<(
        { __typename?: 'Message' }
        & MessageFragmentFragment
      )>, user?: Maybe<(
        { __typename?: 'User' }
        & UserFragmentFragment
      )> }
    )> }
  ) }
);

export type UsersQueryVariables = {
  username?: Maybe<Scalars['String']>;
};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<Array<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )>> }
);

export type CurrentUserQueryVariables = {};


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { self: (
    { __typename?: 'User' }
    & UserFragmentFragment
  ) }
);

export type OnlineUserSubscriptionVariables = {};


export type OnlineUserSubscription = (
  { __typename?: 'Subscription' }
  & { onlineUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'online' | 'lastSeen'>
  ) }
);

export type TypingUserSubscriptionVariables = {
  chatId: Scalars['Int'];
};


export type TypingUserSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'typingUser'>
);

export const MessageFragmentFragmentDoc = gql`
    fragment messageFragment on Message {
  id
  text
  userId
  chatId
  unread
  createdAt
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment userFragment on User {
  id
  email
  avatar
  online
  username
  lastSeen
  createdAt
}
    `;
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
    accessToken
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
  tokens: verifyUser(secret: $secret) {
    accessToken
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
export const RefreshTokensDocument = gql`
    query refreshTokens($refreshToken: String!) {
  tokens: refreshTokens(refreshToken: $refreshToken) {
    accessToken
    refreshToken
  }
}
    `;
export type RefreshTokensComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<RefreshTokensQuery, RefreshTokensQueryVariables>, 'query'> & ({ variables: RefreshTokensQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const RefreshTokensComponent = (props: RefreshTokensComponentProps) => (
      <ApolloReactComponents.Query<RefreshTokensQuery, RefreshTokensQueryVariables> query={RefreshTokensDocument} {...props} />
    );
    

/**
 * __useRefreshTokensQuery__
 *
 * To run a query within a React component, call `useRefreshTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRefreshTokensQuery({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshTokensQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RefreshTokensQuery, RefreshTokensQueryVariables>) {
        return ApolloReactHooks.useQuery<RefreshTokensQuery, RefreshTokensQueryVariables>(RefreshTokensDocument, baseOptions);
      }
export function useRefreshTokensLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RefreshTokensQuery, RefreshTokensQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RefreshTokensQuery, RefreshTokensQueryVariables>(RefreshTokensDocument, baseOptions);
        }
export type RefreshTokensQueryHookResult = ReturnType<typeof useRefreshTokensQuery>;
export type RefreshTokensLazyQueryHookResult = ReturnType<typeof useRefreshTokensLazyQuery>;
export type RefreshTokensQueryResult = ApolloReactCommon.QueryResult<RefreshTokensQuery, RefreshTokensQueryVariables>;
export const CreateDirectDocument = gql`
    mutation createDirect($userId: Int!, $text: String) {
  createDirect(userId: $userId, text: $text) {
    id
    user {
      ...userFragment
    }
    lastMessage {
      ...messageFragment
    }
    unread
  }
}
    ${UserFragmentFragmentDoc}
${MessageFragmentFragmentDoc}`;
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
      ...userFragment
    }
    lastMessage {
      ...messageFragment
    }
    unread
  }
}
    ${UserFragmentFragmentDoc}
${MessageFragmentFragmentDoc}`;
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
export const DirectDocument = gql`
    query direct($id: Int!) {
  direct(id: $id) {
    id
    user {
      ...userFragment
    }
    lastMessage {
      ...messageFragment
    }
    unread
  }
}
    ${UserFragmentFragmentDoc}
${MessageFragmentFragmentDoc}`;
export type DirectComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<DirectQuery, DirectQueryVariables>, 'query'> & ({ variables: DirectQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const DirectComponent = (props: DirectComponentProps) => (
      <ApolloReactComponents.Query<DirectQuery, DirectQueryVariables> query={DirectDocument} {...props} />
    );
    

/**
 * __useDirectQuery__
 *
 * To run a query within a React component, call `useDirectQuery` and pass it any options that fit your needs.
 * When your component renders, `useDirectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDirectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDirectQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DirectQuery, DirectQueryVariables>) {
        return ApolloReactHooks.useQuery<DirectQuery, DirectQueryVariables>(DirectDocument, baseOptions);
      }
export function useDirectLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DirectQuery, DirectQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<DirectQuery, DirectQueryVariables>(DirectDocument, baseOptions);
        }
export type DirectQueryHookResult = ReturnType<typeof useDirectQuery>;
export type DirectLazyQueryHookResult = ReturnType<typeof useDirectLazyQuery>;
export type DirectQueryResult = ApolloReactCommon.QueryResult<DirectQuery, DirectQueryVariables>;
export const GetCurrentDirectDocument = gql`
    query getCurrentDirect($userId: Int!) {
  direct: direct(userId: $userId) {
    id
    lastMessage {
      ...messageFragment
    }
    unread
  }
  recipient: user(id: $userId) {
    ...userFragment
  }
}
    ${MessageFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;
export type GetCurrentDirectComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetCurrentDirectQuery, GetCurrentDirectQueryVariables>, 'query'> & ({ variables: GetCurrentDirectQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetCurrentDirectComponent = (props: GetCurrentDirectComponentProps) => (
      <ApolloReactComponents.Query<GetCurrentDirectQuery, GetCurrentDirectQueryVariables> query={GetCurrentDirectDocument} {...props} />
    );
    

/**
 * __useGetCurrentDirectQuery__
 *
 * To run a query within a React component, call `useGetCurrentDirectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentDirectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentDirectQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetCurrentDirectQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrentDirectQuery, GetCurrentDirectQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCurrentDirectQuery, GetCurrentDirectQueryVariables>(GetCurrentDirectDocument, baseOptions);
      }
export function useGetCurrentDirectLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrentDirectQuery, GetCurrentDirectQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCurrentDirectQuery, GetCurrentDirectQueryVariables>(GetCurrentDirectDocument, baseOptions);
        }
export type GetCurrentDirectQueryHookResult = ReturnType<typeof useGetCurrentDirectQuery>;
export type GetCurrentDirectLazyQueryHookResult = ReturnType<typeof useGetCurrentDirectLazyQuery>;
export type GetCurrentDirectQueryResult = ApolloReactCommon.QueryResult<GetCurrentDirectQuery, GetCurrentDirectQueryVariables>;
export const DirectDeletedDocument = gql`
    subscription directDeleted {
  direct: directDeleted {
    id
  }
}
    `;
export type DirectDeletedComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<DirectDeletedSubscription, DirectDeletedSubscriptionVariables>, 'subscription'>;

    export const DirectDeletedComponent = (props: DirectDeletedComponentProps) => (
      <ApolloReactComponents.Subscription<DirectDeletedSubscription, DirectDeletedSubscriptionVariables> subscription={DirectDeletedDocument} {...props} />
    );
    

/**
 * __useDirectDeletedSubscription__
 *
 * To run a query within a React component, call `useDirectDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDirectDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDirectDeletedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useDirectDeletedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<DirectDeletedSubscription, DirectDeletedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<DirectDeletedSubscription, DirectDeletedSubscriptionVariables>(DirectDeletedDocument, baseOptions);
      }
export type DirectDeletedSubscriptionHookResult = ReturnType<typeof useDirectDeletedSubscription>;
export type DirectDeletedSubscriptionResult = ApolloReactCommon.SubscriptionResult<DirectDeletedSubscription>;
export const DirectCreatedDocument = gql`
    subscription directCreated {
  direct: directCreated {
    id
    user {
      ...userFragment
    }
    lastMessage {
      ...messageFragment
    }
    unread
  }
}
    ${UserFragmentFragmentDoc}
${MessageFragmentFragmentDoc}`;
export type DirectCreatedComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<DirectCreatedSubscription, DirectCreatedSubscriptionVariables>, 'subscription'>;

    export const DirectCreatedComponent = (props: DirectCreatedComponentProps) => (
      <ApolloReactComponents.Subscription<DirectCreatedSubscription, DirectCreatedSubscriptionVariables> subscription={DirectCreatedDocument} {...props} />
    );
    

/**
 * __useDirectCreatedSubscription__
 *
 * To run a query within a React component, call `useDirectCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDirectCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDirectCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useDirectCreatedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<DirectCreatedSubscription, DirectCreatedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<DirectCreatedSubscription, DirectCreatedSubscriptionVariables>(DirectCreatedDocument, baseOptions);
      }
export type DirectCreatedSubscriptionHookResult = ReturnType<typeof useDirectCreatedSubscription>;
export type DirectCreatedSubscriptionResult = ApolloReactCommon.SubscriptionResult<DirectCreatedSubscription>;
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
export const TypeMessageDocument = gql`
    mutation typeMessage($chatId: Int!, $username: String) {
  typeMessage(chatId: $chatId, username: $username)
}
    `;
export type TypeMessageMutationFn = ApolloReactCommon.MutationFunction<TypeMessageMutation, TypeMessageMutationVariables>;
export type TypeMessageComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<TypeMessageMutation, TypeMessageMutationVariables>, 'mutation'>;

    export const TypeMessageComponent = (props: TypeMessageComponentProps) => (
      <ApolloReactComponents.Mutation<TypeMessageMutation, TypeMessageMutationVariables> mutation={TypeMessageDocument} {...props} />
    );
    

/**
 * __useTypeMessageMutation__
 *
 * To run a mutation, you first call `useTypeMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTypeMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [typeMessageMutation, { data, loading, error }] = useTypeMessageMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useTypeMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TypeMessageMutation, TypeMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<TypeMessageMutation, TypeMessageMutationVariables>(TypeMessageDocument, baseOptions);
      }
export type TypeMessageMutationHookResult = ReturnType<typeof useTypeMessageMutation>;
export type TypeMessageMutationResult = ApolloReactCommon.MutationResult<TypeMessageMutation>;
export type TypeMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<TypeMessageMutation, TypeMessageMutationVariables>;
export const GetMessagesDocument = gql`
    query getMessages($chatId: Int!, $offset: Int) {
  messages(chatId: $chatId, offset: $offset) {
    ...messageFragment
  }
}
    ${MessageFragmentFragmentDoc}`;
export type GetMessagesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMessagesQuery, GetMessagesQueryVariables>, 'query'> & ({ variables: GetMessagesQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetMessagesComponent = (props: GetMessagesComponentProps) => (
      <ApolloReactComponents.Query<GetMessagesQuery, GetMessagesQueryVariables> query={GetMessagesDocument} {...props} />
    );
    

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, baseOptions);
      }
export function useGetMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, baseOptions);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesQueryResult = ApolloReactCommon.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export const MessageCreatedDocument = gql`
    subscription messageCreated($chatIds: [Int]) {
  messageCreated(chatIds: $chatIds) {
    ...messageFragment
  }
}
    ${MessageFragmentFragmentDoc}`;
export type MessageCreatedComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<MessageCreatedSubscription, MessageCreatedSubscriptionVariables>, 'subscription'>;

    export const MessageCreatedComponent = (props: MessageCreatedComponentProps) => (
      <ApolloReactComponents.Subscription<MessageCreatedSubscription, MessageCreatedSubscriptionVariables> subscription={MessageCreatedDocument} {...props} />
    );
    

/**
 * __useMessageCreatedSubscription__
 *
 * To run a query within a React component, call `useMessageCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageCreatedSubscription({
 *   variables: {
 *      chatIds: // value for 'chatIds'
 *   },
 * });
 */
export function useMessageCreatedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<MessageCreatedSubscription, MessageCreatedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<MessageCreatedSubscription, MessageCreatedSubscriptionVariables>(MessageCreatedDocument, baseOptions);
      }
export type MessageCreatedSubscriptionHookResult = ReturnType<typeof useMessageCreatedSubscription>;
export type MessageCreatedSubscriptionResult = ApolloReactCommon.SubscriptionResult<MessageCreatedSubscription>;
export const MessageDeletedDocument = gql`
    subscription messageDeleted($chatIds: [Int]) {
  messageDeleted(chatIds: $chatIds) {
    ids
    chat {
      id
      lastMessage {
        ...messageFragment
      }
      user {
        ...userFragment
      }
      unread
    }
  }
}
    ${MessageFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;
export type MessageDeletedComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<MessageDeletedSubscription, MessageDeletedSubscriptionVariables>, 'subscription'>;

    export const MessageDeletedComponent = (props: MessageDeletedComponentProps) => (
      <ApolloReactComponents.Subscription<MessageDeletedSubscription, MessageDeletedSubscriptionVariables> subscription={MessageDeletedDocument} {...props} />
    );
    

/**
 * __useMessageDeletedSubscription__
 *
 * To run a query within a React component, call `useMessageDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageDeletedSubscription({
 *   variables: {
 *      chatIds: // value for 'chatIds'
 *   },
 * });
 */
export function useMessageDeletedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<MessageDeletedSubscription, MessageDeletedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<MessageDeletedSubscription, MessageDeletedSubscriptionVariables>(MessageDeletedDocument, baseOptions);
      }
export type MessageDeletedSubscriptionHookResult = ReturnType<typeof useMessageDeletedSubscription>;
export type MessageDeletedSubscriptionResult = ApolloReactCommon.SubscriptionResult<MessageDeletedSubscription>;
export const UsersDocument = gql`
    query users($username: String) {
  users(username: $username) {
    ...userFragment
  }
}
    ${UserFragmentFragmentDoc}`;
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
  self {
    ...userFragment
  }
}
    ${UserFragmentFragmentDoc}`;
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
export const OnlineUserDocument = gql`
    subscription onlineUser {
  onlineUser {
    id
    online
    lastSeen
  }
}
    `;
export type OnlineUserComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<OnlineUserSubscription, OnlineUserSubscriptionVariables>, 'subscription'>;

    export const OnlineUserComponent = (props: OnlineUserComponentProps) => (
      <ApolloReactComponents.Subscription<OnlineUserSubscription, OnlineUserSubscriptionVariables> subscription={OnlineUserDocument} {...props} />
    );
    

/**
 * __useOnlineUserSubscription__
 *
 * To run a query within a React component, call `useOnlineUserSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnlineUserSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnlineUserSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnlineUserSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnlineUserSubscription, OnlineUserSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<OnlineUserSubscription, OnlineUserSubscriptionVariables>(OnlineUserDocument, baseOptions);
      }
export type OnlineUserSubscriptionHookResult = ReturnType<typeof useOnlineUserSubscription>;
export type OnlineUserSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnlineUserSubscription>;
export const TypingUserDocument = gql`
    subscription typingUser($chatId: Int!) {
  typingUser(chatId: $chatId)
}
    `;
export type TypingUserComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<TypingUserSubscription, TypingUserSubscriptionVariables>, 'subscription'>;

    export const TypingUserComponent = (props: TypingUserComponentProps) => (
      <ApolloReactComponents.Subscription<TypingUserSubscription, TypingUserSubscriptionVariables> subscription={TypingUserDocument} {...props} />
    );
    

/**
 * __useTypingUserSubscription__
 *
 * To run a query within a React component, call `useTypingUserSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTypingUserSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTypingUserSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useTypingUserSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<TypingUserSubscription, TypingUserSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<TypingUserSubscription, TypingUserSubscriptionVariables>(TypingUserDocument, baseOptions);
      }
export type TypingUserSubscriptionHookResult = ReturnType<typeof useTypingUserSubscription>;
export type TypingUserSubscriptionResult = ApolloReactCommon.SubscriptionResult<TypingUserSubscription>;
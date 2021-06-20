import { gql } from "@apollo/client";

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    likes
    commentNumber
    isLiked
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      username
    }
    payload
    isMine
    createdAt
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    avatar
    isFollowing
    isMe
  }
`;

export const FEED_PHOTO = gql`
  fragment FeedPhotoFragment on Photo {
    ...PhotoFragment
    user {
      id
      username
      avatar
    }
    caption
    createdAt
    isMine
  }
  ${PHOTO_FRAGMENT}
`;

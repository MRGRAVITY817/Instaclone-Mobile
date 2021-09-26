import { gql, useQuery } from "@apollo/client";
import { SeeAllFeeds } from "../__generated__/SeeAllFeeds";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "./fragments";

export const FEED_QUERY = gql`
  query SeeAllFeeds($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
      likes
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export const useSeeFeed = () =>
  useQuery<SeeAllFeeds>(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });

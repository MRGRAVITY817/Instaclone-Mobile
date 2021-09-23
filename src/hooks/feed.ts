import { gql } from "@apollo/client";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "./fragments";

export const FEED_QUERY = gql`
  query SeeAllFeeds($offset: Int!) {
    seeFeed(offset: $offset) {
      ok
      error
      feeds {
        ...PhotoFragment
        user {
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
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

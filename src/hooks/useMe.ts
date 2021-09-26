import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";
import { Me } from "../__generated__/Me";

const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      avatar
    }
  }
`;

export const useMe = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery<Me>(ME_QUERY, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return { data };
};

import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { RootTabParamList } from "../navigators/LoggedInNav";
import { SharedStackNavParamList } from "../navigators/SharedStackNav";

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
`;

const FollowBtn = styled.TouchableOpacity`
  background-color: ${colors.blue};
  justify-content: center;
  padding: 5px 10px;
  border-radius: 4px;
`;

const FollowBtnText = styled.Text`
  color: white;
  font-weight: 600;
`;

const Column = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-right: 10px;
`;

const Username = styled.Text`
  font-weight: 600;
  color: white;
`;

interface UserRowProps {
  avatar: string;
  username: string;
  isFollowing: boolean;
  isMe: boolean;
  id: number;
}

type UserRowNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, "FeedRoot">,
  StackNavigationProp<SharedStackNavParamList>
>;

export const UserRow: React.FC<UserRowProps> = ({
  avatar,
  username,
  isFollowing,
  isMe,
  id,
}) => {
  const navigation = useNavigation<UserRowNavProps>();
  return (
    <Wrapper>
      <Column
        onPress={() =>
          navigation.navigate("Profile", {
            username,
            id,
          })
        }
      >
        <Avatar source={{ uri: avatar }} />
        <Username>{username}</Username>
      </Column>
      {!isMe ? (
        <FollowBtn>
          <FollowBtnText>{isFollowing ? "Unfollow" : "Follow"}</FollowBtnText>
        </FollowBtn>
      ) : null}
    </Wrapper>
  );
};

import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { RootStackParamList } from "../navigators/LoggedOutNav";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../colors";
import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthButton } from "../components/auth/AuthButton";

type WelcomeProps = StackScreenProps<RootStackParamList, "Welcome">;

const LoginLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 15px;
  width: 100%;
  text-align: center;
`;

export const Welcome: React.FC<WelcomeProps> = ({ navigation }) => {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogin = () =>
    navigation.navigate("Login", { username: "", password: "" });

  return (
    <AuthLayout>
      <AuthButton
        text="Create Account"
        disabled={false}
        onPress={goToCreateAccount}
      />
      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>Log In</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
};

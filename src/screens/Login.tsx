import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useRef, Ref } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { AuthButton } from "../components/auth/AuthButton";
import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthTextInput } from "../components/auth/AuthShared";
import { RootStackParamList } from "../navigators/LoggedOutNav";
import { gql, useMutation } from "@apollo/client";
import { Login as LoginMutation, LoginVariables } from "../__generated__/login";
import { logUserIn } from "../apollo";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

type LoginProps = StackScreenProps<RootStackParamList, "Login">;

interface LoginFormInput {
  username: string;
  password: string;
}

export const Login: React.FC<LoginProps> = ({ route: { params } }) => {
  const onCompleted = async (data: LoginMutation) => {
    const { ok, token } = data.login;
    if (ok) {
      await logUserIn(token);
    }
  };

  const [loginMutation, { loading, error }] = useMutation<
    LoginMutation,
    LoginVariables
  >(LOGIN_MUTATION, { onCompleted });

  const passwordRef = useRef(null);
  const onNext = (nextRef: React.RefObject<TextInput>) => {
    nextRef.current?.focus();
  };

  const { handleSubmit, register, setValue, watch } = useForm<LoginFormInput>({
    defaultValues: {
      username: params?.username,
      password: params?.password,
    },
  });

  const onValid = (data: LoginFormInput) => {
    if (!loading) {
      loginMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    register("username", { required: "Username required" });
    register("password", { required: "Password required" });
  }, [register]);

  return (
    <AuthLayout>
      <AuthTextInput
        placeholder="Username"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        value={watch("username")}
        onChangeText={(text) => setValue("username", text)}
      />
      <AuthTextInput
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onChangeText={(text) => setValue("password", text)}
        value={watch("password")}
        onSubmitEditing={handleSubmit(onValid)}
      />
      <AuthButton
        onPress={handleSubmit(onValid)}
        disabled={!watch("username") || !watch("password")}
        loading={loading}
        text="Log in"
      />
    </AuthLayout>
  );
};

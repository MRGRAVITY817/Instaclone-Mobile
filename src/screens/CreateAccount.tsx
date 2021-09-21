import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useRef } from "react";
import { RootStackParamList } from "../navigators/LoggedOutNav";
import { TextInput } from "react-native";
import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthButton } from "../components/auth/AuthButton";
import { AuthTextInput } from "../components/auth/AuthShared";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from "../__generated__/CreateAccountMutation";

type CreateAccountProps = StackScreenProps<RootStackParamList, "CreateAccount">;

interface CreateAccountFormInput {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccountMutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
      password: $password
    ) {
      ok
      error
    }
  }
`;

export const CreateAccount: React.FC<CreateAccountProps> = ({ navigation }) => {
  const { register, handleSubmit, setValue, getValues } =
    useForm<CreateAccountFormInput>();
  const lastNameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onNext = (nextRef: React.RefObject<TextInput>) => {
    nextRef?.current?.focus();
  };

  const onCompleted = (data: CreateAccountMutation) => {
    const { ok } = data.createAccount;
    const { username, password } = getValues();
    if (ok) {
      navigation.navigate("Login", {
        username,
        password,
      });
    }
  };

  const [createAccountMutation, { loading }] = useMutation<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >(CREATE_ACCOUNT_MUTATION, { onCompleted });

  const onValid = (data: CreateAccountFormInput) => {
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    register("firstName", { required: "First Name required" });
    register("lastName", { required: "Last Name required" });
    register("email", { required: "Email required" });
    register("username", { required: "Username required" });
    register("password", { required: "Password required" });
  }, [register]);

  return (
    <AuthLayout>
      <AuthTextInput
        placeholder="First Name"
        placeholderTextColor="gray"
        returnKeyType="next"
        onSubmitEditing={() => onNext(lastNameRef)}
        onChangeText={(text) => setValue("firstName", text)}
      />
      <AuthTextInput
        ref={lastNameRef}
        placeholder="Last Name"
        placeholderTextColor="gray"
        returnKeyType="next"
        onSubmitEditing={() => onNext(usernameRef)}
        onChangeText={(text) => setValue("lastName", text)}
      />
      <AuthTextInput
        ref={usernameRef}
        placeholder="Username"
        placeholderTextColor="gray"
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(emailRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <AuthTextInput
        ref={emailRef}
        placeholder="Email"
        placeholderTextColor="gray"
        keyboardType="email-address"
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("email", text)}
      />
      <AuthTextInput
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        autoCapitalize="none"
        returnKeyType="done"
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        text="Create Account"
        disabled={false}
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
};

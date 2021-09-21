import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Rx Vars
export const isLoggedInVar = makeVar<boolean>(false);
export const tokenVar = makeVar<string>("");

// AsyncStorage is mobile version of Local Storage
export const logUserIn = async (token: string | null) => {
  await AsyncStorage.multiSet([
    ["token", JSON.stringify(token)],
    ["loggedIn", JSON.stringify("yes")],
  ]);
  isLoggedInVar(true);
};

const client = new ApolloClient({
  uri: "http://localhost:4334/graphql",
  cache: new InMemoryCache(),
});

export default client;

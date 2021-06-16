import {
  ApolloClient,
  InMemoryCache,
  makeVar,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN = "token";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async (token) => {
  // await AsyncStorage.setItem("token", JSON.stringify(token));
  // await AsyncStorage.multiSet([[TOKEN, token]]);
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  // await AsyncStorage.multiRemove([TOKEN]);
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar("");
};

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeFeed: offsetLimitPagination(),
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default client;
// 휴대폰에서 테스트한다면 ip 주소 공유
// 1. 로컬 터미널에서 명령에 따라 public IP 가져오기 -> 업데이트 해야 할 수 있음
// 2. ngrok (free, unlimited) / localtunnel
// 2-1. ngrok 다운받고 -> 터미널에서 ngrok 파일이 있는 곳으로 이동 -> ./ngrok http PORT_NUMBER
// 2-2. npx localtunnel --port PORT_NUMBER

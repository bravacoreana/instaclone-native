import AsyncStorage from "@react-native-async-storage/async-storage";

const { ApolloClient, InMemoryCache, makeVar } = require("@apollo/client");

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async (token) => {
  // await AsyncStorage.setItem("token", JSON.stringify(token));
  await AsyncStorage.multiSet([
    ["token", token],
    // ["loggedIn", JSON.stringify("yes")],
  ]);
  isLoggedInVar(true);
  tokenVar(token);
};
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // BACKEND_URI
  cache: new InMemoryCache(),
});

export default client;

// 휴대폰에서 테스트한다면 ip 주소 공유
// 1. 로컬 터미널에서 명령에 따라 public IP 가져오기 -> 업데이트 해야 할 수 있음
// 2. ngrok (free, unlimited) / localtunnel
// 2-1. ngrok 다운받고 -> 터미널에서 ngrok 파일이 있는 곳으로 이동 -> ./ngrok http PORT_NUMBER
// 2-2. npx localtunnel --port PORT_NUMBER

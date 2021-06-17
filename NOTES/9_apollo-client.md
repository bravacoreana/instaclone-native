# Apollo Client

- [doc 보러가기](https://www.apollographql.com/docs/react/integrations/react-native/)

```
$ npm install @apollo/client graphql
```

- apollo client 는 uri가 필요

```js
import React from "react";
import { AppRegistry } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "localhost:4000/graphql", // * apollo client uri - 하단 코멘트 참고
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <MyRootComponent />
  </ApolloProvider>
);
```

- apollo client uri: 백엔드 주소가 들어가는 곳
  - 휴대폰으로 사용할 경우 localhost 이용 불가
    - 내 ip address 넣기
    - ngrok, localtunnel 로 ip주소 생성해 추가

### ngrok 사용방법

1. [ngrok 다운로드](https://ngrok.com/download)
2. ngrok 설치 후 터미널에서 ngrok 파일이 있는 폴더로 이동
3. `$ ./ngrok http BACKEND_PORT_NUMBER`
4. 생성되는 url을 apollo client uri에 추가
5. ngrok 가입하지 않으면 url 사라짐

### localtunnel 사용방법

1. `npx localtunnel --port BACKEND_PORT_NUMBER`
2. 생성되는 주소로 들어가 `continue` 클릭
3. apollo client uri 에 주소 추가

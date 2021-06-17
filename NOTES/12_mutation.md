```js
import { gql, useMutation } from "@apollo/client";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

// 1. 뮤테이션 불러오기
const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function Login() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const passwordRef = useRef();

  // 4. 서버가 리턴한 데이터를 받음
  const onCompleted = (data) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      isLoggedInVar(true); // 토큰으로 아직 아무것도 안함! 로그인 여부만 true로 바꿔줌
    }
  };

  // 2. useMutation 훅 사용
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onValid = (data) => {
    // data: form values
    // 3. 로딩중이 아닐 경우 뮤테이션에서 데이터를 가지고 오도록 함
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(/*...*/);

  return (
    <AuthLayout>
      <TextInput
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        ref={passwordRef}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        text="Log In"
        // useMutation으로부터 받는 loading
        loading={loading}
        // 둘 중에 하나라도 존재하지 않으면 버튼 비활성화
        disabled={!watch("username") || !watch("password")}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
```

- 폼 조건을 만족하지 못할 경우 `disable` prop을 이용해 submit 버튼을 비활성화 하고싶음

  - web: `formState`
  - RN: `watch`
    - RN은 `formState` 를 지원하지 않음. formState는 `onChange`, `onSubmit`, `onBlur` 같은 이벤트에 의해 일어나는데, RN에는 그런 이벤트들이 없음

- watch: 폼의 값을 실시간으로 봄(realtime)
- getValues: 폼의 값을 한번만 보고 저장

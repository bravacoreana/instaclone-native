### 폼 예시

```js
// CreateAccount.js
import React, { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import { TextInput } from "../components/auth/AuthCommon";
import AuthLayout from "../components/auth/AuthLayout";

export default function CreateAccount({ navigation }) {
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onNext = (arg) => {
    // 현재 input을 포커스 해줌
    // onSubmitEditing 에서 불렸으므로 다음 input이 focus가 됨
    arg?.current?.focus();
  };

  const onValid = (data) => {
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  return (
    <AuthLayout>
      <TextInput
        placeholder="First Name"
        returnKeyType="next"
        onSubmitEditing={() => onNext(lastNameRef)} // 이 Input이 완성된 다음에 할 일
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        onChangeText={(text) => setValue("firstName", text)}
      />
      // ...
      <TextInput
        ref={emailRef}
        placeholder="Email"
        keyboardType="email-address" // 키보드 타입 지정
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(passwordRef)}
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        onChangeText={(text) => setValue("email", text)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne={true} //prop으로 마진 줌
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        onChangeText={(text) => setValue("password", text)}
        onPress={handleSubmit(onValid)} // 마지막 input
      />
      <AuthButton
        text="Create Account"
        disabled={false}
        // loading={true} // ActivityIndicator을 이용하기 위한 prop
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
```

### 폼 레이아웃

- 여전히 인풋에 타이핑 할 수 없음 -> touchable

```js
// AuthLayout.js

import React from "react";
import styled from "styled-components/native";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import DismissKeyboard from "../DismissKeyboard";

const Container = styled.View`...`;
const Logo = styled.Image`...`;

export default function AuthLayout({ children }) {
  return (
    <DismissKeyboard>
      <Container>
        // 키보드 활성화 시 줄 옵션
        <KeyboardAvoidingView
          style={{ width: "100%" }}
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0} //ios면 키보드 위로 공간을 50 줘!
        >
          <Logo />
          {children}
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
}
```

### 폼 레이아웃- DismissKeyboard

```js
import React from "react";
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";

export default function DismissKeyboard({ children }) {
  const dismissKeyboard = () => {
    // Keyboard API from RN
    Keyboard.dismiss(); // 키보드 밖 클릭 시 키보드 사라짐
  };

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => dismissKeyboard()}
      disabled={Platform.OS === "web"} // 웹에서 input 입력 안되는 문제 해결
    >
      {children}
    </TouchableWithoutFeedback>
  );
}
```

### 폼 버튼

```js
import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";

const Button = styled.TouchableOpacity`
  // ...
  // 폼이 조건을 만족하지 못할 때 가시적으로 보여줌
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const ButtonText = styled.Text``;

export default function AuthButton({ onPress, disabled, text, loading }) {
  return (
    <Button disabled={disabled} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="#fff" /> // 로딩을 보여줌
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  );
}
```

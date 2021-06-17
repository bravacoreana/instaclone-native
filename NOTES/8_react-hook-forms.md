# react-hook-form

- 웹, RN 모두 사용 가능

```
$ npm install react-hook-form
```

## 1. react-hook-form 기본 설정

```js
// LogIn.js

export default function LogIn({ route: { params } }) {
  // 1. useForm 선언
  const { register, handleSubmit, setValue } = useForm();
  const passwordRef = useRef();
  const onNext = (arg) => {
    arg?.current?.focus();
  };
  const onValid = (data) => {
    // ...
  };

  // 3. useEffect 등록 - web 에서와의 차이점: TextInput에서 register 하지 않음
  useEffect(() => {
    register("username");
    register("password");
  }, [register]); // register가 바뀔 때마다 새로 실행

  return (
    <AuthLayout>
      <TextInput
        placeholder="Username"
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(passwordRef)}
        // 4. onChangeText(only RN): text를 argument로 줌
        onChangeText={(text) => setValue("username", text)} // text가 바뀔 때 setValue 값도 변하게 함
      />
      <TextInput
        value={watch("password")}
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        onSubmitEditing={handleSubmit(onValid)} // 2-1. 마지막 input에서 done을 눌러도 useForm 이 반응하도록 함
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        text="Log In"
        loading={loading}
        disabled={!watch("username") || !watch("password")}
        onPress={handleSubmit(onValid)} // 2. 폼을 제출했을 때 실행할 함수: handleSubmit은 useForm에서 내장 되어있는 함수
      />
    </AuthLayout>
  );
}
```

## 2. validation

```js
useEffect(() => {
  register("username", { required: true });
  register("password", { required: true });
}, [register]);
```

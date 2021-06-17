### createAccount에서 login으로 폼 데이터 보내기

- navigation prop을 이용해 LogIn 페이지로 보냄

```js
// createAccount.js

export default function CreateAccount({ navigation }) {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const onCompleted = (data) => {
    const {
      createAccount: { ok },
    } = data;
    // 1. getValues를 통해 저장된 값을 가지고 옴
    const { username, password } = getValues();

    if (ok) {
        // 2. LogIn 페이지에 {...} 파라미터를 보냄
      navigation.navigate("LogIn", {
        username,
        password,
      });
    }
  };
```

```js
// logIn.js

// logIn에서는 route prop을 이용
export default function Login({ route }) {
  const { params } = route;
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      username: params?.username,
      password: params?.password,
    },
  });

  return (
    <AuthLayout>
      <TextInput
        value={watch("username")}
        //...
      />
    //...
  )
}
```

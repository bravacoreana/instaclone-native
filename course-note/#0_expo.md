# [expo](https://docs.expo.io/)

- expo 서버에서 개발해 내가 윈도우 컴퓨터를 써도 ios 개발을 할 수 있도록 함
- expo cli를 쓸거냐 RN cli를 쓸거냐 묻는 건 크게 의미가 없음
- expo는 마치 리액트의 create-react-app 같은 것(create-react-app은 리액트JS 설정 필요 x)
- expo CLI: 설정을 할 필요 없지만 더 제한적임
- RN CLI: 설정해줘야 함. 엑스포보다는 불편하지만 자유도가 높음

- good
  - android, ios, web 모두 빌드 가능
  - Expo SDK 규모는 점점 작아지고 있지만 여전히 많은 기능이 있음 (예: mapview)
  - RN CLI로 시작할 경우 설치/설정이 너무 번거로움(특히 윈도우)
  - Expo Go: 휴대폰에서 테스트 가능(RN에서 하려면 가이드라인 봐야함)
  - Expo snack: 브라우저 상에서 expo를 통해 개발할 수도 있음
  - 앱스토어에 배포 후 over the air update 지원(앱스토어 스킵)
    - expo가 내부적으로 항상 업데이트 체크
    - 그냥 업데이트 올리기만 하면 됨
    - RN에서도 가능
- bad
  - xcode나 android studio 파일에 접근해야 할 경우 제한이 있음
  - expo SDK에 없는게 필요할 때도 있음 (예: 블루투스)
    - RN bluetooth 찾아 직접 세팅해 써야하지만 이것 자체가 expo에선 불가능 -> RN CLI 써야 함
  - 무거움: 필요없는 모든 API까지 포함해 final 번들에 생성됨

---

expo 와 RN CLI 함께 사용하기: eject
: 모든 설정 파일을 expose 함 (create-react-app에서도 꺼내 웹팩 파일 등을 노출할 수 있음)

- expo의 애플 인증 같은 걸 쓸 수 있음
- RN의 블루투스도 쓸 수 있음
- 필요 없는 API 삭제로 용량을 줄일 수도 있음

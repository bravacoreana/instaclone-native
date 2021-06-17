```js
{
  "expo": {
    "name": "nomadcoffee-native",
    "slug": "nomadcoffee-native",
    "version": "1.0.0",
    "orientation": "portrait",

    // 앱 아이콘
    "icon": "./assets/icon.png",

    // 첫 화면
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      // 아이패드도 지원
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

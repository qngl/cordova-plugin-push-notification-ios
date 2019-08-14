# cordova-plugin-push-notification-ios

> Register and receive push notifications from APNs


### Example

```javascript
const push = PushNotification.init({
  android: {},
  browser: {
    pushServiceURL: 'http://push.api.phonegap.com/v1/push'
  },
  ios: {
    alert: 'true',
    badge: true,
    sound: 'false'
  },
  windows: {}
});
```


## push.on(event, callback)

### Parameters

| Parameter  | Type       | Default | Description                                                        |
| ---------- | ---------- | ------- | ------------------------------------------------------------------ |
| `event`    | `string`   |         | Name of the event to listen to. See below for all the event names. |
| `callback` | `Function` |         | Is called when the event is triggered.                             |

## push.on('registration', callback)

The event `registration` will be triggered on each successful registration with the 3rd party push service.

### Callback parameters

| Parameter               | Type     | Description                                                                     |
| ----------------------- | -------- | ------------------------------------------------------------------------------- |
| `data.registrationId`   | `string` | The registration ID provided by the 3rd party remote push service.              |
| `data.registrationType` | `string` | The registration type of the 3rd party remote push service. Either FCM or APNS. |

### Example

```javascript
push.on('registration', data => {
  console.log(data.registrationId);
  console.log(data.registrationType);
});
```

## push.on('notification', callback)

The event `notification` will be triggered each time a push notification is received by a 3rd party push service on the device.

### Callback parameters

| Parameter                        | Type      | Description                                                                                                                                                                                                                         |
| -------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data.message`                   | `string`  | The text of the push message sent from the 3rd party service.                                                                                                                                                                       |
| `data.title`                     | `string`  | The optional title of the push message sent from the 3rd party service.                                                                                                                                                             |
| `data.count`                     | `string`  | The number of messages to be displayed in the badge in iOS/Android or message count in the notification shade in Android. For windows, it represents the value in the badge notification which could be a number or a status glyph. |
| `data.sound`                     | `string`  | The name of the sound file to be played upon receipt of the notification.                                                                                                                                                           |
| `data.image`                     | `string`  | The path of the image file to be displayed in the notification.                                                                                                                                                                     |
| `data.launchArgs`                | `string`  | The args to be passed to the application on launch from push notification. This works when notification is received in background. (Windows Only)                                                                                   |
| `data.additionalData`            | `Object`  | An optional collection of data sent by the 3rd party push service that does not fit in the above properties.                                                                                                                        |
| `data.additionalData.foreground` | `boolean` | Whether the notification was received while the app was in the foreground                                                                                                                                                           |
| `data.additionalData.coldstart`  | `boolean` | Will be `true` if the application is started by clicking on the push notification, `false` if the app is already started.                                                                                                           |
| `data.additionalData.dismissed`  | `boolean` | Is set to `true` if the notification was dismissed by the user                                                                                                                                                                      |

### Example

```javascript
push.on('notification', data => {
  console.log(data.message);
  console.log(data.title);
  console.log(data.count);
  console.log(data.sound);
  console.log(data.image);
  console.log(data.additionalData);
});
```

## push.on('error', callback)

The event `error` will trigger when an internal error occurs and the cache is aborted.

### Callback parameters

| Parameter | Type    | Description                                                |
| --------- | ------- | ---------------------------------------------------------- |
| `e`       | `Error` | Standard JavaScript error object that describes the error. |

### Example

```javascript
push.on('error', e => {
  console.log(e.message);
});
```
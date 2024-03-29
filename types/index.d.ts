// Type definitions for cordova-plugin-push-notification-ios
// Project: https://github.com/phonegap/cordova-plugin-push-notification-ios
// Definitions by: Frederico Galvão <https://github.com/fredgalvao>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace PhonegapPluginPush {
	type EventResponse = RegistrationEventResponse | NotificationEventResponse | Error

	interface PushNotification {
		/**
		 * The event registration will be triggered on each successful registration with the 3rd party push service.
		 * @param event
		 * @param callback
		 */
		on(event: "registration", callback: (response: RegistrationEventResponse) => any): void
		/**
		 * The event notification will be triggered each time a push notification is received by a 3rd party push service on the device.
		 * @param event
		 * @param callback
		 */
		on(event: "notification", callback: (response: NotificationEventResponse) => any): void
		/**
		 * The event error will trigger when an internal error occurs and the cache is aborted.
		 * @param event
		 * @param callback
		 */
		on(event: "error", callback: (response: Error) => any): void
		/**
		 *
		 * @param event Name of the event to listen to. See below(above) for all the event names.
		 * @param callback is called when the event is triggered.
		 * @param event
		 * @param callback
		 */
		on(event: string, callback: (response: EventResponse) => any): void

		off(event: "registration", callback: (response: RegistrationEventResponse) => any): void
		off(event: "notification", callback: (response: NotificationEventResponse) => any): void
		off(event: "error", callback: (response: Error) => any): void
		/**
		 * As stated in the example, you will have to store your event handler if you are planning to remove it.
		 * @param event Name of the event type. The possible event names are the same as for the push.on function.
		 * @param callback handle to the function to get removed.
		 * @param event
		 * @param callback
		 */
		off(event: string, callback: (response: EventResponse) => any): void

		/**
		 * The unregister method is used when the application no longer wants to receive push notifications.
		 * Beware that this cleans up all event handlers previously registered,
		 * so you will need to re-register them if you want them to function again without an application reload.
		 * @param successHandler
		 * @param errorHandler
		 * @param topics
		 */
		unregister(successHandler: () => any, errorHandler?: () => any, topics?: string[]): void

		/**
		 * The subscribe method is used when the application wants to subscribe a new topic to receive push notifications.
		 * @param topic Topic to subscribe to.
		 * @param successHandler Is called when the api successfully unregisters.
		 * @param errorHandler Is called when the api encounters an error while unregistering.
		 */
		subscribe(topic: string, successHandler: () => any, errorHandler: () => any): void;

		/**
		 * The unsubscribe method is used when the application no longer wants to receive push notifications
		 * from a specific topic but continue to receive other push messages.
		 * @param topic Topic to unsubscribe from.
		 * @param successHandler Is called when the api successfully unregisters.
		 * @param errorHandler Is called when the api encounters an error while unregistering.
		 */
		unsubscribe(topic: string, successHandler: () => any, errorHandler: () => any): void;

		/*TODO according to js source code, "errorHandler" is optional, but is "count" also optional? I can't read objetive-C code (can anyone at all? I wonder...)*/
		/**
		 * Set the badge count visible when the app is not running
		 *
		 * The count is an integer indicating what number should show up in the badge.
		 * Passing 0 will clear the badge.
		 * Each notification event contains a data.count value which can be used to set the badge to correct number.
		 * @param successHandler
		 * @param errorHandler
		 * @param count
		 */
		setApplicationIconBadgeNumber(successHandler: () => any, errorHandler: () => any, count: number): void

		/**
		 * Get the current badge count visible when the app is not running
		 * successHandler gets called with an integer which is the current badge count
		 * @param successHandler
		 * @param errorHandler
		 */
		getApplicationIconBadgeNumber(successHandler: (count: number) => any, errorHandler: () => any): void

		/**
		 * iOS only
		 * Tells the OS that you are done processing a background push notification.
		 * successHandler gets called when background push processing is successfully completed.
		 * @param successHandler
		 * @param errorHandler
		 * @param id
		 */
		finish(successHandler?: () => any, errorHandler?: () => any, id?: string): void

		/**
		 * Tells the OS to clear all notifications from the Notification Center
		 * @param successHandler Is called when the api successfully clears the notifications.
		 * @param errorHandler Is called when the api encounters an error when attempting to clears the notifications.
		 */
		clearAllNotifications(successHandler: () => any, errorHandler: () => any): void
	}

	/**
	 * platform specific initialization options.
	 */
	interface InitOptions {
		/**
		 * iOS specific initialization options.
		 */
		ios?: {
			/**
			 * If true|"true" the device will be set up to receive VoIP Push notifications and the other options will be ignored
			 * since VoIP notifications are silent notifications that should be handled in the "notification" event.
			 * Default is false|"false".
			 */
			voip?: boolean | string
			/**
			 * If true|"true" the device sets the badge number on receipt of notification.
			 * Default is false|"false".
			 * Note: the value you set this option to the first time you call the init method will be how the application always acts.
			 * Once this is set programmatically in the init method it can only be changed manually by the user in Settings>Notifications>App Name.
			 * This is normal iOS behaviour.
			 */
			badge?: boolean | string
			/**
			 * If true|"true" the device plays a sound on receipt of notification.
			 * Default is false|"false".
			 * Note: the value you set this option to the first time you call the init method will be how the application always acts.
			 * Once this is set programmatically in the init method it can only be changed manually by the user in Settings>Notifications>App Name.
			 * This is normal iOS behaviour.
			 */
			sound?: boolean | string
			/**
			 * If true|"true" the device shows an alert on receipt of notification.
			 * Default is false|"false".
			 * Note: the value you set this option to the first time you call the init method will be how the application always acts.
			 * Once this is set programmatically in the init method it can only be changed manually by the user in Settings>Notifications>App Name.
			 * This is normal iOS behaviour.
			 */
			alert?: boolean | string
			/**
			 * If true|"true" the badge will be cleared on app startup. Defaults to false|"false".
			 */
			clearBadge?: boolean | string
			/**
			 * The data required in order to enable Action Buttons for iOS.
			 * Action Buttons on iOS - https://github.com/phonegap/cordova-plugin-push-notification-ios/blob/master/docs/PAYLOAD.md#action-buttons-1
			 */
			categories?: CategoryArray
			/**
			 * Whether to use prod or sandbox GCM setting. Defaults to false.
			 */
			fcmSandbox?: boolean
			/**
			 * If the array contains one or more strings each string will be used to subscribe to a FcmPubSub topic. Defaults to [].
			 */
			topics?: string[]
		}
	}

	interface CategoryArray {
		[name: string]: CategoryAction
	}

	interface CategoryAction {
		yes?: CategoryActionData
		no?: CategoryActionData
		maybe?: CategoryActionData
	}

	interface CategoryActionData {
		callback: string
		title: string
		foreground: boolean
		destructive: boolean
	}

	interface RegistrationEventResponse {
		/**
		 * The registration ID provided by the 3rd party remote push service.
		 */
		registrationId: string
	}

	interface NotificationEventResponse {
		/**
		 * The text of the push message sent from the 3rd party service.
		 */
		message: string
		/**
		 * The optional title of the push message sent from the 3rd party service.
		 */
		title?: string
		/**
		 * The number of messages to be displayed in the badge iOS or message count in the notification shade in Android.
		 * For windows, it represents the value in the badge notification which could be a number or a status glyph.
		 */
		count: string
		/**
		 * The name of the sound file to be played upon receipt of the notification.
		 */
		sound: string
		/**
		 * The path of the image file to be displayed in the notification.
		 */
		image: string
		/**
		 * An optional collection of data sent by the 3rd party push service that does not fit in the above properties.
		 */
		additionalData: NotificationEventAdditionalData
	}

	/**
	 * TODO: document all possible properties (I only got the android ones)
	 *
	 * Loosened up with a dictionary notation, but all non-defined properties need to use (map['prop']) notation
	 *
	 * Ideally the developer would overload (merged declaration) this or create a new interface that would extend this one
	 * so that he could specify any custom code without having to use array notation (map['prop']) for all of them.
	 */
	interface NotificationEventAdditionalData {
		[name: string]: any

		/**
		 * Whether the notification was received while the app was in the foreground
		 */
		foreground?: boolean
		/**
		 * Will be true if the application is started by clicking on the push notification, false if the app is already started. (Android/iOS only)
		 */
		coldstart?: boolean
		collapse_key?: string
		from?: string
		notId?: string
	}

	interface PushNotificationStatic {
		init(options: InitOptions): PushNotification
		new (options: InitOptions): PushNotification
	}
}

interface Window {
	PushNotification: PhonegapPluginPush.PushNotificationStatic
}
declare var PushNotification: PhonegapPluginPush.PushNotificationStatic;

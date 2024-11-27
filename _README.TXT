Para que pida los permisos de la cámara, hay que modificar el AndroidManifest.xml.

En la carpeta: android/app/src/main/AndroidManifest.xml se debe agregar lo siguiente:

    1. xmlns:tools="http://schemas.android.com/tools"
    2. android:hardwareAccelerated="true"
    3. <meta-data android:name="com.google.mlkit.vision.DEPENDENCIES" android:value="barcode_ui"/>
    4. <uses-permission android:name="android.permission.CAMERA" />
    5. <uses-permission android:name="android.permission.FLASHLIGHT"/>
    6. <uses-sdk tools:overrideLibrary="com.google.zxing.client.android" />

Para mostar donde se ponen estas líneas, voy a entregar un archivo completo de ejemplo:

<?xml version="1.0" encoding="utf-8"?>
<!-- 
 CGV: Agregar lo siguiente para poder escanear Códigos QR
    1. xmlns:tools="http://schemas.android.com/tools"
    2. android:hardwareAccelerated="true"
C:\Users\felip\Proyecto-ionic-duoc>ionic cap run android -l --external --host=192.168.100.47 --port=8100 --target R58NB18KSHL
> capacitor.cmd sync android
[capacitor] √ Copying web assets from www to android\app\src\main\assets\public in 103.97ms
[capacitor] √ Creating capacitor.config.json in android\app\src\main\assets in 1.52ms
[capacitor] √ copy android in 150.23ms
[capacitor] √ Updating Android plugins in 11.58ms
[capacitor] [info] Found 9 Capacitor plugins for android:
[capacitor]        @capacitor-community/sqlite@5.4.2-1
[capacitor]        @capacitor-mlkit/barcode-scanning@5.3.0
[capacitor]        @capacitor/app@5.0.6
[capacitor]        @capacitor/camera@5.0.7
[capacitor]        @capacitor/device@5.0.6
[capacitor]        @capacitor/geolocation@5.0.8
[capacitor]        @capacitor/haptics@5.0.6
[capacitor]        @capacitor/keyboard@5.0.6
[capacitor]        @capacitor/status-bar@5.0.6
[capacitor] √ update android in 115.10ms
[capacitor] [info] Sync finished in 0.268s
> ng.cmd run app:serve --host=192.168.100.47 --port=8100
[ng] 
[ng] Warning: This is a simple server for use in testing or debugging Angular applications
[ng] locally. It hasn't been reviewed for security issues.
[ng]
[ng] Binding this server to an open connection can result in compromising your application or
[ng] computer. Using a different host than the one passed to the "--host" flag might result in
[ng] websocket connection issues. You might need to use "--disable-host-check" if that's the
[ng] case.
[ng]     
[ng] C:\Users\felip\Proyecto-ionic-duoc\node_modules\rxjs\dist\cjs\internal\util\reportUnhandledError.js:13
[ng]             throw err;
[ng]             ^
[ng] Error: listen EADDRNOTAVAIL: address not available 192.168.100.47:8100
[ng]     at Server.setupListenHandle [as _listen2] (node:net:1881:21)
[ng]     at listenInCluster (node:net:1946:12)
[ng]     at doListen (node:net:2116:7)
[ng]     at process.processTicksAndRejections (node:internal/process/task_queues:83:21) {
[ng]   code: 'EADDRNOTAVAIL',
[ng]   errno: -4090,
[ng]   syscall: 'listen',
[ng]   address: '192.168.100.47',
[ng]   port: 8100
[ng] }
[ng] Node.js v22.0.0

C:\Users\felip\Proyecto-ionic-duoc>ionic cap run android -l --external --host=192.168.100.47 --port=8100 --target R58NB18KSHL
> capacitor.cmd sync android
[capacitor] √ Copying web assets from www to android\app\src\main\assets\public in 103.97ms
[capacitor] √ Creating capacitor.config.json in android\app\src\main\assets in 1.52ms
[capacitor] √ copy android in 150.23ms
[capacitor] √ Updating Android plugins in 11.58ms
[capacitor] [info] Found 9 Capacitor plugins for android:
[capacitor]        @capacitor-community/sqlite@5.4.2-1
[capacitor]        @capacitor-mlkit/barcode-scanning@5.3.0
[capacitor]        @capacitor/app@5.0.6
[capacitor]        @capacitor/camera@5.0.7
[capacitor]        @capacitor/device@5.0.6
[capacitor]        @capacitor/geolocation@5.0.8
[capacitor]        @capacitor/haptics@5.0.6
[capacitor]        @capacitor/keyboard@5.0.6
[capacitor]        @capacitor/status-bar@5.0.6
[capacitor] √ update android in 115.10ms
[capacitor] [info] Sync finished in 0.268s
> ng.cmd run app:serve --host=192.168.100.47 --port=8100
[ng] 
[ng] Warning: This is a simple server for use in testing or debugging Angular applications
[ng] locally. It hasn't been reviewed for security issues.
[ng]
[ng] Binding this server to an open connection can result in compromising your application or
[ng] computer. Using a different host than the one passed to the "--host" flag might result in
[ng] websocket connection issues. You might need to use "--disable-host-check" if that's the
[ng] case.
[ng]     
[ng] C:\Users\felip\Proyecto-ionic-duoc\node_modules\rxjs\dist\cjs\internal\util\reportUnhandledError.js:13
[ng]             throw err;
[ng]             ^
[ng] Error: listen EADDRNOTAVAIL: address not available 192.168.100.47:8100
[ng]     at Server.setupListenHandle [as _listen2] (node:net:1881:21)
[ng]     at listenInCluster (node:net:1946:12)
[ng]     at doListen (node:net:2116:7)
[ng]     at process.processTicksAndRejections (node:internal/process/task_queues:83:21) {
[ng]   code: 'EADDRNOTAVAIL',
[ng]   errno: -4090,
[ng]   syscall: 'listen',
[ng]   address: '192.168.100.47',
[ng]   port: 8100
[ng] }
[ng] Node.js v22.0.0

[ERROR] ng has unexpectedly closed (exit code 1).

        The Ionic CLI will exit. Please check any output above for error details.

[ERROR] ng has unexpectedly closed (exit code 1).

        The Ionic CLI will exit. Please check any output above for error details.

    3. <meta-data android:name="com.google.mlkit.vision.DEPENDENCIES" android:value="barcode_ui"/>
    4. <uses-permission android:name="android.permission.CAMERA" />
    5. <uses-permission android:name="android.permission.FLASHLIGHT"/>
    6. <uses-sdk tools:overrideLibrary="com.google.zxing.client.android" />
-->
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">
    <application
        android:allowBackup="true"
        android:hardwareAccelerated="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <activity
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode"
            android:name=".MainActivity"
            android:label="@string/title_activity_main"
            android:theme="@style/AppTheme.NoActionBarLaunch"
            android:launchMode="singleTask"
            android:exported="true">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

        </activity>

        <provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="${applicationId}.fileprovider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/file_paths"></meta-data>
        </provider>
        <meta-data android:name="com.google.mlkit.vision.DEPENDENCIES" android:value="barcode_ui"/>
    </application>

    <!-- Permissions -->

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.FLASHLIGHT"/>
    <uses-sdk tools:overrideLibrary="com.google.zxing.client.android" />

</manifest>

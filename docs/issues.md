---
title: Bugs and issues
---
## First of all
Please, don't hesitate to post them [here](https://github.com/green-green-avk/AnotherTerm/issues){:target="_blank"} or:

* Linux installation related:
  [scripts](https://github.com/green-green-avk/AnotherTerm-scripts/issues){:target="_blank"} /
  [**PRoot**](https://github.com/green-green-avk/proot/issues){:target="_blank"} /
  [**minitar**](https://github.com/green-green-avk/build-libarchive-minitar-android/issues){:target="_blank"};
* **libusb** wrapper related:
  [application service module](https://github.com/green-green-avk/LibUsbManager/issues){:target="_blank"} /
  [wrapper library](https://github.com/green-green-avk/libusb-1.0.23-android-helper-service-patch/issues){:target="_blank"};

or into the other linked repositories of [this project](https://github.com/users/green-green-avk/projects/1){:target="_blank"}.

From time to time I could see some strange "purely Android framework" crash reports on the **Google Play Console**.

**For example:** Someone tried to select something in a text edit field and **Another Term** crashed because there is a problem
either within the spanned text in this field or the framework itself.

These crash reports are of no use for me as long as they contain nothing but function names / line numbers for a security reason
and all of them are from the Android framework code.

Your bug reports seem the only way to help with it.
(I think, it's not a good case to use **Google Analytics**; you do probably, too.)

## Known issues

### The "Linux under PRoot" feature and Android&nbsp;10
See solutions [here](local-shell-w-x.html#main_content){:target="_blank"}.

### **termsh** SSL handshake error on very old Androids
```
javax.net.ssl.SSLProtocolException: SSL handshake aborted: ssl=0x62633510: Failure in SSL library, usually a protocol error
error:14077410:SSL routines:SSL23_GET_SERVER_HELLO:sslv3 alert handshake failure (external/openssl/ssl/s23_clnt.c:741 0x5b08cd5c:0x00000000)
```

Possible workarounds:

1. Installing new certs into the user-added CA store on an Android device
   ([Android&nbsp;6.0 and lower at the moment](https://developer.android.com/training/articles/security-config#CustomTrust){:target="_blank"}).

2. Using [ready-to-use statically linked `wget` for Android](https://github.com/pelya/wget-android/tree/master/android){:target="_blank"}.
   <br/>Details: <https://android.stackexchange.com/a/246596/373188>{:target="_blank"}

3. Using of some compatible proxy.

4. Manual download by your preferred browser.

I'll possibly create some better solution later.

{:#android9-uvc}
### Android&nbsp;9 and UVC (`USB_CLASS_VIDEO`) external USB cameras ([**libusb** helper feature](installing-libusb-for-nonrooted-android.html#main_content){:target="_blank"})
```xml
<uses-permission android:name="android.permission.CAMERA" />
```

is required to connect to any `USB_CLASS_VIDEO` device since Android&nbsp;9:
<https://developer.android.com/reference/android/hardware/usb/UsbManager.html#requestPermission(android.hardware.usb.UsbDevice,%20android.app.PendingIntent)>{:target="_blank"}

Also consider this Android&nbsp;10 bug: <https://issuetracker.google.com/issues/145082934>{:target="_blank"}

I'm going to fix it in some way; probably by adding this permission request into <hlt>oldgood</hlt> and <hlt>redist</hlt> flavours.

### Touch screen mouse
Not all Android deployments have the same touch event propagation logic and could improperly support
[`android:windowEnableSplitTouch="true"`](https://developer.android.com/reference/android/R.attr.html#windowEnableSplitTouch){:target="_blank"}.
As a result the touch screen mouse feature does not work properly on **Samsung Galaxy Note II** (SCH_I605) with Android 4.4.2
(the only known affected device at the moment).

The workaround looks relatively simple.
Please, ask me if you think, you need it.

### **termsh** segfault on Androids&nbsp;4.0\[.X\]
Spotted in the only available test environment: *Android API&nbsp;15 x86* image from Android Studio.

Please, ask me if you think, you need it fixed.

### **termsh**
It seems, access to `/proc/self/fd/` is restricted for the Dalvik VM process on **Samsung Galaxy Note II** (SCH_I605) with Android 4.4.2
if it executes bytecode from a signed APK.
It effectively blocks new files creation by **termsh** (as it interferes with the chrooted paths resolution logic).
The debug version of the **Another Term** APK with the default Android Studio signature works correct though.
{:style="text-decoration: line-through"}

Fixed in [<hlt>MkIIIv</hlt>](https://github.com/green-green-avk/AnotherTerm/commit/2d9f6b4a4a9a7f1996d7981aab1002ecf46573dc){:target="_blank"}.

### USB UART dongles support
Due to an USB bug in Android itself, it's highly recommended not to use the USB UART
with devices running Android 5.1.1 Lollipop.
See <https://github.com/felHR85/UsbSerial/issues/142>{:target="_blank"} for more details.

The workaround looks impossible.

### Bluetooth UART dongles support
Alas, UART port settings (*baud rate*, *data bits*, *stop bits*, *parity*, *flow control*) cannot be applied to Bluetooth dongles
using the Android Bluetooth stack.
See <https://stackoverflow.com/a/23888958/13020093>{:target="_blank"} for the details.

The workaround looks impossible???
<br/>*Need to check
[BluetoothDevice#createInsecureL2capChannel(int)](https://developer.android.com/reference/android/bluetooth/BluetoothDevice#createInsecureL2capChannel(int\)){:target="_blank"}
and
[BluetoothDevice#createL2capChannel(int)](https://developer.android.com/reference/android/bluetooth/BluetoothDevice#createL2capChannel(int\)){:target="_blank"}
newly added in Android&nbsp;10 (API&nbsp;29)
as a possible solution...*

### Hardware input devices
Please, be aware, that key mapping of hardware input devices is provided by device vendors
and it could make some troubles.

**For example:** *ASUS ZenFone 4 Max* has the hardware keyboard <kbd>Home</kbd>
(`KEYCODE_MOVE_HOME`) key mapped as the Android middle (`KEYCODE_HOME`)
button that makes it effectively invisible for applications.

Most vendors also maps mouse right and middle buttons in some unexpected ways.
Fortunately, mouse buttons mapping can usually be worked around relatively simply.
Most usual right mouse button mapping as the Android <kbd>Back</kbd> (`KEYCODE_BACK`)
button is supported by this application.

There is also a possible general workaround by implementing own user-space HID device driver.

In case of rooted device the problem does not exist though because it's possible to simply change
appropriate mapping files.

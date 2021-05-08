---
title: Bugs and issues
---
## First of all
Please, don't hesitate to post them [here](https://github.com/green-green-avk/AnotherTerm/issues){:target="_blank"} or:

* Linux installation related:
  [scripts](https://github.com/green-green-avk/AnotherTerm-scripts){:target="_blank"} /
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
1. Using of some compatible proxy.
2. Manual download by your preferred browser.

I'll possibly create some better solution later.

### Touch screen mouse
Not all Android deployments have the same touch event propagation logic and could improperly support
[`android:windowEnableSplitTouch="true"`](https://developer.android.com/reference/android/R.attr.html#windowEnableSplitTouch){:target="_blank"}.
As a result the touch screen mouse feature does not work properly on **Samsung Galaxy Note II** (SCH_I605) with Android 4.4.2
(the only known device at the moment).

The workaround looks relatively simple.
Please, ask me if you think, you need it.

### **termsh**
It seems, access to `/proc/self/fd/` is restricted for the Dalvik VM process on **Samsung Galaxy Note II** (SCH_I605) with Android 4.4.2
if it executes bytecode from a signed APK.
It effectively blocks new files creation by **termsh** (as it interferes with the chrooted paths resolution logic).
The debug version of the **Another Term** APK with the default Android Studio signature works correct though.
{:style="text-decoration: line-through"}

Fixed in [<hl>MkIIIv</hl>](https://github.com/green-green-avk/AnotherTerm/commit/2d9f6b4a4a9a7f1996d7981aab1002ecf46573dc){:target="_blank"}.

### USB UART dongles support
Due to an USB bug in Android itself, it's highly recommended not to use the USB UART
with devices running Android 5.1.1 Lollipop.
See <https://github.com/felHR85/UsbSerial/issues/142>{:target="_blank"} for more details.

The workaround looks impossible.

### Bluetooth UART dongles support
Alas, UART port settings (*baud rate*, *data bits*, *stop bits*, *parity*, *flow control*) cannot be applied to Bluetooth dongles
using the Android Bluetooth stack.
See <https://stackoverflow.com/a/23888958/13020093>{:target="_blank"} for the details.

The workaround looks impossible.

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

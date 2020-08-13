---
title: Known Issues
---
## Touch screen mouse
Not all Android setups have the same touch event propagation logic and could improperly support
[`android:windowEnableSplitTouch="true"`](https://developer.android.com/reference/android/R.attr.html#windowEnableSplitTouch){:target="_blank"}.
As a result the touch screen mouse feature does not work properly on **Samsung Galaxy Note II** (SCH_I605) with Android 4.4.2.

The workaround looks relatively simple.
Please, ask me if you think, you need it.

## ~termsh~
~It seems, access to `/proc/self/fd/` is restricted for the Dalvik VM process on **Samsung Galaxy Note II** (SCH_I605) with Android 4.4.2
if it executes bytecode from a signed APK.
It effectively blocks new files creation by **termsh** (as it interferes with the chrooted paths resolution logic).
The debug version of the **Another Term** APK with the default Android Studio signature works correct though.~

Fixed in [<kbd>MkIIIv</kbd>](https://github.com/green-green-avk/AnotherTerm/commit/2d9f6b4a4a9a7f1996d7981aab1002ecf46573dc).

## USB UART dongles support
Due to an USB bug in Android itself, it's highly recommended not to use the USB UART
with devices running Android 5.1.1 Lollipop.
See <https://github.com/felHR85/UsbSerial/issues/142>{:target="_blank"} for more details.

The workaround looks impossible.

## Bluetooth UART dongles support
Alas, UART port settings (*baud rate*, *data bits*, *stop bits*, *parity*, *flow control*) cannot be applied to Bluetooth dongles
using the Android Bluetooth stack.
See <https://stackoverflow.com/a/23888958/13020093>{:target="_blank"} for the details.

The workaround looks impossible.

## Hardware input devices
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

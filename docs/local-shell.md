---
title: Local Shell
---
## Environment

Android has a Linux kernel and permits applications to execute arbitrary binaries with some restrictions comparing to a usual Linux box.
Some people see it as the main Android advantage against iOS. iOS requires Qemu emulation to run arbitrary binaries that significantly impacts performance.

### Some notes

* Android preserves the right to kill all the processes related to an application.
If you want to run some daemon, keep open at least one terminal window in order to keep it alive.

## About sandboxes

**PRoot** is able to isolate a rootfs environment on some level with relatively fine access permissions granularity.
The only thing it can't manage is the **termsh**.
This is the way this access control has been implemented:

* Each *session profile* aka "favorite" has permission settings.
* Each terminal window has a session data with an instance of these permission settings connected to it.
* `SHELL_SESSION_TOKEN` environment variable contains the unique key of this session data
and is used by **termsh** to determine its rights.
* The session data is revoked when the terminal window is closed.

Another concern was about checking the server side credentials from inside of a PRooted environment to filter out possible spoofing.
It has been solved by introducing `TERMSH_UID` environment variable to be set to the real UID.

## Dedicated menu options

<kbd>Send SIGINT</kbd> and <kbd>Send SIGHUP</kbd> --- If the terminal is in a mode, it does not intercept control bytes,
these options help to send appropriate signals to the foreground process group.

<kbd>Revoke permissions</kbd> &#x2014; Tools (only **termsh** now) for interaction with the Android environment are supposed
to be controlled on what they can do. This option removes any granted permissions from the current session permanently.

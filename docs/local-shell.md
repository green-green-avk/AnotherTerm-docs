---
title: Local shell
---
## Environment

Android has a Linux kernel and permits applications to execute arbitrary binaries with some restrictions comparing to a usual Linux box.
Some people see it as the main Android advantage against iOS.
<br/>*iOS implementations, [UTM](https://getutm.app/){:target="_blank"} for example,
[require sideload (and developer account) for older device versions and jailbreak for newer ones](https://getutm.app/install/){:target="_blank"}
that is not a pleasant experience; QEMU also makes some performance impact.*

### Some notes

* Android preserves the right to kill all the processes related to an application.
If you want to run some daemon, keep open at least one terminal window in order to keep it alive.

* [The "Linux under PRoot" feature and Android&nbsp;10](local-shell-w-x.html#main_content){:target="_blank"}.

* [Android's shell and utilities](https://android.googlesource.com/platform/system/core/+/master/shell_and_utilities/README.md){:target="_blank"}.

## About sandboxes

**PRoot** is able to isolate a rootfs environment on some level with relatively fine access permissions granularity.
The only thing it can't manage is the **termsh**.
This is the way this access control has been implemented:

* Each *session profile* aka "favorite" has permission settings.
* Each terminal window has a session data with an instance of these permission settings connected to it.
* `SHELL_SESSION_TOKEN` environment variable contains the unique key of this session data
and is used by **termsh** to determine its rights.
* The session data is revoked when the terminal window is closed.
* `SHELL_SESSION_TOKEN` is also used to determine when a session has its terminal window shown
because **termsh** blocks exectution and awaits it to show any dialog or activity.

Another concern was about checking the server side credentials from inside of a PRooted environment to filter out possible spoofing.
It has been solved by introducing `TERMSH_UID` environment variable to be set to the real UID.

## Dedicated menu options

<kbd>Send a Signal</kbd> --- If the terminal is in a mode, it does not intercept control bytes,
this option helps to send a signal to the foreground process group.

<kbd>Session Permissions</kbd> --- Acts exactly as named: provides a way to view / change them.

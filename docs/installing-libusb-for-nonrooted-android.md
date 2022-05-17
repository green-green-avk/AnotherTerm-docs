---
title: Installing **libusb** for nonrooted Android
---
This approach could give you a way to, for example, flashing and debugging of MCUs right from your regular phone without rooting it.
OpenOCD seems working pretty well with Olimex ARM-USB-TINY at least.

In contrast with Termux, there is no special command line utility for it: the helper service is already running inside Another Term.
Device enumeration and hot plug/unplug events are supported.

It's supposed to use a PRooted environment to install this libusb version
(see [Installing Linux under PRoot](installing-linux-under-proot.html#main_content){:target="_blank"} first).

Script to build it right on your phone (under PRooted Linux and with `bash` installed):

* [install-patched-libusb-1.0.23.sh - for Debian, Alpine, CentOS and supposedly Ubuntu](https://github.com/green-green-avk/AnotherTerm-scripts/blob/master/install-patched-libusb-1.0.23.sh){:target="_blank"}

{:style="clear:both"}
Copy-paste snippet to download, build and install:
```sh
( S=install-patched-libusb-1.0.23.sh ; "$TERMSH" copy -f -fu "https://raw.githubusercontent.com/green-green-avk/AnotherTerm-scripts/master/$S" -tp . && chmod 755 $S && ./$S )
```
{:.clipboard}

**Note&nbsp;1:** Don't forget that BusyBox is usually statically linked with libusb, so install `usbutils` package if you want to use `lsusb` etc.
(in case of Alpine Linux at least).

**Note&nbsp;2:** Please, be aware of [Android&nbsp;9+ and USB cameras](issues.html#android9-uvc){:target="_blank"} situation.

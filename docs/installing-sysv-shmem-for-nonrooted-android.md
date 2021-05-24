---
title: Installing **System&nbsp;V shmem ashmem** wrapper for nonrooted Android
---
Android does not provide the **System&nbsp;V shmem** calls
due to possibility of orphaned memory allocations accumulation.
A better organised **ashmem** mechanism is provided instead.
This wrapper library provides **shmem** calls emulation for dynamically linked software.

*__Warning:__ It will not work on Android&nbsp;10 with Google Play and `.redist` __Another Term__ flavors.
<br/>See <https://developer.android.com/about/versions/10/behavior-changes-10#shared-memory>{:target="_blank"}{:.long-url}*

<hl><span markdown="1">
*__Better solution:__
[Installing shared memory APIs emulation for nonrooted Android](installing-linux-apis-emulation-for-nonrooted-android.html#main_content){:target="_blank"}.*
</span></hl>

It's supposed to use a PRooted environment to install it
(see [Installing Linux under PRoot](installing-linux-under-proot.html#main_content){:target="_blank"} first).

Script to build it right on your phone (under PRooted Linux and with `bash` installed):

* [install-chrooted-libandroid-shmem-0.3.sh - for Debian, Alpine, CentOS and supposedly Ubuntu](https://github.com/green-green-avk/AnotherTerm-scripts/blob/master/install-chrooted-libandroid-shmem-0.3.sh){:target="_blank"}

{:style="clear:both"}
Copy-paste snippet to download, build and install:
```sh
( S=install-chrooted-libandroid-shmem-0.3.sh ; "$TERMSH" copy -f -fu "https://raw.githubusercontent.com/green-green-avk/AnotherTerm-scripts/master/$S" -tp . && chmod 755 $S && ./$S )
```
{:.clipboard}

**Note:** It will not be added to your startup scripts automatically:<br/>
add `/opt/shm/lib/libandroid-shmem.so`{:.clipboard} to the `LD_PRELOAD`{:.clipboard} paths where required.

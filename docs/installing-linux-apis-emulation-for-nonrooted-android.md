---
title: Installing shared memory APIs emulation for nonrooted Android
---

Android does not provide neither the **System&nbsp;V** nor **Posix** shared memory kernel calls
due to possibility of orphaned memory allocations accumulation.
This wrapper library provides generic Linux **shmem** calls emulation for dynamically linked software.
<br/>[&lt;&lt;Details...&gt;&gt;](https://github.com/green-green-avk/libwrapdroid#readme){:target="_blank"}

It's supposed to use a PRooted environment to install it
(see [Installing Linux under **PRoot**](installing-linux-under-proot.html#main_content){:target="_blank"} first).

Script to build it right on your phone (under PRooted Linux and with `bash` installed):

* [install-libwrapdroid.sh - for Debian, Alpine, CentOS and supposedly Ubuntu](https://github.com/green-green-avk/AnotherTerm-scripts/blob/master/install-libwrapdroid.sh){:target="_blank"}

{:style="clear:both"}
Copy-paste snippet to download, build and install:
```sh
( S=install-libwrapdroid.sh ; "$TERMSH" copy -f -fu "https://raw.githubusercontent.com/green-green-avk/AnotherTerm-scripts/master/$S" -tp . && chmod 755 $S && ./$S )
```
{:.clipboard}

**Note:** It will not be added to your startup scripts automatically:<br/>
Just set your environment variables when required in a way similar to:
```sh
export LIBWRAPDROID_SOCKET_NAME=<some-socket-name>
export LIBWRAPDROID_AUTH_KEY=<some-auth-key> # not less than 16 hexidecimal digits
export LD_PRELOAD="/opt/shm/lib/libwrapdroid-shm-sysv.so:/opt/shm/lib/libwrapdroid-shm-posix.so${LD_PRELOAD:+:$LD_PRELOAD}"
```
{:.clipboard}

and run `/opt/shm/bin/libwrapdroid-server`{:.clipboard}.

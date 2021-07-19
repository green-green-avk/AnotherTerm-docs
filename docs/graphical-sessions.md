---
title: Graphical sessions
---
## Minimalistic Wayland protocol support

---

***<hl>EXPERIMENTAL</hl>***

Available in development versions only:
* [MKIV\* releases](https://github.com/green-green-avk/AnotherTerm/releases){:target="_blank"}
* [Wayland branch](https://github.com/green-green-avk/AnotherTerm/tree/Wayland){:target="_blank"}

---

The main problems with X&nbsp;applications on Android are low performance
and lack of good screen input methods.

Current solution addresses both of them.


### UI and screen input

[![Screenshot 1]({{ '/assets/images/screenshot-wayland-1.thumb.jpg' | relative_url }}){:.screenshot-phone-left style="max-width:25%"}]({{ '/assets/images/screenshot-wayland-1.jpg' | relative_url }})

[![Screenshot 2]({{ '/assets/images/screenshot-wayland-2.thumb.jpg' | relative_url }}){:.screenshot-phone-right style="max-width:25%"}]({{ '/assets/images/screenshot-wayland-2.jpg' | relative_url }})

Desktop size matches a phone screen size and follows any changes.

Fully functional screen keyboard / mouse.
Yes, you can drag with the middle mouse button and hold
<kbd>Shift</kbd> and/or <kbd>Ctrl</kbd> in the same time.
<br/>**Blender-ready multi-touch screen input!**

**Note:** The physical screen size is provided to the applications exactly as it is reported by Android.
This means that some UI (Qt and Gtk at least) could look weird on a phone screen
due to its unusual DPI ratio. Just tune up your widget frameworks / applications DPI settings.

<br style="clear:both"/>


### How to use

See
[Installing Linux under PRoot](installing-linux-under-proot.html#main_content){:target="_blank"}
and
[Installing shared memory APIs emulation for nonrooted Android](installing-linux-apis-emulation-for-nonrooted-android.html#main_content){:target="_blank"}
before.

UNIX socket name (Linux abstract namespace):
<br/>`green_green_avk.anotherterm`{:.clipboard}[.*variant*]`.wlterm`{:.clipboard}
<br/>**Note:** client UID check ID is enforced:
only processes of the same Android application &amp; user are allowed to connect.

{:style="clear:both"}
An example of the script set to start Xwayland inside PRoot:

`/root/wlstart-X`:
```python
#!/usr/bin/python3

import socket
import os
import signal
import subprocess
import uuid

wl_sock = "\0" + os.environ["APP_ID"] + ".wlterm"

res_uuid = uuid.uuid4().hex
res_auth = uuid.uuid4().hex

def connect(addr):
 sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
 sock.connect(addr)
 return sock

def onSignal(sig, fr):
 global proc
 if proc is not None:
  proc.terminate()
 exit(0)

sock = connect(wl_sock)

proc = None

for sig in (signal.SIGTERM, signal.SIGINT, signal.SIGQUIT, signal.SIGPIPE):
 signal.signal(sig, onSignal)

os.environ["WAYLAND_SOCKET"] = str(sock.fileno())
#os.environ["WAYLAND_DEBUG"] = "1"
os.environ["XDG_RUNTIME_DIR"] = "/home/my_acct"
os.environ["LD_PRELOAD"] = "/opt/shm/lib/libwrapdroid-shm-sysv.so"
os.environ["LIBWRAPDROID_SOCKET_NAME"] = os.environ["APP_ID"] + ".reswrap." + res_uuid
os.environ["LIBWRAPDROID_AUTH_KEY"] = res_auth

dispFdOut, dispFd = os.pipe()
ttyFd = os.open("/dev/tty", os.O_RDWR, 0o777)

proc = subprocess.Popen(("Xwayland", "-ac", "-shm",
 "-displayfd", str(dispFd), "-noreset"),
 pass_fds=(sock.fileno(),dispFd), stdin=ttyFd, stdout=ttyFd, stderr=ttyFd)

os.close(ttyFd)
os.close(dispFd)
sock.close()

print(proc.pid, flush=True)
print(res_uuid, flush=True)
print(res_auth, flush=True)
with os.fdopen(dispFdOut) as f:
 print(f.readline().strip(), flush=True)

proc.wait()
```
{:.clipboard}

{:style="clear:both"}
`/home/my_acct/wlstart-WM`:
```sh
#!/bin/bash

read -r pid
read -r RES_UUID
read -r RES_AUTH
read -r display
export RES_UUID
export RES_AUTH
export DISPLAY=":$display"
~/startwm </dev/tty >/dev/tty 2>&1
echo "stopping X at PID $pid..."
kill "$pid"
```
{:.clipboard}

{:style="clear:both"}
`/home/my_acct/startwm`:
```sh
#!/bin/bash

WM=startxfce4
#WM=icewm

export LIBWRAPDROID_SOCKET_NAME="$APP_ID.reswrap.$RES_UUID"
export LIBWRAPDROID_AUTH_KEY="$RES_AUTH"
/opt/shm/bin/libwrapdroid-server &
WRAPDROID_PID=$!
LD_PRELOAD=/opt/shm/lib/libwrapdroid-shm-sysv.so:/opt/shm/lib/libwrapdroid-shm-posix.so "$WM"

killall -wq gpg-agent ssh-agent xscreensaver
kill $WRAPDROID_PID
```
{:.clipboard}

{:style="clear:both"}
*"Execute"* field:
```sh
/system/bin/sh \
"$DATA_DIR/proots/linuxcontainers-debian-buster/run" \
0:0 ./wlstart-X | \
/system/bin/sh \
"$DATA_DIR/proots/linuxcontainers-debian-buster/run" \
'' ./wlstart-WM
```
{:.clipboard}

***Further documentation + scripts are about to come...***


### Implementation details

Only `wl_shm` interface is supported at the moment
with possible future support of `zwp_linux_dmabuf_v1` interface / **libmesa**.

The only supported surface roles:
* `toplevel` (`wl_shell_surface`);
* `cursor` (`wl_pointer`).

No translation / rotation of buffers.

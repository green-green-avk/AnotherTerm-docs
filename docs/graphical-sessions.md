---
title: Graphical sessions
---
## Minimalistic Wayland protocol support

The main problems with X applications on Android are performance
and lack of good screen input methods;
* Termux + XServer? --- No way.
* VNC with a client and server on the same machine is a complete joke.

Current solution addresses both.


### UI and screen input

[![screenshot]({{ '/assets/images/screenshot-wayland-1.thumb.jpg' | relative_url }}){:.screenshot-phone}]({{ '/assets/images/screenshot-wayland-1.jpg' | relative_url }})

{:style="overflow:hidden"}
* Desktop size matches a phone screen size and follows any changes.
* Fully functional screen keyboard / mouse.
Yes, you can drag with middle mouse button and hold
<kbd>Shift</kbd> and/or <kbd>Ctrl</kbd> in the same time.
<br/>**Blender ready multi-touch screen input!**

**Note:** This compositor provides screen size from the Android metrics data.
This means that some UI (Qt and Gtk at least) could look weird on a phone screen
with the default DPI settings. Just tune it up.

<br style="clear:both"/>


### Where to get

* [MKIV\* releases](https://github.com/green-green-avk/AnotherTerm/releases){:target="_blank"}
* [Wayland branch](https://github.com/green-green-avk/AnotherTerm/tree/Wayland){:target="_blank"}


### How to use

UNIX socket name (Linux abstract namespace):<br/>`green_green_avk.anotherterm`{:.clipboard}[.*variant*]`.wlterm`{:.clipboard}

{:style="clear:both"}
Xwayland start script example:
```python
#!/usr/bin/python3

import socket
import os
import subprocess

wl_sock = "\0green_green_avk.anotherterm.debug.wlterm" # <= socket of your build variant

def connect(addr):
 s = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
 s.connect(addr)
 return s

s = connect(wl_sock) # Xwayland does not support Linux abstract namespace and needs a little help here...

dispFdOut, dispFd = os.pipe()

os.set_inheritable(s.fileno(), True)
os.set_inheritable(dispFd, True)

os.environ["WAYLAND_SOCKET"] = str(s.fileno())
#os.environ["WAYLAND_DEBUG"] = "1"
os.environ["XDG_RUNTIME_DIR"] = "/home/my_acct" # <= user home dir - a good place for Xwayland socket / wl_shm in-memory files (delete-after-open)
os.environ["LD_PRELOAD"] = "/opt/shm/lib/libandroid-shmem.so"
ttyFd = os.open("/dev/tty", os.O_RDWR, 0o777)
proc = subprocess.Popen(("Xwayland", "-ac", "-shm",
 "-displayfd", str(dispFd), "-noreset"),
 pass_fds=(s.fileno(),dispFd), stdin=ttyFd, stdout=ttyFd, stderr=ttyFd) # yep, connect to the controlling TTY directly
os.close(ttyFd)
s.close()
print(proc.pid, flush=True) # and yep, put PID and...
with os.fdopen(dispFdOut) as f:
 print(f.readline().strip(), flush=True) # ...display number to the stdout.
proc.wait()
```
{:.clipboard}

*Further documentation + scripts are about to come...*


### Implementation details

Only `wl_shm` interface is supported at the moment.
with possible future support of `zwp_linux_dmabuf_v1` interface / **libmesa**.

The only supported surface roles:
* `toplevel` (`wl_shell_surface`);
* `cursor` (`wl_pointer`).

No translation / rotation of buffers.

No `wl_touch` support.
(Anyway there is no reason as long as anything significant
like Blender or InkScape does not support it.)

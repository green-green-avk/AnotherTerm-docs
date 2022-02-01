---
title: Graphical sessions
---
## Minimalistic Wayland protocol support

---

***<hlt>EXPERIMENTAL</hlt>***

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

#### Scripts to be added into the PRooted environment{:.link#scripts}

<https://github.com/green-green-avk/AnotherTerm-scripts/tree/master/Xwayland>

{:style="clear:both"}
#### The startup profile

*"Execute"*{:.link#field-execute} field:

![Example]({{ '/assets/images/screenshot-wayland-howto-fav.thumb.png' | relative_url }}){:.screenshot-phone-left style="max-width:25%;margin-right:-5%;position:relative;z-index:-1"}
```sh
/system/bin/sh \
"$DATA_DIR/proots/linuxcontainers-debian-buster/run" \
0:0 ./wlstart-X \
| \
/system/bin/sh \
"$DATA_DIR/proots/linuxcontainers-debian-buster/run" \
'' ./wlstart-WM
```
{:.clipboard}

Or a
[[quick settings link](local-terminal:/opts?perm_favmgmt=false&shareable=false&charset=UTF-8&screen_cols=0&screen_rows=0&keymap=&wakelock.acquire_on_connect=true&terminal_string=xterm&perm_pluginexec=false&font_size_auto=false&wakelock.release_on_disconnect=true&execute=%2Fsystem%2Fbin%2Fsh%20%5C%0A%22%24DATA_DIR%2Fproots%2Flinuxcontainers-debian-buster%2Frun%22%20%5C%0A0%3A0%20.%2Fwlstart-X%20%5C%0A%7C%20%5C%0A%2Fsystem%2Fbin%2Fsh%20%5C%0A%22%24DATA_DIR%2Fproots%2Flinuxcontainers-debian-buster%2Frun%22%20%5C%0A''%20.%2Fwlstart-WM&name=linuxcontainers-debian-buster%20%F0%9F%96%A5%20%26%20WM&term_compliance=ansi&terminate.on_disconnect=false)]
for **Another Term**.

Just replace the `linuxcontainers-debian-buster` with your installation directory.

***Further documentation + scripts are about to come...***


### Implementation details

Only `wl_shm` interface is supported at the moment
with possible future support of `zwp_linux_dmabuf_v1` interface / **libmesa**.

The only supported surface roles:
* `toplevel` (`wl_shell_surface`);
* `cursor` (`wl_pointer`).

No translation / rotation of buffers.

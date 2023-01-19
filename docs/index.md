---
title: Another Term
---

## What it is

The successor of [Another Term Lite](https://github.com/green-green-avk/AnotherTermLite){:target="_blank"}.

Initially it was decided to fill the gap in USB serial dongle terminals
that provide features allow comfortable work without a hardware keyboard.
However as time passed, it has grown into something closer to [**Termux**](https://termux.com/){:target="_blank"}.
Built-in SSH client has also been added.

See [README.md](https://github.com/green-green-avk/AnotherTerm/blob/master/README.md){:target="_blank"}.


## Terminal features

* Sane built-in screen keyboard (with a key modifiers wheel).

* Customizable key mapping profiles aka *"where is my <kbd>Backspace</kbd>?"* but much wider
  (**Alpine**, for example, has unusual key mappings for <kbd>Shift</kbd>-<kbd>F*</kbd>).

* Rich select and search features.

* Customizable color mapping profiles.

* Mouse support and screen mouse overlay for handy multitouch input.

* VT52 mode support (like **XTerm**) because why not?

{:#terminal-features-todo}
### To be added in future

* Double height / width letters.

* [Sixel graphics](https://en.wikipedia.org/wiki/Sixel){:target="_blank"} support.


## SSH features

* Allowed encryption algorithms and their priority configuration on per session profile basis.

* Encryption algorithms negotiation process and its result can be seen under the session <kbd>log</kbd> button.

* Client certificate authentication.

* Port forwarding settings can be changed on a live session.

* Additional shell channels can be opened in a live session.

{:#ssh-features-todo}
### To be added in future

* SSH&nbsp;agent forwarding protocol support (rather sooner).

* Kerberos&nbsp;5 authentication (rather later).


## Local shell features

* Passing content between shell and Android applications — see [**termsh** commands list](local-shell-utility.html#main_content)
  and [content sharing with Another Term](local-shell-share-input.html#main_content).

* Implemented a bit better than **Termux**:
  * passing descriptors via `SCM_RIGHTS` ancillary messages instead of copying data;
  * credentials checking to prevent possible spoofing attacks;
  * proper chrooted environments support by [**termsh**](local-shell-utility.html#main_content)
    as all the *"name&lt;=&gt;fd"* operations are performed by the client side
    and thus inside the said environment: only the file descriptors are passed to the service side
    (inside the application process);
  * better USB support (see below).

* [Shell plugins](local-shell-plugins.html#main_content) in separate APKs with dev API and signature checking.

* It's supposed to use **PRoot** with existing Linux repositories — [Installing Linux under PRoot](installing-linux-under-proot.html#main_content).

* [**libusb** (with device enumeration and hot plug/unplug events) support on nonrooted Android](installing-libusb-for-nonrooted-android.html#main_content).

* Access USB and Bluetooth serial dongles right from the shell:
  ```sh
  ... | "$TERMSH" serial 9600 | ...
  ```
  see [serial port examples]({{ '/local-shell-examples/serial-port.html' | relative_url | append: '#main_content' }}).

---
title: Another Term
---
## What it is

The successor of [Another Term Lite](https://github.com/green-green-avk/AnotherTermLite){:target="_blank"}.

Initially it was decided to fill the gap in USB serial dongle terminals
that provide features allow comfortable work without a hardware keyboard.
However as time passed, it has grown into something closer to [Termux](https://termux.com/){:target="_blank"}.
Built-in SSH client has also been added.

See [README.md](https://github.com/green-green-avk/AnotherTerm/blob/master/README.md){:target="_blank"}.

## Built-in screen keyboard gesture wheel

```
              Shift-Key
              (usually)
Alt-Shift-key     ⇑
  (usually)   ⇖

   Alt-Key  ⇐    Key    ⇒  Ctrl-Key
  (usually)                (usually)

                  ⇓
                Cancel
          (and a good place
       to keep a finger down to
      display available gestures)
```

## Shell features

* passing content between shell and Android applications — see [**termsh** commands list](local-shell-utility.html#main_content)
  and [content sharing with Another Term](local-shell-share-input.html#main_content);

* implemented a bit better than Termux:
  * passing descriptors via *SCM_RIGHTS* ancillary messages instead of copying data;
  * credentials checking to prevent possible spoofing attacks;

* [shell plugins](local-shell-plugins.html#main_content) in separate APKs with dev API and signature checking;

* it's supposed to use PRoot with existing Linux repositories — [Installing Linux under PRoot](installing-linux-under-proot.html#main_content);

* [libusb (with device enumeration and hot plug/unplug events) support on nonrooted Android](installing-libusb-for-nonrooted-android.html#main_content);

* access USB and Bluetooth serial dongles right from the shell:
  ```sh
  ... | "$TERMSH" serial 9600 | ...
  ```
  see [serial port examples]({{ '/local-shell-examples/serial-port.html' | relative_url | append: '#main_content' }});

* but no `am` command analog yet.

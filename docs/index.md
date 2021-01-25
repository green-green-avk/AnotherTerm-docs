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
  or **python3** for example:
  ```python
  import subprocess

  class ConnException(Exception):
   pass

  class Serial:
   def __init__(self):
    self.proc = subprocess.Popen(('termsh', 'serial'), stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    self.err = None

   def check(self):
    if self.err is not None:
     raise ConnException(self.err)
    r = self.proc.poll()
    if r is None:
     return
    self.err = self.proc.stderr.read().decode()
    raise ConnException(self.err)

   def read(self, n):
    self.check()
    try:
     return self.proc.stdout.read(n)
    except BrokenPipeError as e:
     raise ConnException(e)

   def read1(self, n):
    self.check()
    try:
     return self.proc.stdout.read1(n)
    except BrokenPipeError as e:
     raise ConnException(e)

   def write(self, v):
    self.check()
    try:
     self.proc.stdin.write(v)
     self.proc.stdin.flush()
    except BrokenPipeError as e:
     raise ConnException(e)

   def stop(self):
    self.proc.terminate()

   def __enter__(self):
    return self

   def __exit__(self):
    self.stop()
    return False
  ```
  {:.clipboard}

* but no `am` command analog yet.

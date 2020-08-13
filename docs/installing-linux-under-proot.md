---
title: Installing Linux under PRoot
head: installing-linux-under-proot.head.html
---
***Note:** The information provided here is about running third-party software.
The Another Term author is not responsible for any results of use or misuse of it.
Use it on your own risk!*

## Preface

Technically any Linux distribution can be used:
[debootstrap](https://wiki.debian.org/Debootstrap){:target="_blank"} utility to prepare a Debian rootfs for example;
though I see no reason to ignore already prebuilt rootfses (see below).

**Note:** Yes, **Termux** has its own *"minimal base distribution"* but I see no reason to mess with it
as long as **linuxcontainers.org** already provides us with a very good prebuilt rootfses
that could be installed just by copy-paste of a short quick install snippet (see next section):
* **Alpine** if you need it small: ≈15MB with `openssh-client` added (as of version 3.9);
* **Debian** or **CentOS** if you need it comfortable with a big software repository.

**One more note:** Please, don't hesitate to open new [issues](https://github.com/green-green-avk/AnotherTerm/issues){:target="_blank"}
(there is no template just write as you wish) if something doesn't work as expected.
Things are changing and new 3rd-party distributions could trigger some old god-forsaken bugs (mostly in **PRoot**).

## Making it quick: linuxcontainers.org to the rescue

Their images are licensed under: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/){:target="_blank"}

List of the images: [Page](https://us.images.linuxcontainers.org/){:target="_blank"} / [Index file](https://us.images.linuxcontainers.org/meta/1.0/index-user){:target="_blank"}

Install script source: <https://github.com/green-green-avk/AnotherTerm-scripts/blob/master/install-linuxcontainers.sh>{:target="_blank"}

Install script usage:
```
./install-linuxcontainers.sh [-a] <distro> <release> [<target_subdir_name>]

  -a -- non-interactive mode
```

If you want to access the application's private directory (where all your PRoot rootfses with their metadata are located) from your PRooted environment, see `/etc/proot/run.cfg`.

PRoot run script source: <https://github.com/green-green-avk/AnotherTerm-scripts/blob/master/assets/run-tpl>{:target="_blank"}

Uninstall:
```sh
rm -rf "$DATA_DIR/proots/<target_subdir_name>"
```

Copy-paste snippets for download and install:

<div>
<select id="distro" class="btn"></select><select id="version" class="btn"></select>
<pre id="arches" style="display: inline-block; margin: 0; vertical-align: middle; white-space: pre-wrap;"></pre>
<pre id="snippet" class="clipboard"></pre>
</div>

[[Alpine key map settings](termkeymap:/v2?4489=%1B%5B15%3B2~&448b=%1B%5B18%3B2~&4485=%1BO2P&488=%1BO2S&48b=%1B%5B18%3B2~&48a=%1B%5B17%3B2~&487=%1BO2R&4487=%1BO2R&485=%1BO2P&489=%1B%5B15%3B2~&486=%1BO2Q&448a=%1B%5B17%3B2~&4486=%1BO2Q&4488=%1BO2S&name=Alpine)]
(for its specific mapping of <kbd>Shift</kbd>-<kbd>F*</kbd>)

## Other prebuilt Linux rootfses list
* PRoot list: <https://proot-me.github.io/#downloads>{:target="_blank"}
* Alpine: <https://www.alpinelinux.org/downloads/>{:target="_blank"}
* UserLAnd:
  * Debian: <https://github.com/CypherpunkArmory/UserLAnd-Assets-Debian/tree/master/assets>{:target="_blank"}
  * And many others: <https://github.com/CypherpunkArmory?tab=repositories>{:target="_blank"}

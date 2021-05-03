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

## Android&nbsp;10 note

See [here](local-shell-w-x.html#main_content){:target="_blank"}.

## Making it quick: linuxcontainers.org to the rescue

Their images are licensed under: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/){:target="_blank"}

List of the images: [Page](https://us.images.linuxcontainers.org/){:target="_blank"} / [Index file](https://us.images.linuxcontainers.org/meta/1.0/index-user){:target="_blank"}

PRoot version used: <https://github.com/green-green-avk/proot>{:target="_blank"}{:.long-url}

Install script source: <https://github.com/green-green-avk/AnotherTerm-scripts/blob/master/install-linuxcontainers.sh>{:target="_blank"}{:.long-url}

Install script usage:
```
sh ./install-linuxcontainers.sh [-a] [-d] <distro> <release> [<target_subdir_name>]

  -a -- non-interactive mode
  -d -- do not use minitar and PRoot from a plugin if present

Environment variables:
  REG_USER - user account name;
  FAV_SHELL - preferable shell;
  PROOT - proot location;
  PROOT_USERLAND - proot userland flavor location;
  ESSENTIALS_PKG - Application ID of a minitar and PRoot plugin to check.

Run without arguments to see defaults.
```

Directory tree:

* `$DATA_DIR`
  * `root` --- auxiliary tools installiation dir
  * `proots`
    * *\<install-dir-1\>*
    * {:.ellipsis}...
    * *\<install-dir-n\>*
      * `root` --- rootfs
        * `.proot.meta` --- PRoot meta data (will be refactored in future)
        * `bin`
          * `_termsh` --- PRoot binding of termsh (`$LIB_DIR/libtermsh.so`)
          * `termsh` --- script that executes `_termsh` with `LD_*` variables unset
          * {:.ellipsis}...
        * `etc`
          * `proot`
            * `run` --- run script
            * `run.cfg` --- run script configuration
            * `run.rc` --- executed right before PRoot to finally set its environment variables (optional)
            * {:.ellipsis}...
          * {:.ellipsis}...
        * {:.ellipsis}...
      * `tmp` --- PRoot tmp dir
      * `run` --- symlink to the run script
{:.tree}

[`$TERMSH`](local-shell-utility.html#main_content){:target="_blank"} is set to `termsh`.

If you want to access the application's private directory (where all your PRoot rootfses with their metadata are located) from your PRooted environment, see `/etc/proot/run.cfg`.

PRoot run script source: <https://github.com/green-green-avk/AnotherTerm-scripts/blob/master/assets/run-tpl>{:target="_blank"}{:.long-url}

Uninstall:
```sh
rm -rf "$DATA_DIR/proots/<target_subdir_name>"
```

### Steps

1. If you have Android&nbsp;10 or higher, look for additional steps and explanation [here](local-shell-w-x.html#main_content){:target="_blank"}.
2. Create a "Local Terminal" favorite with the "Favorite management" permission enabled and run it. A terminal screen will appear.
3. Select a distribution and version in the form below and copy-paste the code snippet to the termial and run.
4. ???
5. PROFIT

**Note:** Very old Androids can have
[an issue with downloading from **GitHub** by **termsh**](issues.html#termsh-ssl-handshake-error-on-very-old-androids).

Copy-paste snippets for download and install:

with chooser:

```sh
( S=repo-linuxcontainers.sh ; "$TERMSH" copy -f -fu "https://raw.githubusercontent.com/green-green-avk/AnotherTerm-scripts/master/$S" -tp . && chmod 755 $S && sh ./$S )
```
{:.clipboard}

or:

<div style="border-left: 1px dashed #b5e853; border-right: 1px dashed #b5e853; border-radius: 1em; margin: 0 -1em 0 -1em; padding: 0 1em 0 1em;">
<select id="distro" class="btn"></select><select id="version" class="btn"></select>
<pre id="arches" style="display: inline-block; margin: 0; vertical-align: middle; white-space: pre-wrap;"></pre>
<pre id="snippet" class="clipboard"></pre>
</div>

[[Alpine key map settings](termkeymap:/v2?4489=%1B%5B15%3B2~&448b=%1B%5B18%3B2~&4485=%1BO2P&488=%1BO2S&48b=%1B%5B18%3B2~&48a=%1B%5B17%3B2~&487=%1BO2R&4487=%1BO2R&485=%1BO2P&489=%1B%5B15%3B2~&486=%1BO2Q&448a=%1B%5B17%3B2~&4486=%1BO2Q&4488=%1BO2S&name=Alpine)]
(for its specific mapping of <kbd>Shift</kbd>-<kbd>F*</kbd>)

## Other prebuilt Linux rootfses list

* PRoot list: <https://proot-me.github.io/#downloads>{:target="_blank"}{:.long-url}
* Alpine: <https://www.alpinelinux.org/downloads/>{:target="_blank"}{:.long-url}
* UserLAnd:
  * Debian: <https://github.com/CypherpunkArmory/UserLAnd-Assets-Debian/tree/master/assets>{:target="_blank"}{:.long-url}
  * And many others: <https://github.com/CypherpunkArmory?tab=repositories>{:target="_blank"}{:.long-url}

---
title: The "Linux under PRoot" feature and Android&nbsp;10
---
***Note:** The information provided here is about changes in
[the approach](installing-linux-under-proot.html#main_content){:target="_blank"}
of running third-party software.
The Another Term author is not responsible for any results of use or misuse of it.
Use it on your own risk!*

## Facts

1. Google has enforced target API >= 29 (`targetSdkVersion`)
for all application updates on Google Play
since November&#xA0;1&#xA0;2020.

2. Any application targets API >= 29 cannot `execve()` any binaries
from file tree locations writable by it on Android&#xA0;10 and higher.
This new behavior interferes with the "Linux under PRoot" feature
in its current state.

## Solution

**Another Term** was split into two flavors:

* `green_green_avk.anotherterm.oldgood` is still targeting API&#xA0;28
and [published at GitHub](https://github.com/green-green-avk/AnotherTerm/releases) only.

* `green_green_avk.anotherterm` became targeting API&#xA0;29
and is still published on Google Play.
**Another Term Shell Plugin - Android&#xA0;10 Essentials**
was created in order to provide **PRoot** and **minitar**
for Android&#xA0;10 and higher
and thus keep the "Linux under PRoot" feature in a working state.
(**Another Term** is a multi-purpose tool that's why
it's better to avoid inflating its size with things that can never be used
or substituted by users' own implementations.)

## Using **Another Term Shell Plugin - Android&#xA0;10 Essentials**

1) Install it from
[GitHub](https://github.com/green-green-avk/AnotherTermShellPlugin-Android10Essentials){:target="_blank"}
(as it seems ***incompatible*** with the Google Play policy).

2) Enable it and set it "Always accessible" in the **Another Term** "Plugins" settings.

3) Install a new Linux root as [recommended](installing-linux-under-proot.html#main_content){:target="_blank"}

or fixup your existing installations by executing this snippet:
```sh
for F in $DATA_DIR/proots/*/root/etc/proot/run
do
 "$TERMSH" cat 'https://raw.githubusercontent.com/green-green-avk/AnotherTerm-scripts/master/assets/run-tpl' > "$F"
 echo 'PROOT="$("$TERMSH" plugin green_green_avk.anothertermshellplugin_android10essentials proot)"' >> "$F.cfg"
 echo 'PROOT_USERLAND="$("$TERMSH" plugin green_green_avk.anothertermshellplugin_android10essentials proot-userland)"' >> "$F.cfg"
done
```
{:.clipboard}
and manually prepending the "Exectute" field value of each related favorite by `sh `.

## [Related Issue](https://github.com/green-green-avk/AnotherTerm/issues/5){:target="_blank"}

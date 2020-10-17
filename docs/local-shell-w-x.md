---
title: Local Shell **w^x** policy in Android&nbsp;10
---

## Facts

1. Google enforces target API >= 29 (`targetSdkVersion`) for all application updates at Google Play
from November&#xA0;1&#xA0;2020.

2. An application targeted API >= 29 cannot `execve()` any binaries
from any file tree locations that is writable by it on Androids&#xA0;10 and higher.

## Mitigation

In the nearest days <b>Another Term</b> will be split into two flavors:

* `green_green_avk.anotherterm.oldgood` is still targeting API&#xA0;28
and published at GitHub only.

* `green_green_avk.anotherterm` becomes targeting API&#xA0;29
and still published at Google Play.
**Another Term Shell Plugin - Android&#xA0;10 Essentials**
will be published in order to provide **PRoot** / **minitar** /
*possibly some launcher for binaries* for Androids&#xA0;10 and higher.

## Using **Another Term Shell Plugin - Android&#xA0;10 Essentials**

*<kbd>* Draft *</kbd>*

1) Install it from Google Play.

2) Create symlinks
```sh
cd "$DATA_DIR"
ln -s "$("$TERMSH" plugin green_green_avk.anothertermshellplugin_android10essentials minitar)" minitar
mkdir -p root/bin
mkdir -p root/libexec/proot
ln -s "$("$TERMSH" plugin green_green_avk.anothertermshellplugin_android10essentials proot)" root/bin/proot
ln -s "$("$TERMSH" plugin green_green_avk.anothertermshellplugin_android10essentials proot-userland)" root/bin/proot-userland
ln -s "$("$TERMSH" plugin green_green_avk.anothertermshellplugin_android10essentials proot-loader)" root/libexec/proot/loader
ln -s "$("$TERMSH" plugin green_green_avk.anothertermshellplugin_android10essentials proot-loader32)" root/libexec/proot/loader32
```
or just call it directly setting [`PROOT_LOADER`](https://github.com/green-green-avk/proot/blob/master/README.md){:target="_blank"}
and [`PROOT_LOADER_32`](https://github.com/green-green-avk/proot/blob/master/README.md){:target="_blank"} accordingly.

## [Related Issue](https://github.com/green-green-avk/AnotherTerm/issues/5){:target="_blank"}

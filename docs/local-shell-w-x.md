---
title: Local Shell **w^x** policy in Android&nbsp;10
---

## Facts

1. Google enforces target API >= 29 (`targetSdkVersion`) for all application updates at Google Play
from November&#xA0;1&#xA0;2020.

2. An application targeted API >= 29 cannot `execve()` any binaries
from any file tree locations that is writable by it on Androids&#xA0;10 and higher.

## Mitigation

Before November&#xA0;1&#xA0;2020, **Another Term** will be split into two flavors:

* `green_green_avk.anotherterm.oldgood` is still targeting API&#xA0;28
and published at GitHub only.

* `green_green_avk.anotherterm` becomes targeting API&#xA0;29
and still published at Google Play.
**Another Term Shell Plugin - Android&#xA0;10 Essentials**
will be published in order to provide **PRoot** / **minitar** /
*possibly some launcher for binaries* for Androids&#xA0;10 and higher.

**Note:** <kbd>MkIIIv18</kbd> will still target API&nbsp;28.
Only the version after it will target API&nbsp;29.

## Using **Another Term Shell Plugin - Android&#xA0;10 Essentials**

***<kbd>* Draft *</kbd>***

1) Install it from Google Play.

2) Enable it and set it "Always accessible" in the **Another Term** "Plugins" settings.

3) Call
```sh
"$("$TERMSH" plugin green_green_avk.anothertermshellplugin_android10essentials minitar)" < some.tar.xz

"$("$TERMSH" plugin green_green_avk.anothertermshellplugin_android10essentials proot)" ...
"$("$TERMSH" plugin green_green_avk.anothertermshellplugin_android10essentials proot-userland)" ...
```

## [Related Issue](https://github.com/green-green-avk/AnotherTerm/issues/5){:target="_blank"}

---
title: Local shell plugins
---
They resembles the **Termux** ones but with an access control and an ability to add them by creating new APKs:
* without recompiling the existing common one;
* with an arbitrary application signature.

## Plugins list
* <https://github.com/green-green-avk/AnotherTermShellPlugin-BatteryInfo>{:target="_blank"}
* <https://github.com/green-green-avk/AnotherTermShellPlugin-Location>{:target="_blank"}
* <https://github.com/green-green-avk/AnotherTermShellPlugin-Android10Essentials>{:target="_blank"}

## API
For creating new plugins or other than **Another Term** clients to use existing plugins with.

* <https://github.com/green-green-avk/AnotherTermShellPluginUtils>{:target="_blank"} --- basic API.
* <https://github.com/green-green-avk/AnotherTermShellPluginUtils-Perms>{:target="_blank"} --- access permissions management library.
* <https://github.com/green-green-avk/AnotherTermShellPluginUtils-Side-Application>{:target="_blank"} --- Android&nbsp;11 queries: application side.
* <https://github.com/green-green-avk/AnotherTermShellPluginUtils-Side-Plugin>{:target="_blank"} --- Android&nbsp;11 queries: plugin side.

{:style="clear:both"}
## ACL UI

### Client (e.g., Another Term) side
![screenshot-client]({{ '/assets/images/local-shell-plugins-ui-client.png' | relative_url }}){:.screenshot-phone-left}

{:style="overflow:hidden"}
* <kbd>Enabled</kbd> --- each plugin can be manually switched on/off any moment.
* <kbd>Always accessible</kbd> --- when set, the session 'Plugins execution' permission is overridden.

<br style="clear:both"/>

### Server (plugin) side (optional)
![screenshot-server]({{ '/assets/images/local-shell-plugins-ui-server.png' | relative_url }}){:.screenshot-phone-left}

If a plugin provides some critical information, the user must also explicitly authorize it to do so for each particular application.
It is supposed to show this dialog when the user enables the plugin in a client application.

<br style="clear:both"/>

![screenshot-server-2]({{ '/assets/images/local-shell-plugins-ui-server-2.png' | relative_url }}){:.screenshot-phone-left}

It is also supposed to show the permission revocation UI somewhere under the launcher icon of the plugin.

<br style="clear:both"/>

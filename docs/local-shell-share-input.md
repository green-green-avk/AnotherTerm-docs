---
title: Content sharing with Another Term
---
In order to process a *`android.intent.action.SEND`* or
*`android.intent.action.SEND_MULTIPLE`* action,
a new session with several additional environment variables will be created
from a user selected profile.

Environment variables:

* `INPUT_HTML`{:.clipboard}[&lt;2-n&gt;][`_URI`{:.clipboard}] &#x2014;
  *`android.intent.extra.HTML_TEXT`*
  or *`android.intent.extra.TEXT`* if former is not defined.
  <br/>Suffix `_URI` is used
  if input text is &gt; 4096&#160;B and cached by Another Term under a content URI
  (see [`termsh uri`](local-shell-utility.html#cmd_uri)).
  <br/>Any text will be represented as an HTML and encoded appropriately if needed.

* `INPUT_URIS`{:.clipboard} &#x2014;
  a space separated list of *`android.intent.extra.STREAM`*.

* `INPUT_MIME`{:.clipboard} &#x2014;
  `Intent.getType()`.

* `INPUT_SUBJECT`{:.clipboard} &#x2014;
  *`android.intent.extra.SUBJECT`*.

* `INPUT_EMAIL_`{:.clipboard}\{`TO`{:.clipboard}|`CC`{:.clipboard}|`BCC`{:.clipboard}\} &#x2014;
  *`android.intent.extra.{EMAIL|CC|BCC}`* respectively.

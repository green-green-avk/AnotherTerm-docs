---
title: Content sharing, viewing and editing with Another&nbsp;Term
---
In order to process an *`android.intent.action.SEND`*,
*`android.intent.action.SEND_MULTIPLE`*,
*`android.intent.action.VIEW`* or
*`android.intent.action.EDIT`* action,
a new session with several additional environment variables will be created
from a session profile selected by user from an additional chooser dialog.
**"Show in &#x00AB;share with&#x00BB; / &#x00AB;open in&#x00BB; chooser dialog"**
checkbox should be set in a session profile to make it visible.

**Note1:** Any URIs passed to Another&nbsp;Term are accessible
from all of its local shell sessions.
However there is no way to enumerate them
except cases of large texts sharing by value (see below) when
[`termsh uri -l`](local-shell-utility.html#cmd_uri){:target="_blank"}
can be used.

**Note2:** Passed URIs must be opened not later than a couple of seconds
since a sessions started: they will expire otherwise.
There are no other related time limitations in Android.

## Environment variables

* `INPUT_ACTION`{:.clipboard} &#x2014;
  `Intent.getAction()`.

* `INPUT_MIME`{:.clipboard} &#x2014;
  `Intent.getType()`.

### Sharing

* `INPUT_HTML`{:.clipboard}[2|3|...][`_URI`{:.clipboard}] &#x2014;
  *`android.intent.extra.HTML_TEXT`*
  or *`android.intent.extra.TEXT`* if former is not defined.
  <br/>Suffix `_URI` is used
  if input text is &gt;&nbsp;4096&nbsp;B and cached by Another&nbsp;Term under a content URI
  (see [`termsh uri`](local-shell-utility.html#cmd_uri){:target="_blank"}).
  <br/>Any text will be represented as an HTML and encoded appropriately if needed.

* `INPUT_URIS`{:.clipboard} &#x2014;
  a space separated list of *`android.intent.extra.STREAM`*.

* `INPUT_SUBJECT`{:.clipboard} &#x2014;
  *`android.intent.extra.SUBJECT`*.

* `INPUT_EMAIL_`{:.clipboard}\{`TO`{:.clipboard}|`CC`{:.clipboard}|`BCC`{:.clipboard}\} &#x2014;
  *`android.intent.extra.{EMAIL|CC|BCC}`* respectively.

### Viewing and editing

* `INPUT_URI`{:.clipboard} &#x2014;
  content URI.

---

`termsh`
[`cat`](local-shell-utility.html#cmd_cat){:target="_blank"}
| [`copy`](local-shell-utility.html#cmd_copy){:target="_blank"}
| [`with-uris`](local-shell-utility.html#cmd_with-uris){:target="_blank"}
etc.
<br/>are supposed to be used with these `INPUT[...]_URI[S]`.

[Some examples]({{ '/local-shell-examples/open-inside.html#main_content' | relative_url }}){:target="_blank"}

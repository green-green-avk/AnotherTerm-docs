---
layout: doc-xhtml
title: '**termsh**'
---
It resides in the native libraries directory in order to prevent accidental deletion
and the "execute" field in the favorite editor contains proper `TERMSH` variable definition by default.

**Note:** Please, don't forget to define [`TERMSH_UID`](#TERMSH_UID) environment variable (see description below) in case,
you are using any chrooted environment where an emulated user ID is not the same as the real one.

Manual as of version <kbd>MkIIIo</kbd> and later:

## Location

`TERMSH="$LIB_DIR/libtermsh.so"`{:.clipboard}

## Usage

```
"$TERMSH" [-r|--raw] <command> [<args...>]
```
<ul type="none">
<li><code>-r|--raw</code> &#x2014; raw mode as set by <code>cfmakeraw()</code> libc function.
(Beware, <kbd>Ctrl</kbd>-<kbd>C</kbd> etc. are not captured by the terminal in this mode.)</li>
</ul>

<h3>Commands:</h3>

<dl>

<dt><pre>
help
</pre></dt>
<dd>This message.</dd><br/>

<dt><pre>
notify [-i|--id &lt;id&gt;] [--] [&lt;message&gt;]
notify -r|--remove -i|--id &lt;id&gt;
</pre></dt>
<dd>
Display notification, <i>stdin</i> will be used if no message argument provided.
<ul type="none">
<li><code>-i|--id &lt;id&gt;</code> &#x2014; notification id.</li>
<li><code>-r|--remove</code> &#x2014; remove notification by id.</li>
</ul>
</dd><br/>

<dt><pre>
uri [--] &lt;file&gt;
uri [-m|--mime &lt;mime&gt;] [-n|--name &lt;name&gt;] [-s|--size &lt;size&gt;]
uri -c|--close-stream [--] &lt;URI&gt;
uri -l|--list-streams
</pre></dt>
<dd>
Get own content provider URI for specified file or stream or close previously opened stream.
<br/>Command exits immediately unless <code>-w|--wait</code> is specified.
In case of stream, the <code>&lt;URI&gt;</code> will automatically be unbound
when stream is read to its EOF or it can be closed by
<code>-c|--close-stream &lt;URI&gt;</code> option.
<ul type="none">
<li><code>-m|--mime &lt;mime&gt;</code> &#x2014; Mime type, <code>*/*</code> - default.</li>
<li><code>-n|--name &lt;name&gt;</code> &#x2014; name to use for representing a stream.</li>
<li><code>-s|--size &lt;size&gt;</code> &#x2014; size in bytes to provide in the query answer
if input is a stream.
GMail client, for example, treats absence of the size as zero size even in case of a stream.</li>
<li><code>-w|--wait</code> &#x2014; wait for the stream until it reaches EOF then closes it and exits;
<code>$TERMSH</code> termination is also closes the stream. Use when you need to keep a shell pipe line running;<br/>
example: <code>tar -czv * | $TERMSH uri -w</code></li>
<li><code>-c|--close-stream &lt;URI&gt;</code> &#x2014; unbind the stream <code>&lt;URI&gt;</code> and free related resources.</li>
<li><code>-l|--list-streams</code> &#x2014; list all bound stream URIs.</li>
</ul>
</dd><br/>

<dt><pre>
view|edit [&lt;options...&gt;] [--] &lt;file|URI&gt;
</pre></dt>
<dd>
Open for view / edit with appropriate temporary access rights.
<br/>Command exits after interaction with user.
<ul type="none">
<li><code>-N|--notify</code> &#x2014; post a notification instead of open the chooser dialog.</li>
<li><code>-m|--mime &lt;mime&gt;</code> &#x2014; Mime type, <code>*/*</code> - default.</li>
<li><code>-p|--prompt &lt;prompt&gt;</code> &#x2014; to show in chooser dialog.</li>
<li><code>-r|--recipient &lt;recipient&gt;</code> &#x2014; a particular activity
to send this intent to. <code>&lt;recipient&gt;</code> can be:
<ul>
<li>An activity class name of this application.</li>
<li>An activity of another application in form:
<code>&lt;package&gt;/&lt;activity_class&gt;</code><br/>
(<code>&lt;activity_class&gt;</code> can begin with a <code>.</code> (dot)
to use <code>&lt;package&gt;</code> as it's prefix:<br/>
<code>foo.bar/.Act</code> => <code>foo.bar/foo.bar.Act</code>).</li>
</ul>
<h4>Example:</h4>
<pre>
"$TERMSH" view -r 'green_green_avk.anotherterm.FavoriteEditorActivity' -u 'local-terminal:/opts?execute=my_awesome_script'
</pre>
</li>
<li><code>-u|--uri</code> &#x2014; use URI instead of file.</li>
</ul>
</dd><br/>

<dt><pre>
send [&lt;options...&gt;] [--] [&lt;file|URI&gt; ...]
</pre></dt>
<dd>
Send (<code>android.intent.action.SEND</code> or <code>android.intent.action.SEND_MULTIPLE</code>).
<br/><code>&lt;file|URI&gt;</code> is treated as a file path if it does not match
<code>/^(?:[a-z0-9+.-]+):\/\//i</code>.
<br/><code>-</code> is used to represent the <i>stdin</i>.
<br/>If no <code>&lt;file|URI&gt;</code> is specified, the <i>stdin</i> is used.
<br/>Command exits after a stream was sent or after interaction with user
if a file or URI is specified.
<ul type="none">
<li><code>-N|--notify</code> &#x2014; post a notification instead of open the chooser dialog.</li>
<li><code>-m|--mime &lt;mime&gt;</code> &#x2014; Mime type for an <i>stdin</i> stream or
a single <code>&lt;file|URI&gt;</code> argument, <code>*/*</code> - default.</li>
<li><code>-n|--name &lt;name&gt;</code> &#x2014; name to use for representing
an <i>stdin</i> stream.</li>
<li><code>-s|--size &lt;size&gt;</code> &#x2014; size in bytes to provide in the query answer
if input is an <i>stdin</i> stream.
GMail client, for example, treats absence of the size as zero size even in case of a stream.</li>
<li><code>-p|--prompt &lt;prompt&gt;</code> &#x2014; to show in the chooser dialog.</li>
</ul>
</dd><br/>

<dt><pre>
pick [&lt;options...&gt;] [--] [&lt;path&gt;]
</pre></dt>
<dd>
Show document picker dialog and put the selected content (or its URI) to:
<ul>
<li>file if <code>&lt;path&gt;</code> is a file;</li>
<li>file with the name provided by the content provider (or deduced from the URI)*
if <code>&lt;path&gt;</code> is a directory;</li>
<li><i>stdout</i> if nothing is specified.</li>
</ul>
The <code>http</code> an <code>https</code> schemes are also supported along with
the <code>content</code> and <code>file</code> ones.
<br/>Command exits after content was received or right after chooser dialog result
if a URI is specified.
<ul type="none">
<li><code>--insecure</code> &#x2014; connect via HTTPS even in case of invalid certificate.</li>
<li><code>-N|--notify</code> &#x2014; post a notification instead of open the chooser dialog.</li>
<li><code>-m|--mime &lt;mime&gt;</code> &#x2014; Mime type, <code>*/*</code> - default.</li>
<li><code>-p|--prompt &lt;prompt&gt;</code> &#x2014; to show in chooser dialog.</li>
<li><code>-u|--uri</code> &#x2014; output URI instead of content.</li>
<li><code>-f|--force</code> &#x2014; permit destination overwriting.</li>
</ul>
<h4>Examples:</h4>
<pre>"$TERMSH" pick .</pre>
<pre>"$TERMSH" pick | tar -zxv</pre>
</dd><br/>

<dt><pre>
copy [-f|--force] [--insecure] [--progress] [-fp|--from-path|-fu|--from-uri &lt;from&gt;] [-tp|--to-path|-tu|--to-uri &lt;to&gt;]
</pre></dt>
<dd>
Copy content. Only single files are supported now.
The source URI scheme could be <code>content</code>, <code>http</code> or <code>https</code>.
The destination URI scheme could be <code>content</code> only.
If <code>&lt;from&gt;</code> or <code>&lt;to&gt;</code> is not specified,
<i>stdin</i> or <i>stdout</i> will be used respectively.
<ul type="none">
<li><code>-f|--force</code> &#x2014; permit destination overwriting.</li>
<li><code>--insecure</code> &#x2014; connect via HTTPS even in case of invalid certificate.</li>
<li><code>--progress</code> &#x2014; output current progress to <i>stderr</i>.</li>
</ul>
</dd><br/>

<dt><pre>
cat [--insecure] [--progress] [&lt;URI&gt; ...]
</pre></dt>
<dd>
Concatenate specified URIs content to the <i>stdout</i>, <code>-</code> is used to represent
the <i>stdin</i>.
The URIs scheme could be <code>content</code>, <code>http</code> or <code>https</code>.
If no URIs are given, the <i>stdin</i> will be used.
<ul type="none">
<li><code>--insecure</code> &#x2014; connect via HTTPS even in case of invalid certificate.</li>
<li><code>--progress</code> &#x2014; output current progress to <i>stderr</i>.</li>
</ul>
<h4>Examples:</h4>
<pre>
"$TERMSH" cat "content://$APP_ID.linksprovider/html/some_url_to_be_wrapped_into_html"
</pre>
<pre>
uri="$("$TERMSH" pick -u)"
"$TERMSH" cat "$uri" > "$("$TERMSH" name "$uri").new"
</pre>
</dd><br/>

<dt><pre>
name &lt;URI&gt;
</pre></dt>
<dd>
Get the name provided by content provider (or deduced from the URI)*
</dd><br/>

<dt><pre>
size [--insecure] &lt;URI&gt;
</pre></dt>
<dd>
Get the size provided by content provider (or <code>null</code> if not defined)
</dd><br/>

<dt><pre>
serial -l|--list
serial [-a|--adapter &lt;address&gt;] [-i|--insecure] [&lt;baudrate&gt;[/&lt;databits&gt;[/&lt;stopbits&gt;[/&lt;parity&gt;[/&lt;flowcontrol&gt;]]]]]
</pre></dt>
<dd>
Connect to an USB serial dongle and use <i>stdin</i> / <i>stdout</i>.
<ul type="none">
<li><code>-a|--adapter</code> &#x2014; use a dongle specified by <code>&lt;address&gt;</code>;</li>
<li><code>-i|--insecure</code> &#x2014; don't use a secure connection (Bluetooth);</li>
<li><code>-l|--list</code> &#x2014; list available UART dongles in the form <code>&lt;address&gt; &lt;description&gt;</code>.</li>
</ul>
<h4>Possible values:</h4>
<ul type="none">
<li>baudrate: a positive number or <code>0</code>*</li>
<li>databits: <code>-</code>*, <code>8</code>, <code>7</code>, <code>6</code>, <code>5</code></li>
<li>stopbits: <code>-</code>*, <code>1</code>, <code>1.5</code>, <code>2</code></li>
<li>parity: <code>-</code>*, <code>none</code>, <code>even</code>, <code>odd</code>, <code>mark</code>, <code>space</code></li>
<li>flowcontrol: <code>-</code>*, <code>off</code>, <code>xon_xoff</code>, <code>rts_cts</code>, <code>dsr_dtr</code></li>
</ul>
<p>* &#x2014; preserve current value</p>
<p><b>Default:</b> <code>0/-/-/-/-</code></p>
<p><b>Note:</b> Alas, UART port settings
(<code>&lt;baudrate&gt;</code>, <code>&lt;databits&gt;</code>, <code>&lt;stopbits&gt;</code>, <code>&lt;parity&gt;</code>, <code>&lt;flowcontrol&gt;</code>)
cannot be applied to Bluetooth dongles using the Android Bluetooth stack.<br/>
See <a target="_blank" href="issues.html#bluetooth-uart-dongles-support">details</a>.</p>
</dd><br/>

<dt><pre>
uri-encode &lt;string&gt; [&lt;allowed&gt;]
</pre></dt>
<dd>URL-escape a <code>&lt;string&gt;</code> but don't touch characters from
an <code>&lt;allowed&gt;</code> string.
<p>If the <code>&lt;allowed&gt;</code> is not specified,
<code>java.net.URLEncode.encode(string, "UTF8")</code> will be used.
It escapes according to the <code>application/x-www-form-urlencoded</code> MIME format.</p>
<p>If the <code>&lt;allowed&gt;</code> is specified (even empty),
<code>android.net.Uri.encode(string, allowed)</code> will be used.
<code>[A-Za-z0-9_!.~\'()*-]</code> are always unaffected.</p>
</dd><br/>

<dt><pre>
uri-decode &lt;string&gt;
</pre></dt>
<dd>URL-unescape a <code>&lt;string&gt;</code>.</dd><br/>

<dt><pre>
request-permission &lt;name&gt; &lt;message&gt;
</pre></dt>
<dd>Ask the user by a dialog.
<ul type="none">
<li><code>&lt;name&gt;</code> &#x2014; can be: <code>favmgmt</code>, <code>pluginexec</code>.</li>
<li><code>&lt;message&gt;</code> &#x2014; to show.</li>
</ul>
<p>Return codes:</p>
<ul type="none">
<li><code>0</code> &#x2014; granted by user;</li>
<li><code>1</code> &#x2014; error occurred;</li>
<li><code>2</code> &#x2014; denied by user;</li>
<li><code>3</code> &#x2014; already granted.</li>
</ul>
</dd><br/>

<dt><pre>
revoke-permission &lt;name&gt;
</pre></dt>
<dd>Just revoke.</dd><br/>

<dt><pre>
has-favorite &lt;name&gt;
</pre></dt>
<dd>Return <code>0</code> exit code if a favorite named <code>&lt;name&gt;</code> exists,
<code>2</code> otherwise.
<p><em>'Favorite management' permission must be granted in a favorite starting the shell from which
this command is called. Exit code <code>1</code> will be returned otherwise.</em></p></dd><br/>

<dt><pre>
create-shell-favorite [-t|--term &lt;terminal_string&gt;] &lt;name&gt; &lt;execute&gt;
</pre></dt>
<dd>Create a shell favorite named <code>&lt;name&gt;</code>
executing <code>&lt;execute&gt;</code> script string.
It fails with exit code <code>2</code> if <code>&lt;name&gt;</code> is already in use.
<p><em>'Favorite management' permission must be granted in a favorite starting the shell from which
this command is called. Exit code <code>1</code> will be returned otherwise.</em></p></dd><br/>

<dt><pre>
plugin [--] &lt;package_name&gt; [&lt;args...&gt;]
plugin -h|--help [--] &lt;package_name&gt;
</pre></dt>
<dd>Execute a plugin specified by <code>&lt;package_name&gt;</code> or show its info page.
<p><em>'Plugins execution' permission must be granted in a favorite starting the shell from which
this command is called. Exit code <code>1</code> will be returned otherwise.</em></p></dd><br/>

<dt><pre>
wakelock [is-held|acquire [&lt;timeout&gt;]|release]
</pre></dt>
<dd><p><code>is-held</code> returns:
<ul type="none">
<li><code>0</code> &#x2014; lock is active;</li>
<li><code>2</code> &#x2014; lock is not active.</li>
</ul></p>
<p><code>&lt;timeout&gt;</code> is a decimal value in seconds
with one millisecond granularity.</p>
</dd><br/>

</dl>

## Notes

{: .no-bullet}
* \* --- If file name deduction fails, `unnamed` is used and
exit code `2` is returned.
* ** --- Any UI element started by a script will not be shown and block
until related shell session UI become active.

## Environment variables

{: .no-bullet}
* `TERMSH_UID`{:#TERMSH_UID}{:.clipboard} --- a real UID of this application used for spoofing detection.
It should be set by the user in case the emulated UID is different (chrooted environment, for example).

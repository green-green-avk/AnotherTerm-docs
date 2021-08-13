---
title: Processing content with Linux applications
---
## Open or save

For **mcedit** lovers. Feel free to use **Emacs** though.

[Session profile settings quick URI](local-terminal:/opts?perm_favmgmt=false&shareable=true&charset=UTF-8&screen_cols=0&screen_rows=0&keymap=&wakelock.acquire_on_connect=true&terminal_string=xterm&perm_pluginexec=true&font_size_auto=false&wakelock.release_on_disconnect=true&execute=/system/bin/sh%20%22%24DATA_DIR%2Fproots%2Flinuxcontainers-debian-buster%2Frun%22%20''%20'~%2Fcontent-open-save.sh'&name=Open%20or%20Save&terminate.on_disconnect=true)[^1]

{:style="clear:both"}
### content-open-save.sh
```sh
#!/bin/bash

. ./content-base.sh

if [[ -n $INPUT_URI ]] # VIEW / EDIT
then
 case "$INPUT_MIME" in
 text/*)
  termsh with-uris mcedit mcedit "$INPUT_URI"
  ;;
 *)
  #msg_err "Type $INPUT_MIME is not supported"
  export USE_OWN=1
  termsh with-uris mcview mcview "$INPUT_URI"
  ;;
 esac
 DONE=1
elif [[ -n $INPUT_URIS ]] # SEND / SEND_MULTIPLE
then
 for URI in $INPUT_URIS
 do
  save_uri "$URI"
  DONE=1
 done
fi

[[ -z $DONE ]] && msg_err 'Nothing to open'

msg_wait
```
{:.clipboard}

## Resend as text

To quick substitute text file content as the body of a new e-mail letter,
for example.

[Session profile settings quick URI](local-terminal:/opts?perm_favmgmt=false&shareable=true&charset=UTF-8&screen_cols=0&screen_rows=0&keymap=&wakelock.acquire_on_connect=true&terminal_string=xterm&perm_pluginexec=true&font_size_auto=false&wakelock.release_on_disconnect=true&execute=/system/bin/sh%20%22%24DATA_DIR%2Fproots%2Flinuxcontainers-debian-buster%2Frun%22%20''%20'~%2Fcontent-send-as-text.sh'&name=Send%20as%20text&terminate.on_disconnect=true)[^1]

### content-send-as-text.sh
```sh
#!/bin/bash

. ./content-base.sh

if [[ -n $INPUT_URI ]]
then
 send_as_text "$INPUT_URI"
 DONE=1
elif [[ -n $INPUT_URIS ]]
then
 for URI in $INPUT_URIS
 do
  send_as_text "$URI"
  DONE=1
 done
fi

[[ -z $DONE ]] && msg_err 'Nothing to send'

msg_wait
```
{:.clipboard}

## Common scripts
### content-base.sh
```sh
DOWNLOADS=~/download/

msg_err() {
 echo -en '\e[1;37;41m\e[2K\n\e[2K'
 echo " [ $1 ]"
 echo -en '\e[2K\n\e[0m\e[2K'
}

msg_ok() {
 echo -en '\e[1;37;40m\e[2K\n\e[2K [ \e[32m'
 echo -n "$1"
 echo -en '\e[37m ]\n\e[2K\n\e[0m\e[2K'
}

msg_wait() {
 echo -en '\e[?1004h'
 read -n 1 -s -p '   *** Press any key ***'
 echo -en '\e[?1004l'
}

save_uri() {
 URI=$1
 if R=$(termsh copy -fu "$URI" -tp "$DOWNLOADS" 2>&1)
 then
  msg_ok "$URI saved to $DOWNLOADS"
 else
  msg_err "Failed to save $URI to $DOWNLOADS : $R"
 fi
}

send_as_text() {
 URI=$1
 if R=$(termsh cat "$URI" | termsh send --text-stdin 2>&1)
 then
  msg_ok "Sending $URI ..."
 else
  msg_err "Failed to send $URI : $R"
 fi
}
```
{:.clipboard}

[^1]: It is supposed that the enclosing PRooted environment is installed by [the linuxcontainers.org script]({{ '/installing-linux-under-proot.html#making-it-quick-linuxcontainersorg-to-the-rescue' | relative_url }}){:target="_blank"} and the "execute" field should be corrected accordingly to a desired root FS directory.

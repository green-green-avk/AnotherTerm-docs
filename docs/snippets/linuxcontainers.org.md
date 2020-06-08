# Linux rootfs sources: linuxcontainers.org

Their images are licensed under: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/){:target="_blank"}

List of the images: [Page](https://us.images.linuxcontainers.org/){:target="_blank"} / [Index file](https://us.images.linuxcontainers.org/meta/1.0/index-user){:target="_blank"}

Install script source: <https://github.com/green-green-avk/AnotherTerm-scripts/blob/master/install-linuxcontainers.sh>

Install script usage:
```
./install-linuxcontainers.sh [-a] <distro> <release> [<target_subdir_name>]

  -a -- non-interactive mode
```

If you want to access the application's private directory (where all your PRoot rootfses with their metadata are located) from your PRooted environment, see `/etc/proot/run.cfg`.

Uninstall:
```sh
rm -rf "$DATA_DIR/proots/<target_subdir_name>"
```

Copy-paste snippets for download and install (you can specify any distribution and release from the list):

&nbsp;
* Alpine Edge
```sh
( S=install-linuxcontainers.sh ; "$TERMSH" copy -f -fu "https://raw.githubusercontent.com/green-green-avk/AnotherTerm-scripts/master/$S" -tp . && chmod 755 $S && ./$S -a alpine edge )
```
  {:.clipboard}
[[Alpine key map settings](termkeymap:/v2?4489=%1B%5B15%3B2~&448b=%1B%5B18%3B2~&4485=%1BO2P&488=%1BO2S&48b=%1B%5B18%3B2~&48a=%1B%5B17%3B2~&487=%1BO2R&4487=%1BO2R&485=%1BO2P&489=%1B%5B15%3B2~&486=%1BO2Q&448a=%1B%5B17%3B2~&4486=%1BO2Q&4488=%1BO2S&name=Alpine)]
(for its specific mapping of <kbd>Shift</kbd>-<kbd>F*</kbd>)

&nbsp;
* CentOS 8
```sh
( S=install-linuxcontainers.sh ; "$TERMSH" copy -f -fu "https://raw.githubusercontent.com/green-green-avk/AnotherTerm-scripts/master/$S" -tp . && chmod 755 $S && ./$S -a centos 8 )
```
  {:.clipboard}

&nbsp;
* Debian Buster
```sh
( S=install-linuxcontainers.sh ; "$TERMSH" copy -f -fu "https://raw.githubusercontent.com/green-green-avk/AnotherTerm-scripts/master/$S" -tp . && chmod 755 $S && ./$S -a debian buster )
```
  {:.clipboard}

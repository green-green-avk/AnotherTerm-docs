---
title: Local shell environment variables
vars:
  - name: DATA_DIR
    desc: default persistent data directory.

  - name: PROTECTED_DATA_DIR
    desc: default device-protected persistent data directory (set if available).

  - name: SHARED_DATA_DIR
    desc: |
      directory on the primary shared/external storage device
      where the application can place persistent files it owns
      (set if available).
      Any other application with the storage access permissions can also access this place.

  - name: EXTERNAL_DATA_DIR
    desc: an alias to `SHARED_DATA_DIR`.

  - name: PUBLIC_DATA_DIR
    desc: |
      the root of the "sdcard".
      `READ_EXTERNAL_STORAGE` / `WRITE_EXTERNAL_STORAGE` permissions are required.

  - name: LIB_DIR
    desc: native binaries path.

  - name: APP_APK
    desc: |
      path to the **Another Term** APK.

  - name: APP_ID
    desc: |
      **Another Term** application id.

  - name: APP_VERSION
    desc: |
      **Another Term** version.

  - name: APP_TARGET_SDK
    desc: |
      **Another Term** `targetSdkVersion`.

  - name: MY_DEVICE_ABIS
    desc: supported architectures list from the most preferable to the least preferable.

  - name: MY_ANDROID_SDK
    desc: Android SDK version.

  - name: SHELL_SESSION_TOKEN
    desc: |
      associated with related data including **termsh** permissions.
      It can be unset to avoid propagation of any permissions and
      block any dialogs and activities opening by **termsh**.
      Use [`termsh revoke-permission`](local-shell-utility.html#cmd_revoke-permission)
      for granular revokation.
---

{: .no-bullet}{% for var in page.vars %}
* `{{ var.name }}`{:#{{ var.name }}}{:.clipboard} --- {{ var.desc }}
{% endfor %}

See also: [Content sharing with Another Term](local-shell-share-input.html#main_content){:target="_blank"}
and [Start a session by an intent](start-a-session-by-an-intent.html#main_content){:target="_blank"}

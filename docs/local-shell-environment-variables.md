---
title: Local Shell Environment Variables
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

  - name: LIB_DIR
    desc: native binaries path.

  - name: APP_ID
    desc: application id.

  - name: APP_VERSION
    desc: application version.

  - name: MY_DEVICE_ABIS
    desc: supported architectures list from the most preferable to the least preferable.

  - name: MY_ANDROID_SDK
    desc: Android SDK version.

  - name: SHELL_SESSION_TOKEN
    desc: |
      associated with related data including **termsh** permissions.
      It can be unset to avoid propagation of any permissions.
---

{: .no-bullet}{% for var in page.vars %}
* `{{ var.name }}`{:#{{ var.name }}}{:.clipboard} --- {{ var.desc }}
{% endfor %}

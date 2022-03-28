---
title: Start a session by an intent
---
Android has no means to determine the intent source
(the Android own permission model is not flexible enough to pair arbitrary applications)
and the automation software like **Tasker**
do not usually provide any simple means to bind to a service
(in which case an application credentials check is possible).
So, the *"token"* field has been added to the favorite parameters
to mitigate this situation. This field stores a unique ID
that acts as a passphrase to start a session.

A script is being executed inside the session
is supposed to control the number of running session instances.

Intent parameters to start a session:

**Intent target:** *service*

**Package (application ID):**
`green_green_avk.anotherterm`{:.clipboard}[.*variant*]

**Class:**
`green_green_avk.anotherterm.ControlService`{:.clipboard}

**Action:**
`green_green_avk.anotherterm.intent.action.START_SESSION`{:.clipboard}

**Category:**
`android.intent.category.DEFAULT`{:.clipboard}

**Extra:**
`green_green_avk.anotherterm.intent.extra.FAV_TOKEN`{:.clipboard}<br/>
with the value (of *String* type) from the *"token"* field of the desired favorite settings.

All *String* **extras** will be passed to the environment variables named
with the **extras** names converted as
`.toUpperCase(Locale.ROOT).replaceAll("[^A-Z0-9_]", "_")`
and prefixed by `INPUT_`. `…FAV_TOKEN` value will be hidden.

## Usage examples

### Autorun on boot

An [**Automate**](https://llamalab.com/automate/){:target="_blank"} [flow file example]({{ '/assets/files/boot.flo' | relative_url }})
![Thumbnail]({{ '/assets/files/boot.png' | relative_url }}){:style="display:block"}
***Note:** The **Automate** global setting "Run on system startup" must be set and the flow launched.*

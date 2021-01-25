---
title: Serial port
---
## HTTP server for remote access

To read: `GET http://<host:port>/readbytes`; responds as described in <https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#event_stream_format> as
```
event: bytes
data: <couples_of_hexidecimal_digits>

...
```

To write: `GET http://<host:port>/writebytes/<couples_of_hexidecimal_digits>`

**Note:** `termsh` here is a PRoot binding of `"$TERMSH"`.

{:style="clear:both"}
### server.py
```python
#!/usr/bin/python3

import http.server
import wrappers

host = "localhost"
port = 8081

writebytesPrefix = "/writebytes/"
readbytesPrefix = "/readbytes"

serial = wrappers.Serial()

class MyHandler(http.server.BaseHTTPRequestHandler):
 protocol_version = "HTTP/1.1"
 def do_GET(self):
  if self.path.startswith(writebytesPrefix):
   try:
    dataIn = bytes.fromhex(self.path[len(writebytesPrefix):])
    serial.write(dataIn)
   except ValueError:
    self.send_error(400)
    return
   except wrappers.ConnException as e:
    self.send_error(500, explain=str(e))
    return
   self.send_response(200)
   self.send_header("Cache-Control", "no-cache")
   self.send_header("Content-Type", "text/plain")
   self.send_header("Content-Length", "2")
   self.end_headers()
   self.wfile.write(b"Ok")
   self.wfile.flush()
   return
  if self.path == readbytesPrefix:
   self.send_response(200)
   self.send_header("Cache-Control", "no-cache")
   self.send_header("Content-Type", "text/event-stream")
   self.end_headers()
   try:
    while True:
     dataOut = serial.read1(4096)
     dataOutStr = b''.join(b"%02X" % b for b in dataOut)
     print(dataOutStr)
     self.wfile.write(b"event: bytes\ndata: %s\n\n" % dataOutStr)
     self.wfile.flush()
   except wrappers.ConnException as e:
    return
   return
  self.send_error(400)

if __name__ == "__main__":
 webServer = http.server.ThreadingHTTPServer((host, port), MyHandler)
 print("Server started http://%s:%s" % (host, port))

 try:
  webServer.serve_forever()
 except KeyboardInterrupt:
  pass

 webServer.server_close()
 print("Server stopped.")
```
{:.clipboard}
<br/>

### wrappers.py
```python
#!/usr/bin/python3

import functools
import subprocess

class ConnException(Exception):
 pass

class Serial:
 def __init__(self, insecure=False, cfg=None):
  cmd = ('termsh', 'serial')
  if insecure:
   cmd += ('-i',)
  if cfg is not None:
   cmd += (str(cfg),)
  self.proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
  self.err = None

 def check(self):
  if self.err is not None:
   raise ConnException(self.err)
  r = self.proc.poll()
  if r is None:
   return
  self.err = self.proc.stderr.read().decode()
  raise ConnException(self.err)

 def _io(m):
  @functools.wraps(m)
  def r(self, *args, **kwds):
   self.check()
   try:
    return m(self, *args, **kwds)
   except BrokenPipeError as e:
    raise ConnException(e)
  return r

 @_io
 def read(self, n):
  return self.proc.stdout.read(n)

 @_io
 def read1(self, n):
  return self.proc.stdout.read1(n)

 @_io
 def write(self, v):
  r = self.proc.stdin.write(v)
  self.proc.stdin.flush()
  return r

 def stop(self):
  self.proc.terminate()

 def __enter__(self):
  return self

 def __exit__(self):
  self.stop()
  return False
```
{:.clipboard}
<br/>

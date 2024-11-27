<!-- .slide: data-theme="black" data-background-emoji="✨"-->
# Project fugu 🐡

<span>📑 [project-fugu-presentation.netlify.app](https://project-fugu-presentation.netlify.app/) </span> <br><!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-theme="black" data-background-emoji="🙋"-->
> Who has experience with creating cross platform applications?

<div>

> Cordova, Electron, React Native, Capacitor?

</div><!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-theme="black" data-background-emoji="📱"-->
> Who has experience with PWAs?

---

<!-- .slide: data-theme="black" data-background-emoji="💭"-->
> What if you could just use the web platform for applications?

---

<!-- .slide: data-theme="yellow" data-background-emoji="📎"-->
## Lucien Immink

---

<!-- .slide: data-theme="yellow" data-background-emoji="📎"-->
![Lucien Immink](/assets/lucien-2024.jpg)<!-- .element: class="circle" style="max-height: 20vh" -->

### Principal Consultant @ Team Rockstars IT

#### Google Developer Expert

---

<!-- .slide: data-theme="black" data-background-emoji="🧑‍💻"-->
## Cross platform development

---

<!-- .slide: data-theme="black" data-background-emoji="🧑‍💻"-->
- Electron<!-- .element: class="fragment fade-in-then-semi-out" -->
- Capacitor<!-- .element: class="fragment fade-in-then-semi-out" -->
- React Native<!-- .element: class="fragment fade-in-then-semi-out" -->
- Phonegap / Cordova<!-- .element: class="fragment fade-in-then-semi-out" -->
- ...<!-- .element: class="fragment fade-in" -->
- web?<!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-theme="black" data-background-emoji="🧑‍💻"-->
![multi-target-cross-platform-development](/assets/multi-target-cross-platform-development.webp)<!-- .element: class="image" -->

---

<!-- .slide: data-theme="black" data-background-emoji="📱"-->
## PWA

---

<!-- .slide: data-theme="black" data-background-emoji="📱"-->
![PWA](/assets/PWA.webp)

---

<!-- .slide: data-theme="black" data-background-emoji="📱"-->
> Progressive Web Apps bring offline and _app-like_ experiences to the web.

---

<!-- .slide: data-theme="black" data-background-emoji="🐡"-->
## Project Fugu

---

<!-- .slide: data-theme="black" data-background-emoji="💬"-->
<br><br><br><br>
<blockquote class="no-background"><p>Microsoft, Samsung, Intel, Electron, Google. That's the big names.</p></blockquote>

<br><br>
<p> <!-- .element: style="display: flex; align-items: center; gap:1vw; justify-content:center;" -->
  <img src="/assets/thomas-steiner.webp" alt="Thomas Steiner" class="circle" style="max-height: 10vh">
  <span>Thomas Steiner &bull; Google</span>
</p>
---

<!-- .slide: data-theme="black" data-background-emoji="💥"-->
> The (Chromium) team chose the name because they knew that if they violated the core tenets of the web, the entire project could backfire.

---

<!-- .slide: data-theme="black" data-background-emoji="🤝"-->
- 🤝 Trust
- 🕵️ Privacy <!-- .element: class="fragment fade-in" -->
- 🔒 Security <!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-theme="black" data-background-emoji="💬"-->
> Project Fugu APIs act as an abstraction layer between native APIs and the web.

---

<!-- .slide: data-theme="black" data-background-emoji="🗨️"-->
![API abstraction](/assets/api-call-abstraction.webp)<!-- .element: class="image" -->

---

<!-- .slide: data-theme="black" data-background-emoji="🪜"-->
![Adding APIs](/assets/adding-apis.webp)<!-- .element: class="image" -->

---

<!-- .slide: data-theme="black" data-background-emoji="💯"-->
## Some released features

---

<!-- .slide: data-theme="black" data-background-emoji="👩‍💻"-->
### USB

```javascript
let device;

navigator.usb.requestDevice({ filters: [{ vendorId: 0x2341 }] })
.then(selectedDevice => {
    device = selectedDevice;
    return device.open(); // Begin a session.
  })
.then(() => device.selectConfiguration(1)) // Select configuration #1 for the device.
.then(() => device.claimInterface(2)) // Request exclusive control over interface #2.
.then(() => device.controlTransferOut({
    requestType: 'class',
    recipient: 'interface',
    request: 0x22,
    value: 0x01,
    index: 0x02})) // Ready to receive data
.then(() => device.transferIn(5, 64)) // Waiting for 64 bytes of data from endpoint #5.
.then(result => {
  const decoder = new TextDecoder();
  console.log('Received: ' + decoder.decode(result.data));
})
.catch(error => { console.error(error); });
```
<p>
  <img src="/assets/icons/javascript.svg" class="icon icon-inline" alt=""> arduino-usb-board.js
</p><!-- .element: class="filename" -->

<span><img src="/assets/icons/usb.svg" class="icon icon-inline" alt="" style="width: 1em;">[Web USB](https://developer.chrome.com/articles/usb/)</span><!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-theme="black" data-background-emoji="👩‍💻"-->
### Bluetooth

```javascript
navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
.then(device => device.gatt.connect())
.then(server => {
  // Getting Battery Service…
  return server.getPrimaryService('battery_service');
})
.then(service => {
  // Getting Battery Level Characteristic…
  return service.getCharacteristic('battery_level');
})
.then(characteristic => {
  // Reading Battery Level…
  return characteristic.readValue();
})
.then(value => {
  console.log(`Battery percentage is ${value.getUint8(0)}`);
})
.catch(error => { console.error(error); });
```

<span><img src="/assets/icons/bluetooth.svg" class="icon icon-inline" alt="" style="width: 1em;">[Web Bluetooth](https://developer.chrome.com/articles/bluetooth/)</span><!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-theme="black" data-background-emoji="👩‍💻"-->
### Async clipboard

<iframe allow="clipboard-read; clipboard-write" style="height: 30vh; width: 100%; border: 0;" title="async-clipboard-text on Glitch" src="https://async-clipboard-text.glitch.me/"></iframe>

<span>💡[Unblocking clipboard access](https://web.dev/async-clipboard/)</span><!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-theme="black" data-background-emoji="👩‍💻"-->
### Badging

```javascript
// Set the badge
const unreadCount = 24;
navigator.setAppBadge(unreadCount).catch((error) => { /* ... */ });

// Clear the badge
navigator.clearAppBadge().catch((error) => { /* ... */ });
```

![badge](/assets/badge.webp)<!-- .element: class="image" -->

<span>🦕[Badging API](https://developer.mozilla.org/en-US/docs/web/api/badging_api)</span><!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-theme="black" data-background-emoji="👩‍💻"-->
### WebOTP API

```html
<form>
  <input autocomplete="one-time-code" required/>
  <input type="submit">
</form>
```

```javascript
if ('OTPCredential' in window) {
  window.addEventListener('DOMContentLoaded', e => {
    ...
    const ac = new AbortController();
    const input = document.querySelector('input[autocomplete="one-time-code"]');
    navigator.credentials.get({
      otp: { transport:['sms'] },
      signal: ac.signal
    }).then(otp => {
      input.value = otp.code;
    }).catch(err => { /* ... */ });
  });
}
```

<span>📱[Verifying phone numbers with the WebOTP API](https://developer.chrome.com/articles/web-otp/)</span><!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-theme="black" data-background-emoji="👩‍💻"-->
### Local Font Access

```javascript
// Query for all available fonts and log metadata.
try {
  const availableFonts = await window.queryLocalFonts();
  for (const fontData of availableFonts) {
    console.log(fontData.postscriptName);
    console.log(fontData.fullName);
    console.log(fontData.family);
    console.log(fontData.style);
  }
} catch (err) {
  console.error(err.name, err.message);
}
```

<span>🔠[Advanced typography with local fonts](https://developer.chrome.com/articles/local-fonts/)</span><!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-theme="black" data-background-emoji="👩‍💻"-->
### File System Access

<div>

```javascript
let fileHandle;
butOpenFile.addEventListener('click', async () => {
  [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  const contents = await file.text();
  textArea.value = contents;
});
```

read<!-- .element: class="filename" -->

</div>

<div>

```javascript
async function writeFile(fileHandle, contents) {
  const writable = await fileHandle.createWritable();
  await writable.write(contents);
  await writable.close();
}
```

write<!-- .element: class="filename" -->

</div><!-- .element: class="fragment fade-in" -->

<span> ![iO logo](/assets/io-black.svg)<!-- .element: class="icon icon-inline" --> [File System Access API by Dave Bitter](https://techhub.iodigital.com/articles/the-file-system-access-api) </span><!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-theme="black" data-background-emoji="👩‍💻"-->
### Contact Picker

```javascript
const supported = ('contacts' in navigator && 'ContactsManager' in window);
if (supported) {
  const props = ['name', 'email', 'tel', 'address', 'icon'];
  const opts = {multiple: true};

  try {
    const contacts = await navigator.contacts.select(props, opts);
    console.log(contacts);
  } catch (ex) { /* ... */ }
}
```

<span>📖[A contact picker for the web](https://developer.chrome.com/articles/contact-picker/)</span><!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-theme="black" data-background-emoji="🫙"-->
## ... And many more

---

<!-- .slide: data-theme="black" data-background-emoji="📅"-->
## Some Upcoming features

---

<!-- .slide: data-theme="black" data-background-emoji="📅"-->
- Ambient Light Sensor API<!-- .element: class="fragment fade-in" -->
- Borderless mode<!-- .element: class="fragment fade-in" -->
- App store payment support for TWAs<!-- .element: class="fragment fade-in" -->
- Splash screen API<!-- .element: class="fragment fade-in" -->
- Gamepad Button and Axis events<!-- .element: class="fragment fade-in" -->
- ...<!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-theme="black" data-background-emoji="🥼"-->
### Under consideration

- Access to common libraries<!-- .element: class="fragment fade-in" -->
- App Menu API for installed PWAs<!-- .element: class="fragment fade-in" -->
- Block and/or Detect Screenshots<!-- .element: class="fragment fade-in" -->
- Call dialer/answering/control APIs<!-- .element: class="fragment fade-in" -->
- Face Detection API<!-- .element: class="fragment fade-in" -->
- ...<!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-theme="black" data-background-emoji="🎁"-->
## Wrapping things up

---

<!-- .slide: data-theme="black" data-background-emoji="🐡"-->
### Project Fugu

- Using just web technology<!-- .element: class="fragment fade-in" -->
- Extending the browser capabilites<!-- .element: class="fragment fade-in" -->
- Following core web tenets<!-- .element: class="fragment fade-in" -->
- Running on all platforms<!-- .element: class="fragment fade-in" -->
- ... if supported 🍏<!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-theme="black" data-background-emoji="📃"-->
### Links to get started

<span>💡 [fugu-tracker.web.app](https://fugu-tracker.web.app/) </span> <br /><!-- .element: class="fragment fade-in-then-semi-out" -->
<span>🐡 [howfuguismybrowser.dev](https://howfuguismybrowser.dev/) </span> <br /><!-- .element: class="fragment fade-in" -->
<span>📑 [project-fugu-presentation.netlify.app](https://project-fugu-presentation.netlify.app/) </span> <br /><!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-theme="black" data-background-emoji="🙏" -->
## Thank you

Contact me:

🦋 [bsky](https://bsky.app/profile/arielext.org) <br >
🏢 [Team Rockstars IT](https://www.teamrockstars.nl/) <br >
✉️ [linkedin.com/in/lucien-immink](https://www.linkedin.com/in/lucien-immink/) <br >

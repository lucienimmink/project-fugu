# Project fugu 🐡

<!-- .slide: data-theme="blue" -->

--

> Who has experience with creating cross platform applications?

<div>

> Cordova, Electron, React Native, Capacitor?

</div><!-- .element: class="fragment fade-in" -->

--

> Who has experience with PWAs?

--

## 🤔 What if you could just use the web platform for applications?

---

<!-- .slide: data-theme="calm-green" -->

## Lucien Immink, B.Eng.

--

![Lucien Immink](/assets/lucien-immink.webp)<!-- .element: class="circle" style="max-height: 20vh" -->

Software Architect &</br>
Developer Advocate @ _iO_</br>
</br>
Google Developer Expert <br>
web capabilities

---

## Cross platform development

<!-- .slide: data-theme="calm-pink" -->
--

- Electron<!-- .element: class="fragment fade-in-then-semi-out" -->
- Capacitor<!-- .element: class="fragment fade-in-then-semi-out" -->
- React Native<!-- .element: class="fragment fade-in-then-semi-out" -->
- Phonegap / Cordova<!-- .element: class="fragment fade-in-then-semi-out" -->
- ...<!-- .element: class="fragment fade-in" -->
- web?<!-- .element: class="fragment fade-in" -->

--

![multi-target-cross-platform-development](/assets/multi-target-cross-platform-development.webp)<!-- .element: class="image" -->

--

## PWA

--

![PWA](/assets/PWA.webp)

--

> Progressive Web Apps bring offline and _app-like_ experiences to the web.

---

## Project Fugu

<!-- .slide: data-theme="calm-blue" -->

--

> Microsoft, Samsung, Intel, Electron, Google. That's the big names.

<p> <!-- .element: style="display: flex; align-items: center; gap:1vw; justify-content:center;" -->
  <img src="/assets/thomas-steiner.webp" alt="Thomas Steiner" class="circle" style="max-height: 10vh">
  <span>Thomas Steiner &bull; Google</span>
</p>
--

> The (Chromium) team chose the name because they knew that if they violated the core tenets of the web, the entire project could backfire.

--

- 🤝 Trust
- 🕵️ Privacy <!-- .element: class="fragment fade-in" -->
- 🔒 Security <!-- .element: class="fragment fade-in" -->

--

> Project Fugu APIs act as an abstraction layer between native APIs and the web.

--

![API abstraction](/assets/api-call-abstraction.webp)<!-- .element: class="image" -->

--

![Adding APIs](/assets/adding-apis.webp)<!-- .element: class="image" -->

---

## Some released features

<!-- .slide: data-theme="calm-beige" -->

--

### Async clipboard

<iframe allow="clipboard-read; clipboard-write" style="height: 30vh; width: 100%; border: 0;" title="async-clipboard-text on Glitch" src="https://async-clipboard-text.glitch.me/"></iframe>

<span>💡[Unblocking clipboard access](https://web.dev/async-clipboard/)</span><!-- .element: class="fragment fade-in" -->

--

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

--

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

--

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

--

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

--

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

--

## ... And many more

--

## Some Upcoming features

--

- More filetypes for Async clipboard (audio / video)
- Changing system settings<!-- .element: class="fragment fade-in" -->
- Geofencing<!-- .element: class="fragment fade-in" -->
- Splash screen API<!-- .element: class="fragment fade-in" -->
- Remote desktop control<!-- .element: class="fragment fade-in" -->
- Call dialer/answering/control APIs<!-- .element: class="fragment fade-in" -->
- ...<!-- .element: class="fragment fade-in" -->

---

## Wrapping things up

--

### Project Fugu

- Using just web technology<!-- .element: class="fragment fade-in" -->
- Extending the browser capabilites<!-- .element: class="fragment fade-in" -->
- Following core web tenets<!-- .element: class="fragment fade-in" -->
- Running on all platforms<!-- .element: class="fragment fade-in" -->
- ... if supported 🍏<!-- .element: class="fragment fade-in" -->

---

### Links to get started

<!-- .slide: data-theme="blue" -->

<span>💡 [fugu-tracker.web.app](https://fugu-tracker.web.app/) </span> <br /><!-- .element: class="fragment fade-in-then-semi-out" -->
<span> ![iO logo](/assets/io.svg)<!-- .element: class="icon icon-inline" --> [techhub.iodigital.com](https://techhub.iodigital.com/) </span> <br /><!-- .element: class="fragment fade-in-then-semi-out" -->
<span>🐡 [howfuguismybrowser.dev](https://howfuguismybrowser.dev/) </span> <br /><!-- .element: class="fragment fade-in" -->

---

## Thank you

Contact me:

![iO logo](/assets/io.svg)<!-- .element: class="icon icon-inline" --> [iodigital.com](https://www.iodigital.com) <br />
🏢 [linkedin.com/in/lucien-immink](https://www.linkedin.com/in/lucien-immink/) <br />
🐘 [techhub.social/@lucienimmink](https://techhub.social/@lucienimmink) <br />
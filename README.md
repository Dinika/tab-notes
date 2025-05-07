# Flashcards

This repository contains the source code for the browser extension [Flashcards](https://addons.mozilla.org/addon/flashcards/) which aids memorize notes, words, answers, anything you'd like to memorize using the [flashcards technique](https://en.wikipedia.org/wiki/Flashcard).

It also fetches a new word of the day using the [WordNik api](https://www.wordnik.com/word-of-the-day) to show as a flashcard everyday the extension is used.

The extension is inspired by the really good extension I have used and loved called [FlashTabs](https://chromewebstore.google.com/detail/flashtabs/gcgdbnfebnhdbffnohjibaomkiepmfnb?pli=1).
I wanted to extend it to fetch a word of the day daily for me. At the time of writing, the FlashTabs extension is available in Firefox, Chrome, and Edge so please check it out if you don't need the "word of the day" feature.

## Download extension

- Firefox - https://addons.mozilla.org/addon/flashcards/

## Build environment

This extension is tested and developed in the following environment:

- Operating System - Fedora 40
- Node - version 22.11.0
- npm - version 10.9.0
- RAM - 40 GB

## Building extension (for publishing)

0. If you don't yet have project dependencies installed, please run `npm i` in the root of the project to install everything.
1. Run the `./build.sh` script (in the root of this project) to build the extension.

```bash
./build.sh
```

This script will build the react app, bundle it together with necessary icons, manifest.json etc and **create a zip file called firefox-extension.zip** with all the contents necessary to deploy/publish the extension.

3. Test the extension in Firefox:

- Open `about:debugging#/runtime/this-firefox` in firefox browser (by typing it in the address bar)
- Click "Load Temporary Add-on..." button
- Select the "firefox-extension.zip" file that was created in step 1 above
- If the above steps passed without any issues, you should be able to test this extension by simply opening a new tab! You will see the Home page of the extension and a new word of the day will be fetched.

## Developing

1. Install dependencies:

```bash
npm i
```

2. Start development project:

```bash
npm run dev
```

This will start the project, most likely on port 5173.
Visit http://localhost:5173/ on firefox to test the extension.

## Technologies used

1. [Wordnik API](https://developer.wordnik.com/) to fetch word of the day. If you want to test this functionality please create a (free) Wordnik developer account, and add the API key to this project by following the instructions listed in [the first step of "Developing" section above](#developing).
2. Node - [Installation instructions](https://nodejs.org/en/download)
3. Npm - [Installation instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm) - It is recommended to use [nvm](https://github.com/nvm-sh/nvm) to install and manage npm versions.
4. Javascript dependencies: All these can be installed by running `npm i` in the root of this project.:

- React
- Vite
- React Router

Development dependencies

- TypeScript
- Prettier
- ESLint

## Getting API key from Wordnik

### Why is the API key needed?

While users can add just about any kind of flashcard to this extension, there are some special flashcards that are added automatically everyday this extension is used. These cards show users a new word of the day to help train vocabulary. The wonderful [Wordnik API](https://developer.wordnik.com/) is used to help build this feature.

If you are developing or testing this extension yourself, you'll need to add an API key to query their [word-of-the-day](https://developer.wordnik.com/docs#!/words/getWordOfTheDay) method.

## Creating a release

This action can only be performed by admins.
Currently the extension is only available on Firefox. To create a fresh release that can be uploaded to firefox follow these steps:

1. Update the version in manifest.json (and optionally also in package.json for consistency). [Semver guidelines](https://semver.org/) should be followed.
2. Push the updated version to main branch.
3. Trigger the []"Add-on Release" workflow](https://github.com/Dinika/flashcards/actions/workflows/release.yml) on github. This should generate a new release as a zip file when it succeeds.
4. Upload this zip file to firefox addon.

### Supporting Wordnik

I love Wordnik. They are easy to use, comprehensive, and free. The main reason I wanted to develop this extension is to automate learning a new word everyday and I was surprised by how pricey and in-accessible most word-of-the-day APIs were.
If you find Wordnik useful too, please consider [supporting](https://developer.wordnik.com/support) them.

## Contribution Guidelines ♥️

Thanks for considering contributing to this extension!
Please open an issue in Github to report a bug or request a feature.
To open a PR:

- please add a comment to the relevant issue that you would like to resolve
- Fork this repository
- Make your changes locally
- Open a PR!

In case of any doubts, feel free to e-mail me.

## License

The code and the extension(s) are licensed under GNU GENERAL PUBLIC LICENSE Version 3.

Feel free to clone, modify, fork it but the modified copy of this code MUST be made free and open and should give suitable attributions to the original authors (me - 😇🫣).

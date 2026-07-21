# p5.sound.js

p5.sound.js extends the musical and sonic capabilities of [p5.js](https://p5js.org). It is designed to be a minimal abstraction of the [Tone.js](https://tonejs.github.io/) library with a feature set that is inspired by p5.js's approach to accessible and poetic creative coding. Key functionalities include audio input, sound file playback and manipulation, effects, synthesis and analysis.

## Examples

- A set of p5.sound examples are in this repo at [examples/](examples/)
- The original examples can be found on the p5.js web editor [here](https://editor.p5js.org/thomasjohnmartinez/collections/Dp0zGclVL).  Note that these may differ from the above set.
- Legacy p5.js Sound Tutorial by Dan Shiffman on [YouTube](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6aFcVjlDAkkGIixw70s7jpW)

## Documentation

Interactive documentation can be found at [beta.p5js.org/reference/p5.sound](http://beta.p5js.org/reference/p5.sound)

## Latest Build

- Find the latest official release of p5.sound.js [here](https://github.com/processing/p5.sound.js/releases), and the latest p5.js version 2 [here](https://beta.p5js.org/download/). p5.sound work with both p5.sj version 2 and version 1.
- The p5.sound.js library [here](https://github.com/processing/p5.sound.js) is updated more frequently, and we occasionally offer new [releases](https://github.com/processing/p5.sound.js/releases) before the release cycle of p5.js.

## Contribute

If you would like to contribute to this project, visit https://github.com/processing/p5.js/tree/main/contributor_docs to get started.

If you have any questions or concerns regarding the project, you can reach out to our [Discord](https://discord.gg/HWzy4HpaEJ) and [Gitter](https://gitter.im/processing/p5.js-sound) communities. The p5.js team closely monitors all pull requests and issues on GitHub, so there's no need to also post them on Discord. Additionally, conversations about specific pull requests and issues should take place on GitHub, to ensure that people following along can see and take part in the discussion.

## Dependencies

p5.sound is built using [Tone.js](https://github.com/tonejs/Tone.js), an interactive music framework developed by [Yotam Mann](https://github.com/tambien).

## Library Revision

This repository is an update of the [original p5.sound](https://github.com/processing/p5.js-sound) library (initially authored by [Jason Sigal](https://github.com/therewasaguy)) made with the following goals in mind:

- Code stability and readability
- Updated and fewer dependencies
- Deprecating the least used features
- Greater consistency between classes and methods

The project was started by aarón montoya-moraga ([montoyamoraga](https://github.com/montoyamoraga)) during the 2023 p5.js sound fellowship (read the [announcement](https://medium.com/@ProcessingOrg/announcing-the-2023-p5-sound-fellow-aar%C3%B3n-montoya-moraga-7613450902f6) for more details) and was completed by [Tommy Martinez](https://github.com/ogbabydiesal) in September, 2024.

A changeleog of new and deprecated features in the new library can be viewed ([here](https://docs.google.com/spreadsheets/d/1pL0EVOlRTtfc6kcmK2rd9tZXpZal8FkJKALPb7app28/edit?gid=0#gid=0))

Core contributors:
- Tommy Martinez ([ogbabydiesal](https://github.com/ogbabydiesal))
- aarón montoya-moraga ([montoyamoraga](https://github.com/montoyamoraga))

Project mentors and advisors:
- Kristin Galvin ([blechdom](https://github.com/blechdom))
- Kenneth Lim ([limzykenneth](https://github.com/limzykenneth))
- Rachel Lim ([raclim](https://github.com/raclim))
- Yotam Mann ([tambien](https://github.com/tambien))
- Dave Pagurek ([davepagurek](https://github.com/davepagurek))
- Luisa Peirera ([luisaph](https://github.com/luisaph))
- Jason Sigal ([therewasaguy](https://github.com/therewasaguy))
- Cassie Tarakajian ([catarak](https://github.com/catarak))
- Qianqian Ye ([Qianqianye](https://github.com/Qianqianye))

## Sound Assets

The audio files in [`sounds/`](./sounds) are dedicated to the public domain 
under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) — 
see [`sounds/LICENSE`](./sounds/LICENSE) for performer credits and full details.

## Usage

To use this library, make sure you have p5.js installed. Visit the [p5.js website](https://p5js.org/) for more information and installation instructions.

Please let us know if you find any bugs or issues by creating a new issue in this repo!

## Building the Library

installing the dependencies
```
npm install
```

building the library
```
npm run build
```

building reference pages (optional)
```
npx yuidoc .
```

### Release process

This section is for maintainers with npm credentials.

```sh
npm install
npm run build
npm version x.y.z
git push
git push --tags
npm publish
```

## Testing the examples

The library is configured to use [Playwright](https://playwright.dev/) to automatically test the [local](./examples) and [web-editor-hosted](https://editor.p5js.org/thomasjohnmartinez/collections/Dp0zGclVL) sets of p5.sound.js examples by automatically controlling a browser (firefox or chromium).

If you haven't used Playwright on your system before, you'll have to run the following command _once_ to allow it to download the browsers it uses:

### Setting up playwright
```bash
npx playwright install
```

### Starting the tests
1. Launch playwright's test-runner UI: 
```bash
npm run test:integration:ui
```

2. Choose example set(s) and browser(s)
From the GUI, click "projects" and choose which examples ("web-" and/or "local-") and which browsers ("chromium" and/or "firefox") you wish to test.

3. Run the tests!
click the green play button at the top of the list of tests.

If a test fails, you can inspect its console log, the test actions, and even screenshots of what it looked like while it was running.

There are also various other ways to run the tests automatically without any interaction.  

For more information, read [tests/integration/about-these-tests.md](tests/integration/about-these-tests.md)

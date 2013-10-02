## Ember Falling Bricks

Fun little JS game written in idiomatic
[Ember.js](http://www.emberjs.com), built with 
[Ember App Kit](https://github.com/stefanpenner/ember-app-kit).

The game can be played
[here](https://machty.s3.amazonaws.com/ember-falling-blocks/index.html).

![screenshot](http://f.cl.ly/items/1Y2P2V0C2T2M3y071A1Y/fallingblocks-small.jpg)

## Building

Clone this repo, `cd` in the new directory, then:

    npm install
 
To run a local server:

    grunt server

To build for deployment:

    grunt build:dist

## Perf TODOs

- Defer DOM manipulation to request animation frame rather than in the
  click handler.
- Get rid of relayouts


Feedhenry Studio
----------------  
Implementation in Node using Express.JS, templating and FHC.

## Installation: 
All that's required to run this is NodeJS - packages.json looks after all dependencies.:

    $ git clone git@github.com:feedhenry/fh-studio.git
    $ cd fh-studio
    $ npm install -d
    $ fhc target http://somewhere.feedhenry.com
    $ node server.js 
    $ open http://0.0.0.0:3000/
    
//TODO: At present, the DustJS module needs to have this line removed to work with node 0.6:  
lib/server.js:6 require.paths.unshift(path.join(__dirname, '..'));  
After making changes to any templates, run 'jake ct' to compile the templates.

## Important Resources & Reading  
Here's a collection of docs pages on the libraries and packages used in fh-studio  
* [Express.JS Guide - getting started with Express, the tool used to build our API in fh-studio - see routing.](http://expressjs.com/guide.html)  
* [Ace Editor Embed Guide - Intro to the Ace API, the editor used](https://github.com/ajaxorg/ace/wiki/Embedding---API)  
* [Twitter Bootstrap - HTML & CSS boilerplate being used here](http://twitter.github.com/bootstrap/)  
* [History.js - state tracking using HTML5 pushState with hash-bang fallback.](https://github.com/balupton/History.js/)  
  
 
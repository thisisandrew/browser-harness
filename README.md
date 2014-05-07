browser-harness
===============

Visualise multiple screens resolutions at once on a page (iframes and joy :))

##Install
Run the index.html from a Web Server. Running index.html locally will load all the iframes but they won't be usable.

##Configure
Screen resolution are stored as an array of configuration objects. You can add/remove/disable them by changing the `screens` array.
Find more resolutions here: http://en.wikipedia.org/wiki/List_of_displays_by_pixel_density

###Rendering Screen Resolutions
Each configuration object includes the actual pixels for a given screen/device. They also include the DPR (device-pixel-ratio) which can be used to determine how many css pixels are actually useful. FYI the iframes are sized by dividing 100/DPR. 

Try reporting the `window.clientWidth` in a phone's browser and notice you aren't getting all 1920px to play with.

If the site you are testing has the viewport set `<meta name="viewport" content="width=device-width, user-scalable=no">` and uses CSS media queries for responsive designs then you will see some beautiful results in the iframes.

##Usage
    <webserver>/#url=<any-website-you-like>

e.g. http://localhost/#url=http://www.mywebsite.com
e.g. http://localhost/#url=http://www.microsoft.com

##Deployed Example
http://thisisandrew.github.io/browser-harness/#url=http://www.microsoft.com
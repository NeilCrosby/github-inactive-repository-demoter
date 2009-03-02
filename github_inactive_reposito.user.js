// ==UserScript==
// @name           GitHub Inactive Repository Demoter
// @namespace      http://projects.thecodetrain.co.uk
// @description    Visually demotes inactive repositories on a user's page on GitHub
// @include        http://github.com/*
// ==/UserScript==

var elsProjectsList = document.getElementsByClassName('projects');

if (elsProjectsList && elsProjectsList.length > 0) {
    var elsProjects = elsProjectsList[0].getElementsByTagName('li');

    var elDemotedHeading = null;
    var elsDemoted = null;

    for ( var i=0,len=elsProjects.length; i < len; i++) {
        var elsDate = elsProjects[i].getElementsByClassName('relatize');
        if (elsDate && elsDate.length > 0) {
            var dateBits = elsDate[0].title.split(/[-: ]/);

            var projDate = new Date(dateBits[0],dateBits[1] - 1,dateBits[2],dateBits[3],dateBits[4],dateBits[5]);
            var nowDate  = new Date();
        
            var diffDate = nowDate - projDate;
        
            // more than 30 days since the last update?
            if ( diffDate > 1000 * 60 * 60 * 24 * 30) {
                if ( null === elDemotedHeading ) {
                    // It's an h1 because GitHub uses h1s all over the shop,
                    // and I've just looking for some visual consistency here.
                    elDemotedHeading = document.createElement('h1');
                    elDemotedHeading.appendChild(document.createTextNode('Not touched in the last month'));
                    elsProjectsList[0].parentNode.appendChild(elDemotedHeading);

                    elsDemoted = document.createElement('ul');
                    elsDemoted.className = 'projects';
                    elsProjectsList[0].parentNode.appendChild(elsDemoted);
                }
                
                // because we're removing something from the original 
                // "elsProjects" list, it gets shorter, and we need to reduce
                // the counter "i" to compensate.
                elsDemoted.appendChild(elsProjects[i]);
                i--;
            }
        
        }
    }
}

var dashboardController,
    renderer = require("../util"),
    util = require("util"),
    fhc = require("../fh-module");

dashboardController = {
    loadDash:function (req, res, next) {

        fhc.apps.list(req.session, function (err, data) { // TODO: Sort this response by date mod'd
            if (err) {
                renderer.doError(res, req, "Couldn't generate apps listing");
                return;
            }
            var d = {
                tpl:'dashboard',
                apps:data.list,
                blogposts: [
                  {
                    title: 'Launched to the app store',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae dui sit amet eros aliquam feugiat. Duis mollis arcu nec neque tempus congue. Aenean metus metus, consectetur quis blandit eget, hendrerit quis neque',
                    link: 'http://developer.feedhenry.com/blog'
                      
                  },
                  {
                    title: 'New App Launched',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae dui sit amet eros aliquam feugiat. Duis mollis arcu nec neque tempus congue. Aenean metus metus, consectetur quis blandit eget, hendrerit quis neque',
                    link: 'http://developer.feedhenry.com/blog'
                  },
                  {
                    title: '@FH Twitter',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae dui sit amet eros aliquam feugiat. Duis mollis arcu nec neque tempus congue. Aenean metus metus, consectetur quis blandit eget, hendrerit quis neque',
                    link: 'http://developer.feedhenry.com/blog'
                  },
                  {
                    title: 'iOS 5',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae dui sit amet eros aliquam feugiat. Duis mollis arcu nec neque tempus congue. Aenean metus metus, consectetur quis blandit eget, hendrerit quis neque',
                    link: 'http://developer.feedhenry.com/blog'
                  }
                ],
                videos: [
                  {
                    id: '34675315'
                  },
                  {
                    id: '34543498'
                  }
                ],
                templates: [
                 {
                   url: 'http://apps.feedhenry.com/box/srv/1.1/wid/apps/studio/mPltCaOT38dKmnBcGfz4tDKk/container',
                   title: 'App Anatomy'
                 },
                 {
                   url: 'http://apps.feedhenry.com/box/srv/1.1/wid/apps/studio/mPltCaOT38dKmnBcGfz4tDKk/container', // todo wrong
                   title: 'Multilingual Tutorial'
                 },
                 {
                   url: 'http://apps.feedhenry.com/box/srv/1.1/wid/apps/studio/mPltCaOT38dKmnBcGfz4tDKk/container',
                   title: 'Mash Hash Cache'
                 }
                ],
                title:'Dashboard'
                //previewUrl: "http://" + req.session.domain + ".feedhenry.com/box/srv/1.1/wid/" + req.session.domain + "/studio/" + id + "/container"
            };
            renderer.doResponse(req, res, d);  
            
        });
    }
};


module.exports = dashboardController;
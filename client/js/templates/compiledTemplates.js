(function(){dust.register("filestree",body_0);function body_0(chk,ctx){return chk.write("<input type=\"hidden\" value=\"").reference(ctx.get("filesTree"),ctx,"h").write("\" name=\"filestree\" /><div id=\"treeSearch\" class=\"pull-left\"><input type=\"search\" placeholder=\"").reference(ctx.getPath(false,["lang","search"]),ctx,"h").write("\"></input><ul class=\"tabs editorTabs\"><li class=\"active\"><a class=\"no-ajax\" data-toggle=\"tab\" href=\"#navigator\">").reference(ctx.getPath(false,["lang","navigator"]),ctx,"h").write("</a></li><li class=\"\"><a data-toggle=\"tab\" href=\"#snippets\" class=\"no-ajax\">").reference(ctx.getPath(false,["lang","snippets"]),ctx,"h").write("</a></li></ul></div><div class=\"tab-content\"><div class=\"tab-pane active\" id=\"navigator\"><div id=\"treeContainer\" class=\"pull-left\"></div></div><div class=\"tab-pane\" id=\"snippets\">").reference(ctx.getPath(false,["lang","someSnippets"]),ctx,"h").write("</div></div>");}return body_0;})();(function(){dust.register("myprefs",body_0);function body_0(chk,ctx){return chk.partial("head",ctx).partial("navigation",ctx).write("<div class=\"content fullWidth\"><h2>").reference(ctx.getPath(false,["lang","prefs"]),ctx,"h").write("</h2><footer><p>© Feedhenry 2011 | <span class=\"label success\"><a href=\"http://www.feedhenrystatus.com\">").reference(ctx.getPath(false,["lang","serviceStatus"]),ctx,"h").write(": OK</a></span> </p></footer></div>").partial("foot",ctx);}return body_0;})();(function(){dust.register("login",body_0);function body_0(chk,ctx){return chk.partial("head",ctx).write("<div class=\"content login\"><div id=\"logo\"><img src=\"/images/logo.png\" /></div><br /><br /><div class=\"hero-unit\"><p>").reference(ctx.getPath(false,["lang","login_message"]),ctx,"h").write("</p><form action=\"/login\" method=\"post\"><fieldset><input placeholder=\"").reference(ctx.getPath(false,["lang","email"]),ctx,"h").write("\" name=\"username\" id=\"login_email\" type=\"text\"><input placeholder=\"").reference(ctx.getPath(false,["lang","password"]),ctx,"h").write("\" name=\"password\" id=\"login_password\" type=\"password\"></fieldset><p><button class=\"btn primary large\" type=\"submit\">").reference(ctx.getPath(false,["lang","login"]),ctx,"h").write("</button>&nbsp;<a id=\"forgot\" href=\"forgot.html\" class=\"large\">").reference(ctx.getPath(false,["lang","forgotPassword"]),ctx,"h").write("</a></p></form></div><!-- /hero-unit --></div>").partial("foot",ctx);}return body_0;})();(function(){dust.register("home",body_0);function body_0(chk,ctx){return chk.write("<script type=\"text/javascript\">$('.tabs').tab();// TODO: Switch to BS2's new show() tabbing functionfunction switchTab(id){$(\"#\" + id + \"Link\").click();}</script>").partial("navigation",ctx).write("<div id=\"container dashboard\" class=\"container\"><!-- Main hero unit for a primary marketing message or call to action --><ul class=\"tabs toptabs\" data-tabs=\"tabs\"><li class=\"active\"><a href=\"#welcome\" data-toggle=\"tab\" class=\"no-ajax\">").reference(ctx.getPath(false,["lang","welcome"]),ctx,"h").write("</a></li><li><a id=\"studioLink\" href=\"#studio\" data-toggle=\"tab\" class=\"no-ajax\">").reference(ctx.getPath(false,["lang","appStudio"]),ctx,"h").write("</a></li><li><a id=\"installingLink\" href=\"#installing\" data-toggle=\"tab\" class=\"no-ajax\">").reference(ctx.getPath(false,["lang","installing"]),ctx,"h").write(" FHC</a></li><li><a href=\"#staging\" data-toggle=\"tab\" class=\"no-ajax\">").reference(ctx.getPath(false,["lang","stagingTo"]),ctx,"h").write("</a></li></ul><div class=\"hero-unit tab-content\"><div id=\"welcome\" class=\"row tab-pane active\"><div class=\"span7\"><h2>").reference(ctx.getPath(false,["lang","homeHeading"]),ctx,"h").write("</h2><p>").reference(ctx.getPath(false,["lang","studioIntro"]),ctx,"h").write("</p><br /><p><a href=\"#installing\" class=\"btn primary large no-ajax\" onclick=\"switchTab('installing')\">").reference(ctx.getPath(false,["lang","getStarted"]),ctx,"h").reference(ctx.getPath(false,["lang","cli"]),ctx,"h").write(" &raquo;</a></p></div><div class=\"span7 video\"><iframe class=\"vimeo\" src=\"http://player.vimeo.com/video/34086215\" width=\"400\" height=\"225\" frameborder=\"0\" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div></div><div id=\"installing\" class=\"tab-pane row\"><div class=\"span7\"><h2>Installing FHC</h2><p>The FHC command line utility gives access to the entire FeedHenry suite through your command line. It's a NodeJS utility which allows you to quickly get started staging your apps to Cloud Foundry.</p><pre class=\"code\">$ sudo npm install -g fh-fhc$ fhc -v$ fhc target mobilecf.feedhenry.com$ fhc login demo@example.com password$ fhc apps╔═════════════════╤═══════════╤═══════════════════╗║  ID             │ Title     │Description        ║╠═════════════════╪═══════════╪═══════════════════╣║  dttK1K42_y...  │ First App │Simple store finder║╚═════════════════╧═══════════╧═══════════════════╝</pre></div><div class=\"span7 video\"><!--<iframe class=\"vimeo\" src=\"http://player.vimeo.com/video/33966777?title=0&amp;byline=0&amp;portrait=0\" width=\"400\" height=\"225\" frameborder=\"0\" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>--></div></div><div id=\"staging\" class=\"tab-pane row\"><div class=\"span7\"><h2>Staging your first app to Cloud Foundry</h2><p>Learn how to stage an app you've created to public Cloud Foundry.We start with in app in GitHub, add it to the FeedHenry platform then stage it's server side to Cloud Foundry.</p></div><div class=\"span7 video\"><iframe class=\"vimeo\" src=\"http://player.vimeo.com/video/34086439?title=0&amp;byline=0&amp;portrait=0\" width=\"400\" height=\"225\" frameborder=\"0\" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div></div><div id=\"studio\" class=\"tab-pane row\"><div class=\"span7\"><h2>App Studio</h2><p>Learn about the FeedHenry App Studio.This powerful web-based tool allows you to build and manage your app portfolio.</p><br /><p><a href=\"login.html\" class=\"btn primary large no-ajax\">Get Started Now! &raquo;</a></p></div><div class=\"span7 video\"><!--<iframe class=\"vimeo\" src=\"http://player.vimeo.com/video/34513716?title=0&amp;byline=0&amp;portrait=0\" width=\"400\" height=\"225\" frameborder=\"0\" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>--></div></div></div><!-- Example row of columns --><div class=\"tab-pane row docs\"><div class=\"span6\"><h2>").reference(ctx.getPath(false,["lang","cliDocs"]),ctx,"h").write("</h2><p>").reference(ctx.getPath(false,["lang","cliText"]),ctx,"h").write("</p><p><a class=\"btn\" href=\"http://docs.feedhenry.com/fhc\">").reference(ctx.getPath(false,["lang","readCliDocs"]),ctx,"h").write(" &raquo;</a></p></div><div class=\"span5\"><h2>").reference(ctx.getPath(false,["lang","tutorials"]),ctx,"h").write("</h2><p>").reference(ctx.getPath(false,["lang","tutorialsText"]),ctx,"h").write("</p><p><a class=\"btn\" href=\"http://docs.feedhenry.com/tutorials\">").reference(ctx.getPath(false,["lang","viewTutorials"]),ctx,"h").write(" &raquo;</a></p></div><div class=\"span5\"><h2>").reference(ctx.getPath(false,["lang","apiDocs"]),ctx,"h").write("</h2><p>").reference(ctx.getPath(false,["lang","apiText"]),ctx,"h").write("</p><p><a class=\"btn\" href=\"http://docs.feedhenry.com/api\">").reference(ctx.getPath(false,["lang","readApiDocs"]),ctx,"h").write(" &raquo;</a></p></div></div></div>");}return body_0;})();(function(){dust.register("appbar",body_0);function body_0(chk,ctx){return chk.write("<div class=\"appBar pull-left\"> <!-- Gets topbar-inner as this makes it black like bootstrap nav --><ul><li id=\"dashboardLink\" class=\"\"><a class=\"singlepage\"  href=\"/app/").reference(ctx.get("appId"),ctx,"h").write("\"><span>").reference(ctx.getPath(false,["lang","appDashboard"]),ctx,"h").write("</span></a></li><li id=\"editorLink\" class=\"\"><a class=\"singlepage\" href=\"/app/").reference(ctx.get("appId"),ctx,"h").write("/editor\"><span>").reference(ctx.getPath(false,["lang","editor"]),ctx,"h").write("</span></a></li><li id=\"previewLink\" class=\"\"><a class=\"singlepage\"  href=\"/app/").reference(ctx.get("appId"),ctx,"h").write("/preview\"><span>").reference(ctx.getPath(false,["lang","preview"]),ctx,"h").write("</span></a></li><li id=\"buildLink\" class=\"\"><a class=\"singlepage\"  href=\"/app/").reference(ctx.get("appId"),ctx,"h").write("/build\"><span>").reference(ctx.getPath(false,["lang","build"]),ctx,"h").write("</span></a></li><li id=\"debugLink\" class=\"\"><a class=\"singlepage\"  href=\"/app/").reference(ctx.get("appId"),ctx,"h").write("/debug\"><span>").reference(ctx.getPath(false,["lang","debug"]),ctx,"h").write("</span></a></li><li id=\"prefsLink\" class=\"\"><a class=\"singlepage\"  href=\"/app/").reference(ctx.get("appId"),ctx,"h").write("/prefs\"><span>").reference(ctx.getPath(false,["lang","prefs"]),ctx,"h").write("</span></a></li></ul></div>").reference(ctx.get("filesTreeHelper"),ctx,"h");}return body_0;})();(function(){dust.register("userdashboard",body_0);function body_0(chk,ctx){return chk.partial("head",ctx).partial("navigation",ctx).write("<script>$(\".recent\").tablesorter();</script><script>function showHide(id){$('#apiDocs').hide();if (id==\"clientLink\"){$('#cloudLink').show('fast');$('#client').show('fast');$('#cloud').hide('fast');} else {$('#clientLink').show('fast');$('#cloud').show('fast');$('#client').hide('fast');}return false;}function hideApis(){$('#apiDocs').show();$('#clientLink').show('fast');$('#cloudLink').show('fast');$('#client').hide('fast');$('#cloud').hide('fast');return false;}</script><div id=\"container dashboard\" class=\"container userdash\">").reference(ctx.get("tabHelper"),ctx,"h").write("<h2>My Dashboard</h2><div class=\"row\"> <!-- Begin Bootstrap Row --><div id=\"recentApps\" class=\"span5 content\"><h3>Recent Apps</h3><table class=\"recent\"><thead class=\"hidden\"><tr><th class=\"header headerSortDown\">Modified</th></tr></thead><tbody>").reference(ctx.get("data"),ctx,"h").section(ctx.get("apps"),ctx,{"block":body_1},null).write("</tbody></table></div><div id=\"blogPosts\"  class=\"span7 content\"><h3>Developer Blog</h3><div class=\"post\"><h4>New App Launched</h4><p>Launched to App Store...blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah </p></div><div class=\"post\"><h4>@FH Twitter</h4><p>Launched to App Store...blah blah blah blah blah </p></div><div class=\"post\"><h4>Hello World</h4><p>Launched to App Store...blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah  </p></div><div class=\"post\"><h4>iOS 5.0</h4><p>Launched to App Store...blah blah blah blah blah </p></div><div class=\"post\"><h4>Android 4.0 Launch</h4><p>Launched to App Store...blah blah blah blah blah </p></div><div class=\"post\"><h4>App Anatomy - New Stuff</h4><p>Launched to App Store...blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah </p></div></div> <div id=\"apis\" class=\"span12 content\"> <!-- BEGIN API DOCS --><h3>").reference(ctx.getPath(false,["lang","apiPrefix"]),ctx,"h").write(".api Documents</h3><ul><li><a id=\"clientLink\"  onClick=\"showHide('clientLink')\">Client APIs</a></li><li><a id=\"cloudLink\"   onClick=\"showHide('cloudLink')\">Cloud APIs</a></li><li><a id=\"hideLink\"    onClick=\"hideApis()\">Hide APIs</a></li></ul><div id=\"apiDocs\"><p align=\"justify\">").reference(ctx.getPath(false,["lang","studioName"]),ctx,"h").write(" provides a JavaScript API to access functionality on handsets and on the cloud in a cross-platform way. By abstracting-out the platform-specific implementations, you can build apps which work across a wide range of platforms and can also access powerful server-side functionality.<br/><br/><strong>Using the API: </strong>The FeedHenry JavaScript API is provided in the $fh namespace and uses a common convention for most functions, which takes the format: <pre align=\"center\">$fh.doSomething( parameterObject, successFunction, failureFunction )</pre>where parameterObject is an ordinary JavaScript object. The successFunction callback is called if the operation was successful and the failureFunction callback is called if the operation fails. All of these arguments are optional. If there is only one function, it is taken as the success function.For a quick reference of which On Device APIs are available on each platform please check out the Device Support Matrix</p></div><div id=\"client\" style=\"display:none\"><ul>        <li><a href=\"#\" id=\"1012276\">").reference(ctx.getPath(false,["lang","apiAcc"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015103\">").reference(ctx.getPath(false,["lang","apiAct"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015118\">").reference(ctx.getPath(false,["lang","apiAudio"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1099663\">").reference(ctx.getPath(false,["lang","apiCamera"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015134\">").reference(ctx.getPath(false,["lang","apiContacts"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015153\">").reference(ctx.getPath(false,["lang","apiDep"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1099591\">").reference(ctx.getPath(false,["lang","apiFile"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015187\">").reference(ctx.getPath(false,["lang","apiGeolocation"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015177\">").reference(ctx.getPath(false,["lang","apiGeoIP"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015167\">").reference(ctx.getPath(false,["lang","apiHashing"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1019188\">").reference(ctx.getPath(false,["lang","apiHandlers"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1363666\">").reference(ctx.getPath(false,["lang","apiLocalStorage"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015203\">").reference(ctx.getPath(false,["lang","apiLogging"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015207\">").reference(ctx.getPath(false,["lang","apiMapping"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015212\">").reference(ctx.getPath(false,["lang","apiMessaging"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015214\">").reference(ctx.getPath(false,["lang","apiNotification"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1298299\">").reference(ctx.getPath(false,["lang","apiOrientation"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015244\">").reference(ctx.getPath(false,["lang","apiReady"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1019111\">").reference(ctx.getPath(false,["lang","apiSecurity"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015261\">").reference(ctx.getPath(false,["lang","apiWebRequests"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1336195\">").reference(ctx.getPath(false,["lang","apiWebView"]),ctx,"h").write("</a></li></ul></div><div id=\"cloud\" style=\"display:none\"><ul><li><a id=\"1015127\" class=\"snippet\" href=\"#\">").reference(ctx.getPath(false,["lang","apiCache"]),ctx,"h").write("</a></li><li><a id=\"1015127\" class=\"snippet\" href=\"#\">").reference(ctx.getPath(false,["lang","apiDataStorage"]),ctx,"h").write("</a></li><li><a id=\"1015166\" href=\"#\">").reference(ctx.getPath(false,["lang","apiHashing"]),ctx,"h").write("</a></li><li><a id=\"1015203\" href=\"#\">").reference(ctx.getPath(false,["lang","apiCloudLogging"]),ctx,"h").write("</a></li><li><a id=\"1015224\" href=\"#\">").reference(ctx.getPath(false,["lang","apiParsing"]),ctx,"h").write("</a></li><li><a id=\"1015231\" href=\"#\">").reference(ctx.getPath(false,["lang","apiRSS"]),ctx,"h").write("</a></li><li><a id=\"1019114\" href=\"#\">").reference(ctx.getPath(false,["lang","apiCloudSecurity"]),ctx,"h").write("</a></li><li><a id=\"1015247\" href=\"#\">").reference(ctx.getPath(false,["lang","apiStringify"]),ctx,"h").write("</a></li><li><a id=\"1015266\" href=\"#\">").reference(ctx.getPath(false,["lang","apiCloudWebRequests"]),ctx,"h").write("</a></li></ul></div></div> <!-- END API DOCS --><div id=\"vimeoFeed\" class=\"span12 content\"> <!-- BEGIN VIMEO FEED --><div id=\"stats\"><h3></h3><div style=\"clear: both;\"></div></div><div id=\"embed\"></div><div id=\"thumbs\"><h4>More Videos By FeedHenry</h4><ul id=\"videoList\"</ul></div></div> <!-- END VIMEO FEED --></div> <!-- End Bootstrap Row --><script> $('.header').click();$(function() {client.studio.dashboard.init();});</script><footer><p>© ").reference(ctx.getPath(false,["lang","studioName"]),ctx,"h").write(" 2011 | <span class=\"label success\"><a href=\"http://www.feedhenrystatus.com\">").reference(ctx.getPath(false,["lang","serviceStatus"]),ctx,"h").write(": OK</a></span> </p></footer></div>").partial("foot",ctx);}function body_1(chk,ctx){return chk.write("<tr><td><p><img src=\"https://demo2.feedhenry.com/static/i/demo2/qPPXQrMk8cK5a2ac3cKHInWb/studio/46/small.png\"><a class=\"singlepage\" href=\"/app/").reference(ctx.get("id"),ctx,"h").write("\">").reference(ctx.get("title"),ctx,"h").write("</a></p><p><strong>Modified:</strong> ").reference(ctx.get("modified"),ctx,"h").write("</p><p><strong>Description:</strong> ").reference(ctx.get("description"),ctx,"h").write("</p></td></tr>");}return body_0;})();(function(){dust.register("apps",body_0);function body_0(chk,ctx){return chk.partial("head",ctx).partial("navigation",ctx).write("<script>$(\"table.apps\").tablesorter();</script><div class=\"content apps fullWidth\">").reference(ctx.get("tabHelper"),ctx,"h").write("<h2>").reference(ctx.getPath(false,["lang","myapps"]),ctx,"h").write("</h2><table class=\"apps table\"><colgroup><col class=\"icon\"><col class=\"title\"><col class=\"desc\"><col class=\"modified\"><col class=\"version\"></colgroup><thead><tr><th class=\"header\"></th><th class=\"header headerSortDown\">").reference(ctx.getPath(false,["lang","name"]),ctx,"h").write("</th><th class=\"header\">").reference(ctx.getPath(false,["lang","description"]),ctx,"h").write("</th><th class=\"header\">").reference(ctx.getPath(false,["lang","modified"]),ctx,"h").write("</th><th class=\"header\">").reference(ctx.getPath(false,["lang","version"]),ctx,"h").write("</th></tr></thead><tbody>").reference(ctx.get("data"),ctx,"h").section(ctx.get("apps"),ctx,{"block":body_1},null).write("</tbody></table><footer><p>© ").reference(ctx.getPath(false,["lang","studioName"]),ctx,"h").write(" 2011 | <span class=\"label success\"><a href=\"http://www.feedhenrystatus.com\">").reference(ctx.getPath(false,["lang","serviceStatus"]),ctx,"h").write(": OK</a></span> </p></footer></div>").partial("foot",ctx);}function body_1(chk,ctx){return chk.write("<tr><td><img src=\"https://").reference(ctx.get("domain"),ctx,"h").write(".feedhenry.com/static/i/").reference(ctx.get("domain"),ctx,"h").write("/").reference(ctx.get("id"),ctx,"h").write("/studio/46/small.png\"></td><td><a class=\"singlepage\" href=\"/app/").reference(ctx.get("id"),ctx,"h").write("\">").reference(ctx.get("title"),ctx,"h").write("</a></td><td>").reference(ctx.get("description"),ctx,"h").write("</td><td>").reference(ctx.get("modified"),ctx,"h").write("</td><td>").reference(ctx.get("version"),ctx,"h").write("</td></tr>");}return body_0;})();(function(){dust.register("head",body_0);function body_0(chk,ctx){return chk.write("<div class=\"fluid-container\">");}return body_0;})();(function(){dust.register("app",body_0);function body_0(chk,ctx){return chk.partial("head",ctx).partial("navigation",ctx).write("<!-- This is the tab bar along the side -->").reference(ctx.get("renderAppBar"),ctx,"h").write("<div class=\"content app  ").reference(ctx.get("tab"),ctx,"h").write("\" style=\"min-height:900px;\">").reference(ctx.get("tabLayoutHelper"),ctx,"h").write("</div>").partial("foot",ctx).partial("footer",ctx).write(" <!-- TODO - Move footer out into some place more generic - do we even need one? -->");}return body_0;})();(function(){dust.register("foot",body_0);function body_0(chk,ctx){return chk.write("</div> <!-- Close fluid-container -->");}return body_0;})();(function(){dust.register("footer",body_0);function body_0(chk,ctx){return chk.write("<footer><p>&copy; ").reference(ctx.getPath(false,["lang","studioName"]),ctx,"h").write(" 2011 | <span class=\"label success\"><a href=\"http://www.feedhenrystatus.com\">").reference(ctx.getPath(false,["lang","serviceStatus"]),ctx,"h").write(" : OK</a></span> </p></footer>");}return body_0;})();(function(){dust.register("navigation",body_0);function body_0(chk,ctx){return chk.write("<div class=\"navbar navbar-fixed\"><div class=\"navbar-inner\"><div class=\"container\"><img class=\"logo\" src=\"/images/logo-small.png\" alt=\"Feedhenry Logo\"><ul class=\"nav studioNav\"><li class=\"dropdown\"><a class=\"brand dropdown-toggle no-ajax\" data-toggle=\"dropdown\" href=\"#\">studio</a><ul class=\"dropdown-menu\"><li><a class=\"brand\" href=\"/\">").reference(ctx.getPath(false,["lang","dashboard"]),ctx,"h").write("</a></li><li><a class=\"brand\" href=\"/apps\">").reference(ctx.getPath(false,["lang","appStudio"]),ctx,"h").write("</a></li><li><a class=\"brand\" href=\"/reporting\">").reference(ctx.getPath(false,["lang","reporting"]),ctx,"h").write("</a></li><li><a class=\"brand\" href=\"/admin\">").reference(ctx.getPath(false,["lang","admin"]),ctx,"h").write("</a></li></ul></li>").reference(ctx.get("navigationHelper"),ctx,"h").write("</ul>").exists(ctx.get("user"),ctx,{"else":body_1,"block":body_2},null).write("</div></div></div>");}function body_1(chk,ctx){return chk.write("<form action=\"/login\" method=\"post\" class=\"pull-right form-inline\"><input name=\"username\" class=\"input-small\" type=\"text\" placeholder=\"").reference(ctx.getPath(false,["lang","email"]),ctx,"h").write("\"><input name=\"password\" class=\"input-small\" type=\"password\" placeholder=\"").reference(ctx.getPath(false,["lang","password"]),ctx,"h").write("\"><button class=\"btn\" type=\"submit\">").reference(ctx.getPath(false,["lang","login"]),ctx,"h").write("</button></form>");}function body_2(chk,ctx){return chk.write("<p class=\"pull-right\"><a href=\"#\">").reference(ctx.getPath(false,["user","username"]),ctx,"h").write(" (").reference(ctx.getPath(false,["user","role"]),ctx,"h").write(")</a> |<a href=\"/help\">").reference(ctx.getPath(false,["lang","help"]),ctx,"h").write("</a> |<a href=\"/prefs\">").reference(ctx.getPath(false,["lang","prefs"]),ctx,"h").write("</a> |<a href=\"/logout\">").reference(ctx.getPath(false,["lang","logout"]),ctx,"h").write("</a></p>");}return body_0;})();(function(){dust.register("app/dashboard",body_0);function body_0(chk,ctx){return chk.write("<section class=\"preview dashboardPreview pull-right\"><h2>").reference(ctx.getPath(false,["lang","preview"]),ctx,"h").write("</h2><div class=\"previewContainer iPhone\" style=\" width: 640px; -webkit-transform: scale(0.4); -webkit-transform-origin: 0 0;\"><iframe src=\"").reference(ctx.get("previewUrl"),ctx,"h").write("\" frameborder=\"0\"></iframe></div></section><section class=\"summary\"><h2>").reference(ctx.getPath(false,["data","inst","title"]),ctx,"h").write("</h2><br /><p>").reference(ctx.getPath(false,["data","inst","description"]),ctx,"h").write("</p><h3>").reference(ctx.getPath(false,["lang","moreInfo"]),ctx,"h").write("</h3><strong>").reference(ctx.getPath(false,["lang","w3cid"]),ctx,"h").write(":</strong> ").reference(ctx.getPath(false,["data","app","w3cid"]),ctx,"h").write("<br /><strong>").reference(ctx.getPath(false,["lang","guid"]),ctx,"h").write(":</strong> ").reference(ctx.get("appId"),ctx,"h").write("<br /><strong>").reference(ctx.getPath(false,["lang","height"]),ctx,"h").write(":</strong>").reference(ctx.get("appId"),ctx,"h").write("<br /><strong>").reference(ctx.getPath(false,["lang","width"]),ctx,"h").write(":</strong> ").reference(ctx.get("appId"),ctx,"h").write("<br /></section><section class=\"qrcode\"><h2>").reference(ctx.getPath(false,["lang","previewOnMobile"]),ctx,"h").write("</h2> <span class=\"qrcode_url\">").reference(ctx.get("previewUrl"),ctx,"h").write("</span><span class=\"qrcode_placeholder\"><img src=\"http://chart.apis.google.com/chart?cht=qr&chs=200x200&choe=UTF-8&chld=H&chl=").reference(ctx.get("previewUrl"),ctx,"h").write("\" /></span></section>");}return body_0;})();(function(){dust.register("app/debug",body_0);function body_0(chk,ctx){return chk.write("<h1>").reference(ctx.getPath(false,["lang","debug"]),ctx,"h").write("</h1>");}return body_0;})();(function(){dust.register("app/prefs",body_0);function body_0(chk,ctx){return chk.write("<h1>").reference(ctx.getPath(false,["lang","prefs"]),ctx,"h").write("</h1>");}return body_0;})();(function(){dust.register("app/editor",body_0);function body_0(chk,ctx){return chk.write("<!-- inject some file contents into the DOM on first rendering this page - these will be destroyed by the clientside JS --><input type=\"hidden\" id=\"appId\" value=\"").reference(ctx.get("appId"),ctx,"h").write("\"></input>").reference(ctx.get("fileContents"),ctx,"h").section(ctx.get("fileContents"),ctx,{"else":body_1,"block":body_2},null).write("<ul class=\"tabs editorTabs\"></ul><div class=\"tab-content\"></div><script src=\"/js/lib/ace/ace-uncompressed.js\" type=\"text/javascript\" charset=\"utf-8\"></script><script src=\"/js/lib/ace/theme-cobalt.js\" type=\"text/javascript\" charset=\"utf-8\"></script><script src=\"/js/lib/ace/theme-chrome.js\" type=\"text/javascript\" charset=\"utf-8\"></script><script src=\"/js/lib/ace/theme-textmate.js\" type=\"text/javascript\" charset=\"utf-8\"></script><script src=\"/js/lib/ace/mode-javascript.js\" type=\"text/javascript\" charset=\"utf-8\"></script><script src=\"/js/lib/ace/mode-html.js\" type=\"text/javascript\" charset=\"utf-8\"></script><script src=\"/js/lib/ace/mode-css.js\" type=\"text/javascript\" charset=\"utf-8\"></script><script>$(function() {client.studio.editor.init();$('.editorTabs').tab();});</script>");}function body_1(chk,ctx){return chk.write("<input type=\"hidden\" id=\"fileId\" value=\"\"></input>");}function body_2(chk,ctx){return chk.write("<input type=\"hidden\" id=\"fileId\" value=\"").reference(ctx.getPath(true,["fileId"]),ctx,"h").write("\"></input>");}return body_0;})();(function(){dust.register("app/build",body_0);function body_0(chk,ctx){return chk.write("<h1>").reference(ctx.getPath(false,["lang","build"]),ctx,"h").write("</h1><div class=\"row buildRow\"><div class=\"span6\"><h3>iPad</h3><img src=\"/images/build/iPad.png\" /><p><a class=\"btn primary\" href=\"#\">iOS 5.0</a></p><p><a class=\"btn\" href=\"#\">iOS 4.0</a></p></div><div class=\"span5\"><h3>iPhone</h3><img src=\"/images/build/iPhone.png\" /><p><a class=\"btn primary\" href=\"#\">iOS 5.0</a></p><p><a class=\"btn\" href=\"#\">iOS 4.0</a></p><p><a class=\"btn\" href=\"#\">iOS 3.2</a></p></div><div class=\"span5\"><h3>Android</h3><img src=\"/images/build/android.png\" /><p><a class=\"btn primary\" href=\"#\">Android 4.0</a></p><p><a class=\"btn\" href=\"#\">Android 3.0</a></p><p><a class=\"btn\" href=\"#\">Android 2.3</a></p><p><a class=\"btn\" href=\"#\">Android 2.2</a></p><p><a class=\"btn\" href=\"#\">Android 2.1</a></p></div></div><div class=\"row buildRow\"><div class=\"span6\"><h3>Blackberry</h3><p><a class=\"btn primary\" href=\"#\">RIM 6.0</a></p></div><div class=\"span5\"><h3>Windows Phone 7</h3><p><a class=\"btn primary\" href=\"#\">WP 7.0</a></p></div><div class=\"span5\"><h3>Nokia WRT</h3></div></div>");}return body_0;})();(function(){dust.register("app/preview",body_0);function body_0(chk,ctx){return chk.write("<h2 style=\"display: inline;\">Preview</h2><span class=\"\" style=\"margin-left: 100px;\"><a href=\"#\" onclick=\"client.studio.preview.change('iPad')\">iPad</a> |<a href=\"#\" onclick=\"client.studio.preview.change('iPhone')\">iPhone</a> |<a style=\"font-size: 2em;\" href=\"#\" onclick=\"client.studio.preview.rotate();\">&#8635;</a> |").reference(ctx.getPath(false,["lang","scale"]),ctx,"h").write(": 25%<input type=\"range\" onchange=\"client.studio.preview.scale(this.value);\" min=\"25\" maxvalue=\"100\">100%<br /></span><div class=\"previewContainer iPhone\" id=\"previewContainer\" style=\"\"><iframe src=\"").reference(ctx.get("previewUrl"),ctx,"h").write("\" frameborder=\"0\" style=\"\"></iframe></div>");}return body_0;})();(function(){dust.register("navigation/editor",body_0);function body_0(chk,ctx){return chk.write("<li class=\"dropdown\"><a class=\"dropdown-toggle no-ajax\" data-toggle=\"dropdown\" href=\"#\">File</a><ul class=\"dropdown-menu\"><li><a class=\"no-ajax\" id=\"newFile\" href=\"#\">").reference(ctx.getPath(false,["lang","newFile"]),ctx,"h").write("</a></li><li><a class=\"no-ajax save\"  href=\"#\">").reference(ctx.getPath(false,["lang","save"]),ctx,"h").write("</a></li><li><a class=\"no-ajax\" id=\"saveAs\"  href=\"#\">").reference(ctx.getPath(false,["lang","saveAs"]),ctx,"h").write("</a></li><li><a class=\"no-ajax save\"  href=\"#\" >").reference(ctx.getPath(false,["lang","saveAll"]),ctx,"h").write("</a></li><li><a class=\"no-ajax\" id=\"closeFile\" href=\"#\">").reference(ctx.getPath(false,["lang","close"]),ctx,"h").write("</a></li><li><a class=\"no-ajax\" id=\"openRecent\" href=\"#\">").reference(ctx.getPath(false,["lang","openRecent"]),ctx,"h").write("</a></li></ul></li><li class=\"button\"><a>").reference(ctx.getPath(false,["lang","edit"]),ctx,"h").write("</a></li><li class=\"button\"><a>").reference(ctx.getPath(false,["lang","find"]),ctx,"h").write("</a></li><li class=\"button\"><a class=\"no-ajax save\" href=\"#\" >").reference(ctx.getPath(false,["lang","save"]),ctx,"h").write("</a></li><li class=\"button\"><a class=\"no-ajax save\" href=\"#\" >").reference(ctx.getPath(false,["lang","saveAll"]),ctx,"h").write("</a></li><li class=\"button\"><a class=\"no-ajax save\" href=\"#\" >").reference(ctx.getPath(false,["lang","saveClose"]),ctx,"h").write("</a></li><li class=\"button\"><a>").reference(ctx.getPath(false,["lang","find"]),ctx,"h").write("</a></li><li class=\"dropdown\" id=\"apiDropdown\"><a class=\"dropdown-toggle no-ajax\" data-toggle=\"dropdown\" href=\"#\">").reference(ctx.getPath(false,["lang","apiPrefix"]),ctx,"h").write("...</a><ul class=\"dropdown-menu\" ><li class=\"heading\"><h3>Client</h3></li><li><a href=\"#\" id=\"1012276\" class=\"snippet\" >").reference(ctx.getPath(false,["lang","apiAcc"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015103\" class=\"snippet\" >").reference(ctx.getPath(false,["lang","apiAct"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015118\" class=\"snippet\" >").reference(ctx.getPath(false,["lang","apiAudio"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1099663\" class=\"snippet\" >").reference(ctx.getPath(false,["lang","apiCamera"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015134\" class=\"snippet\" >").reference(ctx.getPath(false,["lang","apiContacts"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015153\" class=\"snippet\" >").reference(ctx.getPath(false,["lang","apiDep"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1099591\" class=\"snippet\" >").reference(ctx.getPath(false,["lang","apiFile"]),ctx,"h").write("</a></li><!-- BROKEN GIST FILENAME --><li><a href=\"#\" id=\"1015187\" class=\"snippet\" >").reference(ctx.getPath(false,["lang","apiGeolocation"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015177\" class=\"snippet\" >").reference(ctx.getPath(false,["lang","apiGeoIP"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015167\" class=\"snippet\" >").reference(ctx.getPath(false,["lang","apiHashing"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1019188\" class=\"snippet\" >").reference(ctx.getPath(false,["lang","apiHandlers"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1363666\" class=\"snippet\" >").reference(ctx.getPath(false,["lang","apiLocalStorage"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015203\" class=\"snippet\" >").reference(ctx.getPath(false,["lang","apiLogging"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015207\" class=\"snippet\" >").reference(ctx.getPath(false,["lang","apiMapping"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015212\" class=\"snippet\" >").reference(ctx.getPath(false,["lang","apiMessaging"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015214\" class=\"snippet\" >").reference(ctx.getPath(false,["lang","apiNotification"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1298299\" class=\"snippet\" >").reference(ctx.getPath(false,["lang","apiOrientation"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015244\" class=\"snippet\" >").reference(ctx.getPath(false,["lang","apiReady"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1019111\" class=\"snippet\" >").reference(ctx.getPath(false,["lang","apiSecurity"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1015261\" class=\"snippet\" >").reference(ctx.getPath(false,["lang","apiWebRequests"]),ctx,"h").write("</a></li><li><a href=\"#\" id=\"1336195\" class=\"snippet\" >").reference(ctx.getPath(false,["lang","apiWebView"]),ctx,"h").write("</a></li><li class=\"divider\"></li><li class=\"heading\"><h3>Cloud</h3></li><li><a id=\"1015127\" class=\"snippet\" href=\"#\">").reference(ctx.getPath(false,["lang","apiCache"]),ctx,"h").write("</a></li><li><a id=\"1015127\" class=\"snippet\" href=\"#\">").reference(ctx.getPath(false,["lang","apiDataStorage"]),ctx,"h").write("</a></li><!-- NO GIST FOR THIS --><li><a id=\"1015166\" class=\"snippet\" href=\"#\">").reference(ctx.getPath(false,["lang","apiHashing"]),ctx,"h").write("</a></li><li><a id=\"1015203\" class=\"snippet\" href=\"#\">").reference(ctx.getPath(false,["lang","apiCloudLogging"]),ctx,"h").write("</a></li><li><a id=\"1015224\" class=\"snippet\" href=\"#\">").reference(ctx.getPath(false,["lang","apiParsing"]),ctx,"h").write("</a></li><li><a id=\"1015231\" class=\"snippet\" href=\"#\">").reference(ctx.getPath(false,["lang","apiRSS"]),ctx,"h").write("</a></li><li><a id=\"1019114\" class=\"snippet\" href=\"#\">").reference(ctx.getPath(false,["lang","apiCloudSecurity"]),ctx,"h").write("</a></li><li><a id=\"1015247\" class=\"snippet\" href=\"#\">").reference(ctx.getPath(false,["lang","apiStringify"]),ctx,"h").write("</a></li><li><a id=\"1015266\" class=\"snippet\" href=\"#\">").reference(ctx.getPath(false,["lang","apiCloudWebRequests"]),ctx,"h").write("</a></li></ul></li><li class=\"dropdown\" id=\"helpDropdown\"><a class=\"dropdown-toggle no-ajax\" data-toggle=\"dropdown\" href=\"#\">").reference(ctx.getPath(false,["lang","help"]),ctx,"h").write("</a><ul class=\"dropdown-menu\"><li class=\"button\"><a class=\"no-ajax help\">").reference(ctx.getPath(false,["lang","shortcuts"]),ctx,"h").write("</a></li></ul></li>");}return body_0;})();(function(){dust.register("navigation/default",body_0);function body_0(chk,ctx){return chk.write("<li class=\"active\"><a class=\"singlepage\" href=\"/home\">").reference(ctx.getPath(false,["lang","home"]),ctx,"h").write("</a></li><li><a class=\"singlepage\" href=\"/apps\">").reference(ctx.getPath(false,["lang","apps"]),ctx,"h").write("</a></li><li><a href=\"/apps\">").reference(ctx.getPath(false,["lang","reporting"]),ctx,"h").write("</a></li><li><a href=\"/apps\">").reference(ctx.getPath(false,["lang","admin"]),ctx,"h").write("</a></li><li><a href=\"/apps\">").reference(ctx.getPath(false,["lang","docs"]),ctx,"h").write("</a></li>");}return body_0;})();
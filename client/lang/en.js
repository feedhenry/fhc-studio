var branding = {
    studioName : "FeedHenry",
    cli : "FHC",
    apiPrefix : "$fh"
}

var en = { 
  // Global Navbar 
  reporting : "Reporting",
  admin : "Admin",
  home : "Home",
  appStudio : "App Studio",
  dashboard : "Dashboard",
  docs : "Docs",
  help : "Help",
  logout : "Logout",
  prefs :  "Preferences",
  apps : "Apps", 
  
  // Footer
  serviceStatus : "Service Status ",
    
  // Apps Tab (apps.dust)
  name : "Name",
  description : "Description",
  modified : "Modified",
  myapps : "My Apps",
  version : "Version",
    
  
  // App Dashboard (app.dust / dashboard.dust)
  appDashboard : "App Dashboard",
  editor : "Editor",
  preview : "Preview",
  build : "Build",
  debug : "Debug",
  moreInfo : "moreInfo",
  previewOnMobile : "Preveiw on your mobile",
  width : "width",
  height : "height",
  w3cid : "w3cid",
  guid : "guid",
  // App Editor (editor.dust)
  close : "Close",
  file : "File",
  edit : "Edit",
  find : "Find",
  newFile : "New",
  save : "Save",
  saveAll : "Save All",
  saveAs : "Save As",
  saveClose: "Save & Close",
  search : "Search...",
  snippets: "Snippets",
  someSnippets : "Some code snippets",
  navigator : "Navigator",
  openRecent : "Open Recent",
  // App Preview (preview.dust)
  scale : "Scale",
  // App Build (build.dust)
  build : "Build",
  // App Debug (debug.dust)
  debug: "Debug",
 
  
  // Login Screen (login.dust)
  password : "password",
  email : "email",
  forgotPassword : "Forgot...",
  login : "Login",
  login_message : "Enter your username and password to login",
  
  
  // Home Screen (home.dust)
  appStudio : "App Studio",
  welcome : "Welcome",
  getStarted : "Get started by installing ",
  homeHeading : "Build apps powered by Cloud Foundry",
  stagingTo : "Staging to Cloud Foundry",
  studioIntro : "Build powerful cloud powered apps with " +branding.studioName+ ". Write in HTML5 and JavaScript. Deploy to your Cloud Foundry, and have a cloud scalable app on 5 platforms instantly!",
  
  apiDocs : "API Docs",
  apiText : "Read about the " +branding.apiPrefix+ " APIs that exist to make calls to the " +branding.StudioName+ " cloud, or access on-device functionality not normally available to HTML5 apps.",
  readApiDocs : "Read the API Docs",
  
  cliDocs : branding.cli + " Documentation",
  cliText : "Have a read of our documentation, where you can learn more about what " +branding.studioName+ " is, and how to use our powerful cloud and client API's to build powerful mobile apps.",
  readCliDocs : "Read the "+branding.cli+" Docs",
  
  tutorials : "Tutorials",
  tutorialsText: "Learn how to utilize the cloud to hash then cache data from multiple sources in the cloud. Localize an app, cloud powered language assets make corrections and updates a breeze.",
  viewTutorials : "View our tutorials",
  
  
  // API & Brand Related
  studioName : branding.studioName,
  cli : branding.cli,
  apiPrefix : branding.apiPrefix,
  // Client API
  apiAcc: branding.apiPrefix + '.acc',
  apiAct: branding.apiPrefix + '.act',
  apiAudio: branding.apiPrefix + '.audio',
  apiCamera: branding.apiPrefix + '.camera',
  apiContacts: branding.apiPrefix + '.contacts',
  apiDep: branding.apiPrefix + '.env',
  apiFile: branding.apiPrefix + '.file',
  apiGeolocation: branding.apiPrefix + '.geo',
  apiGeoIP: branding.apiPrefix + '.geoip',
  apiHash: branding.apiPrefix + '.hash',
  apiHandlers: branding.apiPrefix + '.handlers',
  apiLocalStorage: branding.apiPrefix + '.data',
  apiLogging: branding.apiPrefix + '.log',
  apiMapping: branding.apiPrefix + '.map',
  apiMessaging: branding.apiPrefix + '.send',
  apiNotification: branding.apiPrefix + '.notify',
  apiOrientation: branding.apiPrefix + '.ori',
  apiReady: branding.apiPrefix + '.ready',
  apiSecurity: branding.apiPrefix + '.sec',
  apiWebRequests: branding.apiPrefix + '.web',
  apiWebView: branding.apiPrefix + '.webview',
  // Cloud API
  apiCache: branding.apiPrefix + '.cache',
  apiDataStorage: branding.apiPrefix + '.db',
  apiHashing: branding.apiPrefix + '.hash',
  apiCloudLogging: branding.apiPrefix + '.log',
  apiParsing: branding.apiPrefix + '.parse',
  apiRSS: branding.apiPrefix + '.feed',
  apiCloudSecurity: branding.apiPrefix + '.sec',
  apiStringify: branding.apiPrefix + '.stringify',
  apiCloudWebRequests: branding.apiPrefix + '.web',
};

module.exports = en;
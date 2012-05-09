var branding = {
    studioName : "FeedHenry",
    cli : "FHC",
    apiPrefix : "$fh"
}
var en = { 
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

  // Global Navbar 
  reporting : "Reporting",
  admin : "Admin",
  home : "Home",
  appStudio : "App Studio",
  dashboard : "Dashboard",
  docs : "Docs",
  help : "Help",
  logout : "Logout",
  account: "My Account",
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
  // Create An App
  createAnApp: "Create An App",
  fromScratch: "From Scratch",
  fromGitRepo: "From A Git Repo",
  
  // App Dashboard (app.dust / dashboard.dust)
  appDashboard : "App Dashboard",
  editor : "Editor",
  preview : "Preview",
  build : "Build",
  configuration : "Configuration",
  debug : "Debug",
  logs: "Logs",
  developmentLogs: "Development",
  productionLogs: "Production",
  Logs: "Logs",
  moreInfo : "moreInfo",
  previewOnMobile : "Preview on your mobile",
  width : "width",
  height : "height",
  w3cid : "w3cid",
  guid : "guid",
  // App Editor (editor.dust)
  close : "Close",
  file : "File",
  edit : "Edit",
  find : "Find",
  findReplace : "Find & Replace",
  deleteFiles: "Delete Selected Files",
  newFile : "New",
  save : "Save",
  saveAll : "Save All",
  saveAs : "Save As",
  saveClose: "Save & Close",
  openResource: "Open Resource",
  openResourcePlaceholder: "Enter a filename to see suggestions...",
  search : "Search...",
  shortcuts: "Shortcuts",
  snippets: "Snippets",
  someSnippets : "Some code snippets",
  navigator : "Navigator",
  treeRefresh : "Refresh",
  treeDelete : "Delete",
  treeRename : "Rename",
  treeSearch : "Search",
  treeAdd : "Add",
  openRecent : "Open Recent",
  // App Preview (preview.dust)
  device: "Device",
  iPad: "iPad",
  iPhone: "iPhone",
  galaxyS2: "Samsung Galaxy S2",
  galaxyTab: "Samsung Galaxy Tab",
  htcEvo : "HTC Evo 4G",
  desireS : "HTC Desire S",
  scale : "Scale",
  // App Config (config.dust)
  config : {
    sections: {
      general: 'General',
      debug: 'Debug',
      permissions: 'Permissions',
      appearance: 'Appearance'
    },
    fields : {
      appId: 'App ID',
      flurryApplicationKey: 'Flurry application key',
      versionName: 'Version name',
      versionCode: 'Version code',
      packages: 'Packages',
      orientation: 'Orientation',
      autoRotate: 'Auto rotate',
      splashImage: 'Splash image',
      foregroundSplashImage: 'Foreground splash image',
      splashBackgroundColor: 'Splash background color',
      landscapesplashimage: 'Landscape splash image',
      retinasplashimage: 'Retina splash image',
      activitySpinner: 'Activity spinner',
      hideStatusBar: 'Hide status bar',
      permissionAudio: 'Audio',
      permissionCamera: 'Camera',
      permissionContacts: 'Contacts',
      permissionLocation: 'Location',
      permissionReadPhoneState: 'Read phone state',
      permissionReceiveSMS: 'Receive SMS',
      permissionVibrate: 'Vibrate',
      remoteDebug: 'Remote debug'
    },
    values: {
      portrait: 'portrait',
      landscape: 'landscape',
      Top: 'top'
    }
  },
  // App Build (build.dust)
  // Build Destinations
  build : "Build",
  buildIOS : "Apple iOS",
  buildAndroid : "Android",
  buildBlackberry : "Blackberry",
  buildWP7 : "Windows Phone 7",
  buildMobileWeb : "Mobile Web",
  
  //Build Configs
  debug : 'Debug',
  distribution : 'Distribution',
  release : 'Release',
  unsigned : 'Unsigned',
  signed : 'Signed',
  buildButton : 'Build!',
  
  // iOS Targets
  buildiPad : 'iPad',
  buildiPhone : 'iPhone',
  buildUniversal : 'Universal',
  
  // App Debug (debug.dust)
  debug: "Debug",


  // Login Screen (login.dust)
  password : "password",
  email : "email",
  forgotPassword : "Forgot...",
  login : "Login",
  login_message : "Enter your username and password to login",
  
  // Dashboard
  dashboard:     "Dashboard",
  recentApps:    "Recent Apps",
  templates:     "Templates",
  videos:        "Videos",
  developerBlog: "Developer Blog",
  cloudApis:     "Cloud APIs",
  clientApis:    "Client APIs",
  apiUsage:      "Usage",


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

};

module.exports = en;

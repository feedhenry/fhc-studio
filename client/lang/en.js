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
  
  
  // API 7 Brand Related
  studioName : branding.studioName,
  cli : branding.cli,
  apiAct: branding.apiPrefix + '.act',
  apiCamera: branding.apiPrefix + '.camera',
  apiWeb: branding.apiPrefix + '.web',
  apiCache: branding.apiPrefix + '.cache'
};

module.exports = en;
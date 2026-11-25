/* Site configuration.
   storefront: Apple Music country code used for search and the embed player (kr = 한국).
   musicKitDeveloperToken: optional. Leave empty to use the Apple Music embed player
   (subscribers signed in to Apple Music in the browser hear full tracks; others hear previews).
   To enable full in-page playback with "Apple Music 계정 연결", paste a MusicKit developer
   token (a JWT signed with your Apple Developer MusicKit key — see README). */
window.OA_CONFIG = {
  storefront: "kr",
  musicKitDeveloperToken: "",
  appName: "Opus Atlas"
};

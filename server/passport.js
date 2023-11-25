import  GoogleStrategy from "passport-google-oauth20"
import GithubStrategy from "passport-github2"
import  passport from "passport";

const GOOGLE_CLIENT_ID =
  "156195263458-rlh10dndtnq405pus50cbpcppl5llf0o.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const GITHUB_CLIENT_ID = "20a538a08cd1ddc96642";
const GITHUB_CLIENT_SECRET = "d61aede43ef1196320757a606574de5b7b614a6";


passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
   function (req,accessToken, refreshToken, profile, cb) {
    req.cookies.token = accessToken 
    console.log("cookies", req.cookies)
   
      return cb(null, profile);
    }
  )
);





passport.serializeUser((user, cb) => {

  cb(null, user);
});

passport.deserializeUser((user, cb) => {

  cb(null, user);
});




// import axios from "axios";
// import qs from "query-string";
// ;

// class AuthController {
    
//  async auth(req, res){

//   try {
//     const token = await new AuthController().exchangeCodeForAccessToken(req.body.code);
//     console.log(token)
//     const user = await new AuthController().fetchUser(token);
//     res.json({user:user, token:token})
//   } catch(err) {
//     console.log("err", err);

//     res.sendStatus(500);
//   }
// };

//  async exchangeCodeForAccessToken(code) {
//   const GITHUB_ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
//   console.log("codeeeeeeeeeeeeeeee:",code)
//   const {REDIRECT_URL, CLIENT_ID, CLIENT_SECRET} = process.env;
//   const params = {
//     code,
//     grant_type: 'authorization_code',
//     redirect_uri: REDIRECT_URL,
//     client_id: CLIENT_ID, 
//     client_secret: CLIENT_SECRET,
//   };
//   console.log(params)
//   const  {data}  = await axios.post(GITHUB_ACCESS_TOKEN_URL, params, {
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   });
// console.log("dataaa", data)

//   const parsedData = qs.parse(data);
//   return parsedData.access_token;
// }

// async fetchUser(token) {
//   const GITHUB_ENDPOINT = "https://api.github.com/user";
//   const response = await axios.get(GITHUB_ENDPOINT, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
  
//   return response.data;
// }
// async logut(req, res){
//     req.logout()

// }

// }
// export default new AuthController()

const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);



module.exports = router
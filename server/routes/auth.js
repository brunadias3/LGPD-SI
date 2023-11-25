

import { Router } from "express";
import passport  from "passport";

const CLIENT_URL = "http://localhost:3001/sucess";
var auth = Router();
auth.get("/login/success", (req, res) => {
  if (req.user) {
    console.log("sucesooooooooooooooooooooooooooooo")
    console.log(req.cookies)
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

auth.get("/login/failed", (req, res) => {
    console.log("eroooooooooooooooooooooooooooooooooooooooooooooooo")
  res.status(401).json({
    success: false,
    message: "failure",
  });
});
auth.get("/logout", (req, res) => {
  req.logout();
  req.session = null 
  res.session.destroy(function(err){

  });
  res.redirect(CLIENT_URL);
});

auth.get("/google", passport.authenticate("google", { scope: ["profile"] }));

auth.get(
  "/google/callback",
  passport.authenticate("google", {
  }), function (req, res){
    console.log("profileeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    console.log(req.cookies)
    res.cookie("token", req.cookies.token);
    res.redirect(CLIENT_URL)
 
  }
 
);

auth.get("/github", 
    passport.authenticate("github", { scope: ["profile", "token"], prompt:"select_account consent", state:true }));

auth.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);



export default auth;
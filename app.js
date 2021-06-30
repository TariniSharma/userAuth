const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();
const { auth, requiresAuth } = require('express-openid-connect');
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    //idpLogout: true,
  })
);

app.get('/', (req,res) => {
    //res.send("Hello Big Bang");
   // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    if(req.oidc.isAuthenticated())
    {
        res.send("Welcome to the unknown "+req.oidc.user.nickname);
    }
    else
    {
        res.send("You're logged out");
    }
});

app.get('/profile', requiresAuth(), (req,res) => {
    res.send(JSON.stringify(req.oidc.user));
})

app.listen(port, () => {
    console.log("listenin man");
});
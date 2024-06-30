const express = require("express");
const jwt = require("jsonwebtoken");

// Middleware function to check authentication and authorization

function requireAuth(req, res, next) {
  // Check for the presence of an authentication token in the request headers
  const bearerToken = req.headers.authorization;
  console.log('Bearer Token is ',bearerToken);
  // If token is missing, return an error
  if (!bearerToken) {
    return res.status(401).json({ error: "Authentication token missing" });
  }
  const token = bearerToken.split(" ")[1];
  try {
    // Verify and decode the token
    const decodedToken = jwt.verify(token, "somerandomtoken"); // Assuming JWT_SECRET is your secret key

    // Attach the decoded token to the request object for use in subsequent middleware or route handlers
    req.user = decodedToken;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, return an error
    return res.status(401).json({ error: "Invalid authentication token" });
  }
}

module.exports = requireAuth;

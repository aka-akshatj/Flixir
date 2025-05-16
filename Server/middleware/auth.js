//! For checking if the user is allowed to do certain things like an user can only delete his own post.

//? wants to like a post
//? click the like button => auth middleware (next)
//? auth middleware checks for authorization. if everything okay then  it calls next()
//? like controller...

import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        //get the token from the user.
        const token = req.headers.authorization.split(" ")[1];

        //check if token is custom or googletoken
        const isCustomAuth = token.length < 500;

        let decodedData; //variable to store token data

        if (token && isCustomAuth) {
            //get data from token
            decodedData = jwt.verify(token, "test");

            //store id in req.UserId
            req.userId = decodedData?.id;
        } else {
            //get data from token
            decodedData = jwt.decode(token);

            //store sub(google's id) in req.UserId
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;

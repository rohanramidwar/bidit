import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodedData; //data that we want to get from token

    decodedData = jwt.verify(token, "test"); //gives username and id
    //now we know which user has logged in
    req.userId = decodedData?.id; //users id
    // console.log(decodedData);

    next(); //to pass the actions to second thing
  } catch (error) {
    res.status(401).json({ error: "Please authenticate" });
  }
};

export default auth;

import jwt from 'jsonwebtoken'

export const verifyToken = (req: any, res: any, next: any) => {
  const authToken = req.headers.token

  if (authToken) {
    const token = authToken.split(" ")[1];
    jwt.verify(token, process.env.SECRET_PAS_KEY || 'fahadev21', (err: any, user: any) => {
      if (err) {
        res.status(403).json('Token is not valid!');
      }
      req.user = user;
      next()
    })
  }
  else { return res.status(401).send('You are not authenticated') }
}


export const verifyTokenAndAuthorization = (req: any, res: any, next: any) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

export const verifyTokenAdmin = (req: any, res: any, next: any) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next()
    } else {
      res.status(403).json("You are not alowed to do that!")
    }
  })
}



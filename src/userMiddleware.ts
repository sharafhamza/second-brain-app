import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //@ts-ignore
  const header = req.headers["token"];
  const decoded = jwt.verify(
    header as string,
    process.env.JWT_USER_PASSWORD as string
  );

  if (decoded) {
    //@ts-ignore
    req.userid = decoded.id;
    next();
  } else {
    //@ts-ignore
    res.status(401).json({ message: "Unauthorized User" });
  }
};

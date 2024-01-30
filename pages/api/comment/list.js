import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);
  // console.log(session);

  let db = (await connectDB).db("yjproject");
  let result = await db
    .collection("comment")
    .find({ parent: new ObjectId(req.query.id) })
    .toArray();
  res.status(200).json({ result, session });
}

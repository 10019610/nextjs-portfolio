import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);
  let db = (await connectDB).db("yjproject");
  let userCheck = await db
    .collection("post")
    .findOne({ _id: new ObjectId(req.body._id) });
  let data = { title: req.body.title, content: req.body.content };
  if (req.method == "POST") {
    if (session.user.email === userCheck.author) {
      let db = (await connectDB).db("yjproject");
      let result = await db
        .collection("post")
        .updateOne({ _id: new ObjectId(req.body._id) }, { $set: data });
      res.redirect(302, "/list");
    } else {
      res.status(500).json("작성자가 아닙니다.");
      // res.redirect(302, "/list");
    }
  }
}

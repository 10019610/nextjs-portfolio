import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  let data = { title: req.body.title, content: req.body.content };
  if (req.method == "POST") {
    console.log(req.body);
    let db = (await connectDB).db("yjproject");
    let result = await db
      .collection("post")
      .updateOne({ _id: new ObjectId(req.body._id) }, { $set: data });
    res.redirect(302, "/list");
  }
}

import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);
  if (session) {
    req.body.author = session.user.email;
  }
  if (req.method == "POST") {
    if (req.body.title == "") {
      return res.status(500).json("제목을 작성하세요");
    }
    let db = (await connectDB).db("yjproject");
    let result = db.collection("post").insertOne({
      createDate: Date(),
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    });
    res.redirect(302, "/list");
  }
}

import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method == "POST") {
    let db = (await connectDB).db("yjproject");
    let session = await getServerSession(req, res, authOptions);
    req.body = JSON.parse(req.body);
    if (session) {
      let result = db.collection("comment").insertOne({
        createDate: Date(),
        updateDate: "",
        comment: req.body.comment,
        author: session.user.email,
        image: session.user.image,
        parent: new ObjectId(req.body.parent),
        useYn: "Y",
        delYn: "N",
      });
      res.redirect(302, "/list");
    } else {
      return res.status(500).json("로그인 여부를 확인하십시오.");
    }
  }
}

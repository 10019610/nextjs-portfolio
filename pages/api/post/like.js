import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  console.log(req.body);
  let session = await getServerSession(req, res, authOptions);
  if (session) {
    let db = (await connectDB).db("yjproject");
    let likeCheck = await db.collection("like").findOne({
      clickedUser: session.user.email,
      postId: new ObjectId(req.body),
    });
    if (likeCheck == null) {
      let result = db.collection("like").insertOne({
        createDate: Date(),
        postId: new ObjectId(req.body),
        clickedUser: session.user.email,
      });
      res.status(200).json("좋아요기능 성공");
    } else {
      await db.collection("like").deleteOne({
        clickedUser: session.user.email,
        postId: new ObjectId(req.body),
      });
      res.status(200).json("좋아요취소");
    }
  } else {
    res.status(500).json("로그인이 필요합니다.");
  }
}

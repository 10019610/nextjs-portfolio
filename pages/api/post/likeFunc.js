import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);
  let client = await connectDB;
  let db = client.db("yjproject");
  let like = await db
    .collection("like")
    .find({ postId: new ObjectId(req.body) })
    .toArray();
  console.log("ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ", like);
  if (session) {
    let client = await connectDB;
    let db = client.db("yjproject");
    let 찾는거 = await db.collection("like").findOne({
      clickedUser: session.user.email,
      postId: new ObjectId(req.body),
    });
    console.log("ddddddddddddddddddddd", 찾는거);
    if (찾는거 == null) {
      res.status(200).json({ heart: "🤍", likeCount: like.length });
    } else {
      res.status(200).json({ heart: "❤️‍🔥", likeCount: like.length });
    }
  } else {
    res.status(200).json({ heart: "🖤", likeCount: like.length });
  }
}

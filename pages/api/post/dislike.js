import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method == "DELETE") {
    let session = await getServerSession(req, res, authOptions);
    let db = (await connectDB).db("yjproject");
    let likeCheck = await db.collection("like").findOne({
      postId: new ObjectId(req.body),
      clickedUser: session.user.email,
    });

    if (likeCheck !== null) {
      let result = await db.collection("like").deleteOne({
        postId: new ObjectId(req.body),
        clickedUser: session.user.email,
      });
      return res.status(200).json("❤️");
    } else {
      return res.status(500).json("좋아요 취소 실패");
    }
  }
}

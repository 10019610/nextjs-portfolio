import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method == "POST") {
    let db = (await connectDB).db("yjproject");
    let session = await getServerSession(req, res, authOptions);
    let data = req.body;
    console.log(data);
    let result = db.collection("like").insertOne({
      createDate: Date(),
      author: session.user.email,
      postId: new ObjectId(req.body),
    });
    // console.log("dddddddddddddddddd", req);
    return res.status(200).json("글에 좋아요를 눌렀습니다");
  }
}

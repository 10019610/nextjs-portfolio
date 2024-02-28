import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method == "DELETE") {
    // if (req.method == "POST") {
    let session = await getServerSession(req, res, authOptions);
    let db = (await connectDB).db("yjproject");
    let result = await db
      .collection("post")
      .findOne({ _id: new ObjectId(req.body) });
    if (result.author == session.user.email) {
      let result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(req.body) });
      // let result = await db.collection("post").updateOne(
      //   { _id: new ObjectId(req.body) },
      //   {
      //     $set: {
      //       updateDate: Date(),
      //       delYn: "Y",
      //       useYn: "N",
      //     },
      //   }
      // );
      return res.status(200).json("삭제완료");
    } else {
      return res.status(500).json("현재유저와 작성자 불일치");
    }
  }
}

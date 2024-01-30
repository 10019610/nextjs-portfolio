import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method == "DELETE") {
    let db = (await connectDB).db("yjproject");
    let result = await db
      .collection("comment")
      .deleteOne({ _id: new ObjectId(req.body) });
    // console.log(result);
    res.status(200).json("삭제완료");
  }
}

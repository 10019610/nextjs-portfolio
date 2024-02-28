import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const hash = await bcrypt.hash(req.body.password, 10);
    console.log(req.body);
    req.body.password = hash;
    const data = req.body;
    let db = (await connectDB).db("yjproject");
    let 중복체크 = await db.collection("users").findOne({ email: data.email });
    // console.log("중복체크", 중복체크);
    let 중복체크2 = await db
      .collection("accounts")
      .findOne({ userId: new ObjectId(중복체크._id) });
    // console.log("중복체크2", 중복체크2);
    if (중복체크 === null) {
      let result = await db.collection("users").insertOne({
        name: data.name,
        email: data.email,
        password: hash,
        image: "/unknown_user2.png",
        memberType: "NORMAL",
        createDate: Date(),
        updateDate: Date(),
        updateById: "",
        description: "",
        delYn: "N",
        useYn: "Y",
      });
      res.status(200).json("Success Signup!");
    } else {
      res.status(500).json(중복체크2.provider);
    }
  }
}

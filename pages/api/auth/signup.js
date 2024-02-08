import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const hash = await bcrypt.hash(req.body.password, 10);
    console.log(req.body);
    req.body.password = hash;
    const data = req.body;
    let db = (await connectDB).db("yjproject");
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
    // console.log(result);
    res.status(200).json("Success Signup!");
  }
}

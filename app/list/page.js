import { connectDB } from "@/util/database";
import Link from "next/link";
import ListItem from "./listItem";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function List() {
  const client = await connectDB;
  const db = client.db("yjproject");

  let result = await db
    .collection("post")
    .find({ delYn: "N", useYn: "Y" })
    .toArray();
  result = result.map((a) => {
    console.log(a);
    a._id = a._id.toString();
    return a;
  });
  return (
    <div>
      <div className="list-bg">
        <div className="write-btn">
          <Link href="/write">
            <button
              className="btn btn-outline-dark"
              style={{ marginLeft: "95%" }}
            >
              작성하기
            </button>
          </Link>
        </div>

        <ListItem result={result} />
      </div>
    </div>
  );
}

import { connectDB } from "@/util/database";
import Link from "next/link";
import ListItem from "./listItem";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function List() {
  const client = await connectDB;
  const db = client.db("yjproject");
  // let session = await getServerSession(authOptions);
  // if (session) {
  //   console.log("세션값", session);
  // }
  // let likeCheck = await db
  //   .collection("like")
  //   .find({ clickedUser: session.user.email })
  //   .toArray();
  // if (likeCheck === null) {
  //   likeCheck = "";
  // }

  let result = await db.collection("post").find().toArray();
  result = result.map((a) => {
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

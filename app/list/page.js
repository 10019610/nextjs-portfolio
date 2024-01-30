import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";
import ListItem from "./listItem";

export default async function List() {
  const client = await connectDB;
  const db = client.db("yjproject");
  let result = await db.collection("post").find().toArray();
  result = result.map((a) => {
    a._id = a._id.toString();
    return a;
  });
  return (
    <div>
      <div className="list-bg">
        <div className="write-btn">
          <Link href="/write">글쓰러가자</Link>
        </div>
        <ListItem result={result} />
      </div>
    </div>
  );
}

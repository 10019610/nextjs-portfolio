import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Edit(props) {
  let session = await getServerSession(authOptions);
  let db = (await connectDB).db("yjproject");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  if (session.user.email === result.author) {
    return (
      <div className="p-20">
        <h4>수정페이지</h4>
        <form action="/api/post/edit" method="POST">
          <input name="title" defaultValue={result.title} />
          <input name="content" defaultValue={result.content} />
          <input
            name="_id"
            defaultValue={result._id.toString()}
            style={{ display: "none" }}
          />
          <button type="submit">전송</button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <div>삭제는 작성자만 가능합니다.</div>
        <Link href="/list">리스트로 돌아가기</Link>
      </div>
    );
  }
}

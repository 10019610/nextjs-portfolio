import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";
import Like from "@/app/components/button/likeButton";

export default async function Detail(props) {
  const client = await connectDB;
  const db = client.db("yjproject");

  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  console.log(result);
  return (
    <div className="m-20">
      <article>
        <header className="mb-4">
          <h1 className="fw-bolder mb-3">{result.title}</h1>
          <h5>{result.author}</h5>
          <div className="text-muted fst-italic mb-2">{result.createDate}</div>
        </header>
        <figure className="mb-4">
          <img
            className="img-fluid rounded"
            src={`https://yjprojectimage.s3.ap-northeast-2.amazonaws.com/${result.image}`}
            alt="..."
          />
        </figure>
        <section className="mb-5">
          <p className="fs-5 mb-4">{result.content}</p>
        </section>
      </article>
      <h4></h4>
      <Like postId={result._id.toString()} />
      <Comment parentId={props.params.id} />
    </div>
  );
}

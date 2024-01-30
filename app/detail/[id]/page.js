import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";

export default async function Detail(props) {
  const client = await connectDB;
  const db = client.db("yjproject");

  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  console.log(result);
  return (
    <div>
      <article>
        <header className="mb-4">
          <h1 className="fw-bolder mb-1">{result.title}</h1>
          <h5>{result.author}</h5>
          <div className="text-muted fst-italic mb-2">{result.createDate}</div>
        </header>
        <figure className="mb-4">
          <img
            className="img-fluid rounded"
            src="https://dummyimage.com/900x400/ced4da/6c757d.jpg"
            alt="..."
          />
        </figure>
        <section className="mb-5">
          <p className="fs-5 mb-4">{result.content}</p>
        </section>
      </article>
      <h4></h4>
      <div>좋아요 1</div>
      <Comment parentId={props.params.id} />
    </div>
  );
}

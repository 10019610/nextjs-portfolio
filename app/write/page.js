import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Write() {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) {
    return <div>로그인이후 사용가능합니다.</div>;
  } else {
    return (
      <form action="/api/post/newPost" method="POST">
        <input
          type="text"
          name="title"
          className="form-control mt-4 mb-2"
          placeholder="제목을 입력해주세요."
          required
        />
        <div class="form-group">
          <textarea
            className="form-control"
            rows="10"
            name="content"
            placeholder="내용을 입력해주세요"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-secondary mb-3">
          제출하기
        </button>
      </form>
    );
  }
}

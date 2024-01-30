import { executeQuery } from "@/util/mysql";

export default async function handler(req, res) {
  let result = await executeQuery("SELECT * FROM test", []);
  console.log(
    "------------------------mysql----------------------------",
    result
  );
  res.status(200).json(result);
}

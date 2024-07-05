import { NextResponse } from "next/server";
import process from "node:process";
import path from "node:path";
import mime from "mime-types";

export async function GET(req: Request) {
  const query =
    new URL(req.url).searchParams
      .get("path")
      ?.replaceAll(/%2e%2e/g, "")
      .replaceAll(/%2F/g, "/")
      .replaceAll(/\.\./g, "") || "";

  try {
    let dir = process.env.DELIVARY_DIR;
    if (!dir) throw new Error("No delivery directory provided");
    dir = path.join(dir, query);
    const file = await Deno.readFile(path.join(Deno.cwd(), dir));
    let contentType: string | boolean = mime.contentType(path.extname(dir));

    if (typeof contentType === "boolean") {
      contentType = "";
    }

    return new Response(file, {
      status: 200,
      headers: {
        "Content-Type": contentType
      },
    });
  } catch (_error) {
    return NextResponse.json(
      {
        error: "Failed to get files",
        isSuccess: false,
      },
      { status: 500 }
    );
  }
}

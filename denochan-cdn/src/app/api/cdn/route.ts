import { NextResponse } from "next/server";
import process from "node:process";
import path from "node:path";
import mime from "mime-types";
import { isLockPath } from "../../../lib/isLockPath.ts";
import { parseBasic } from "../../../lib/parseBasic.ts";

export async function GET(req: Request) {
  const query =
    new URL(req.url).searchParams
      .get("path")
      ?.replace(/%2e%2e/g, "")
      .replace(/%2F/g, "/")
      .replace(/\.\./g, "") || "";

  try {
    let dir = process.env.DELIVARY_DIR;
    if (!dir) throw new Error("No delivery directory provided");
    dir = path.join(dir, query);
    const basic = parseBasic(req.headers.get("authorization"));
    if (
      isLockPath(dir) &&
      (basic.username !== process.env.LOCK_USERNAME ||
        basic.password !== process.env.LOCK_PASSWORD)
    ) {
      return NextResponse.json(
        {
          error: "Cannot download lockfiles",
          isSuccess: false,
        },
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS",
            "WWW-Authenticate": 'Basic realm="Locked Area"',
          },
        }
      );
    }
    const file = await Deno.readFile(path.join(Deno.cwd(), dir));
    let contentType: string | boolean = mime.contentType(path.extname(dir));

    if (typeof contentType === "boolean") {
      contentType = "";
    }

    return new Response(file, {
      status: 200,
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (_error) {
    return NextResponse.json(
      {
        error: "Failed to get files",
        isSuccess: false,
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
        },
      }
    );
  }
}

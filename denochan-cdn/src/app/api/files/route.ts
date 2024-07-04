import { NextResponse } from 'next/server';
import process from "node:process";
import path from "node:path";

export type Files = {
    name: string
    type: "file" | "directory"
    date: string
    size: string | null
}[]

export async function GET(
    req: Request
) {
  const query = (new URL(req.url).searchParams.get('path'))?.replaceAll(/%2e%2e/g, '').replaceAll(/%2F/g, '/').replaceAll(/\.\./g, '') || '';

 try {
    let dir = process.env.DELIVARY_DIR;
    if (!dir) throw new Error('No delivery directory provided');
    dir = path.join(dir, query);
    const files = await Deno.readDir(path.join(Deno.cwd(), dir));
    const fileList: Files = [];

    for await (const file of files) {
        const Url = path.join(dir, `./${file.name}`);
        console.log(Url);
        const fileInfo = await Deno.lstat(Url);
        if (file.isDirectory) {
            fileList.push({
                name: file.name,
                type: "directory",
                date: fileInfo.atime ? fileInfo.atime.toUTCString() : new Date().toUTCString(),
                size: fileInfo.size.toString()
            });
        } else {
            fileList.push({
                name: file.name,
                type: "file",
                date: fileInfo.atime ? fileInfo.atime.toUTCString() : new Date().toUTCString(),
                size: fileInfo.size.toString()
            });
        }
    }

   return NextResponse.json({
    files: fileList,
    isSuccess: true
  }, { status: 200 });
  } catch (_error) {
    return NextResponse.json({
      error: "Failed to get files",
      isSuccess: false
    }, { status: 500 });
  }
}
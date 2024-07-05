"use client";
import { FileList } from "@/components/fileList";
import { useLayoutEffect, useState } from "react";
import { Files } from "../api/files/route";

export default function Home() {
  const [fileList, setFileList] = useState<Files>([]);
  const [isSuccess, setIsSuccess] = useState(true);

  useLayoutEffect(() => {
    fetch("/api/files?path=" + new URL(location.href).pathname)
      .then((res) => res.json())
      .then((data) => {
        if (data.error && !data.isSuccess) {
          setIsSuccess(false);
        } else {
          setFileList(data.files);
        }
      });
  }, []);

  return <>
    {(isSuccess && !fileList.length) && <p>Loading...</p>}
    {isSuccess && <FileList files={fileList} />}
    {!isSuccess && <p className="text-red-500">Failed to get files</p>}
  </>;
}

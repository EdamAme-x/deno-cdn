import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Files } from "@/app/api/files/route";
import * as filesize from "filesize";
import { Button } from "./ui/button";

export function FileList({ files }: { files: Files }) {
  return (
    <Table>
      <TableCaption>Denochan CDN File Explorer</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Download</TableHead>
          <TableHead>CDN URL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files
          .concat([{ name: "../", type: "directory", date: "", size: "" }])
          .map((file) => {
            const downlaodURL = `api/file?path=${(
              new URL(location.href).pathname +
              "/" +
              file.name
            ).replaceAll("//", "/")}`;
            const cdnURL =
              location.origin +
              "/api/cdn?path=" +
              (new URL(location.href).pathname + "/" + file.name).replaceAll(
                "//",
                "/"
              );
            return (
              <TableRow key={file.name}>
                <TableCell className="font-medium" title={file.name}>
                  {file.name.length > 20
                    ? file.name.substring(0, 17) + "..."
                    : file.name}
                </TableCell>
                <TableCell>{file.type}</TableCell>
                <TableCell>{file.date}</TableCell>
                <TableCell className="text-right">
                  {file.type === "directory"
                    ? "-"
                    : filesize.filesize(parseInt(file.size))}
                </TableCell>
                <TableCell>
                  {file.type === "directory" ? (
                    <a
                      href={(
                        new URL(location.href).pathname +
                        "/" +
                        file.name
                      ).replaceAll("//", "/")}
                    >
                      View
                    </a>
                  ) : (
                    <a
                      href={downlaodURL}
                      className="text-blue-500 hover:underline"
                    >
                      Download
                    </a>
                  )}
                </TableCell>
                <TableCell>
                  {file.type === "file" ? (
                    <Button
                      onClick={() => {
                        try {
                          // for Chrome and IOS browser
                          navigator.clipboard
                            .writeText(cdnURL)
                            .then(() => alert("Copied to clipboard"));
                          return;
                        } catch (_error) {}
                        // for Android browser
                        const textArea = document.createElement("textarea");
                        textArea.value = cdnURL;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);
                        alert("Copied to clipboard");
                      }}
                    >
                      Copy
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        try {
                          // for Chrome and IOS browser
                          navigator.clipboard
                            .writeText(location.href)
                            .then(() => alert("Copied to clipboard"));
                          return;
                        } catch (_error) {}
                        // for Android browser
                        const textArea = document.createElement("textarea");
                        textArea.value = location.href;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);
                        alert("Copied to clipboard");
                      }}
                    >
                      Copy
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}

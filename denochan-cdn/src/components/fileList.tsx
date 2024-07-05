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

export function FileList({ files }: { files: Files }) {
  return (
    <Table>
      <TableCaption>File Explorer</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Download</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => (
          <TableRow
            key={file.name}
          >
            <TableCell className="font-medium">{file.name}</TableCell>
            <TableCell>{file.type}</TableCell>
            <TableCell>{file.date}</TableCell>
            <TableCell className="text-right">{file.type === "directory" ? "-" : filesize.filesize(parseInt(file.size))}</TableCell>
            <TableCell><a href={`api/file?path=${(new URL(location.href).pathname + "/" + file.name).replaceAll("//", "/")}`}>Download</a></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

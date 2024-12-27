import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { FILES_DIR } from "$lib/files-dir";

if (!fs.existsSync(FILES_DIR)) {
  fs.mkdirSync(FILES_DIR, { recursive: true });
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, request }) {
  const file_path = path.normalize(path.join(FILES_DIR, params.name));

  if (!fs.existsSync(file_path)) {
    return new Response("not found", { status: 404 });
  }

  const stats = fs.statSync(file_path);
  const etag = `W/"${stats.size}-${stats.mtime.getTime()}"`;

  if (request.headers.get("if-none-match") === etag) {
    return new Response(null, { status: 304 });
  }

  const headers = {
    ETag: etag,
    "Content-Type": mimes.lookup(file_path),
    "Content-Length": stats.size,
    "Cache-Control": "max-age=60",
    "Last-Modified": stats.mtime.toUTCString(),
  };

  const nodejs_rstream = fs.createReadStream(file_path);

  // @ts-ignore
  const web_rstream = Readable.toWeb(nodejs_rstream, {
    // See: https://github.com/nodejs/node/issues/46347#issuecomment-1416310527
    strategy: new CountQueuingStrategy({ highWaterMark: 100 }),
  }) as unknown as BodyInit;

  // @ts-ignore
  return new Response(web_rstream, { headers });
}

const mimes = {
  // Images
  webp: "image/webp",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  avif: "image/avif",

  lookup(string: string) {
    const ext = string.toLowerCase().split(".").at(-1);
    return (
      (ext && this[/** @type {keyof typeof mimes} */ ext]) ??
      "application/octet-stream"
    );
  },
};

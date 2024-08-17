import { getChunkedDocsFromPdf } from "@/lib/pdfLoader";
import { embedAndStoreDocs } from "@/lib/vectorStore";
import { getPineconeClient } from "@/lib/pineconeClient";

(async () => {
  try {
    const pineconeClient = await getPineconeClient();
    const docs = await getChunkedDocsFromPdf();
    await embedAndStoreDocs(pineconeClient, docs);
    console.log("Data embedded and stored in pine cone index");
  } catch (error) {
    console.error("Init client script failed", error);
  }
})();

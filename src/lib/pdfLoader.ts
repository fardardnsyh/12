import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { env } from "./config";
import axios from "axios";
import * as pdfjs from "pdfjs-dist";
import * as PdfjsWorker from "pdfjs-dist/build/pdf.worker";
import { metadata } from "@/app/layout";

export const getChunkedDocsFromPdf = async () => {
  try {
    const response = await axios.get(env.PDF_PATH, {
      responseType: "blob",
    });

    const pdfBlob = new Blob([response.data], { type: "application/pdf" });

    const loadingTask = pdfjs.getDocument({
      url: env.PDF_PATH,
    });
    const pdf = await loadingTask.promise;

    const numPages = pdf.numPages;
    let textContent = "";

    for (let num = 1; num <= numPages; num++) {
      const page = await pdf.getPage(num);
      const textContentArray = await page.getTextContent();
      const pageText = textContentArray.items
        .map((item: any) => item.str)
        .join(" ");
      textContent += pageText + " \n\n";
    }

    const doc: Document | any = {
      pageContent: textContent,
      metadata: {},
    };
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const chunkedDocs = await textSplitter.splitDocuments([doc]);
    return chunkedDocs;
  } catch (error) {
    console.log(error);
    throw new Error("Pdf loading failed");
  }
};

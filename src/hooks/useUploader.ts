import { UPLOAD_API } from "@/services";
import { DocumentPickerAsset } from "expo-document-picker";
import { useCallback } from "react";

type UploadPromptFile = {
  session_id: string;
  file: DocumentPickerAsset;
  prompt?: string;
};

export const useUploader = () => {
  const uploadPromptFile = useCallback(
    async ({ session_id, file, prompt }: UploadPromptFile) => {
      if (!file.file || !file.mimeType) return;

      if (
        ![
          "image/jpeg",
          "image/png",
          "application/pdf",
          "text/csv",
          "text/html",
          "text/plain",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file?.mimeType)
      ) {
        alert("Only JPG, PNG, CSV, HTML, MS-WORD, and PDF files are accepted.");
        return;
      }

      const formData = new FormData();
      formData.append("file", {
        uri: file.uri,
        name: file.name,
        type: file.mimeType,
      } as any); // Type assertion needed for FormData

      try {
        return await UPLOAD_API.uploadPromptFile({
          session_id,
          formData,
          prompt,
        });
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const uploadBotKnowledgeFile = useCallback(
    async (context_id: string, file: DocumentPickerAsset) => {
      if (!file) return;

      if (file.mimeType !== "application/pdf") {
        alert("Only PDF file is accepted.");
        return;
      }

      const formData = new FormData();
      formData.append("file", {
        uri: file.uri,
        name: file.name,
        type: file.mimeType,
      } as any); // Type assertion needed for FormData

      try {
        return await UPLOAD_API.uploadBotKnowledgeFile({
          context_id,
          formData,
        });
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const uploadKnowledgeFile = useCallback(
    async (
      context_id: string,
      node_id: string,
      file: DocumentPickerAsset
    ): Promise<any> => {
      if (!file.file || !file.mimeType) return;

      if (
        ![
          "application/pdf",
          "application/msword",
          "text/csv",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ].includes(file.mimeType)
      ) {
        alert("Only MS-WORD, XLSX and PDF files are accepted.");
        return;
      }

      const formData = new FormData();
      formData.append("file", {
        uri: file.uri,
        name: file.name,
        type: file.mimeType,
      } as any); // Type assertion needed for FormData

      try {
        return await UPLOAD_API.uploadKnowledgeFile({
          context_id,
          node_id,
          formData,
        });
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  return {
    uploadPromptFile,
    uploadBotKnowledgeFile,
    uploadKnowledgeFile,
  };
};

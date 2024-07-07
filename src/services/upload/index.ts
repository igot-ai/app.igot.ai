import { api } from "@/api";
import { API_URLS } from "@/constants";

type UploadPromptFile = {
  session_id: string;
  formData: FormData;
  prompt?: string;
};

type UploadBotKnowledgeFile = {
  context_id: string;
  formData: FormData;
};

type UploadKnowledgeFile = {
  context_id: string;
  node_id: string;
  formData: FormData;
};

export const UPLOAD_API = {
  uploadPromptFile: async ({
    session_id,
    formData,
    prompt = '""',
  }: UploadPromptFile) =>
    await uploadFile(
      `${API_URLS.CHAT_PROMPT}/file/${session_id}?prompt=${prompt}`,
      formData
    ),

  uploadBotKnowledgeFile: async ({
    context_id,
    formData,
  }: UploadBotKnowledgeFile) =>
    await uploadFile(
      `${API_URLS.BUILDER_CONTEXT}/${context_id}/knowledge`,
      formData
    ),

  uploadKnowledgeFile: async ({
    context_id,
    node_id,
    formData,
  }: UploadKnowledgeFile) =>
    await uploadFile(
      `${API_URLS.BUILDER_CONTEXT}/${context_id}/${node_id}/docs`,
      formData
    ),
};

const uploadFile = async (url: string, formData: FormData) =>
  await api.post(url, formData, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
    transformRequest: (data, headers) => {
      return formData;
    },
  });

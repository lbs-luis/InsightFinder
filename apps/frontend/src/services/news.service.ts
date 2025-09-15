"use server";

const API_BASE_URL = "http://localhost:3001";

export async function getNewsMetaData(page: number = 1) {
  const url = `${API_BASE_URL}/news`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        page: String(page),
      },
      cache: "no-store",
      // next: {
      //   tags: ["news"],
      //   revalidate: 60 * 30, // 30 minutos
      // },
    });

    if (!response.ok) {
      throw new Error(
        `Erro ao buscar notícias: ${response.status} - ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    return { error };
  }
}

import { revalidateTag } from "next/cache";

export async function revalidateNewsMetaDataCache() {
  revalidateTag("news");
}

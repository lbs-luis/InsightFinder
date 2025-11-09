"use server";

const API_BASE_URL = "http://localhost:3001";

export async function getNewsMetaData(
  page: number = 1,
  category: NewCategoriesEnum = NewCategoriesEnum.TODOS,
  keywords: string
) {
  const url = `${API_BASE_URL}/news`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        page: String(page),
        category: category,
        keywords,
      },
      cache: "no-store",
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
import { NewCategoriesEnum } from "../types/category.types";

export async function revalidateNewsMetaDataCache() {
  revalidateTag("news");
}

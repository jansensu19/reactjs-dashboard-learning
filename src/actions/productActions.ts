"use server";

import { revalidatePath } from "next/cache";
import { addProduct, deleteProduct } from "../services/productApi";
import { Product } from "../types";

export async function createProductAction(newProduct: Product) {
  try {
    await addProduct(newProduct);
    
    revalidatePath("/products");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteProductAction(productId: string) {
  try {
    await deleteProduct(productId);
    
    revalidatePath("/products");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
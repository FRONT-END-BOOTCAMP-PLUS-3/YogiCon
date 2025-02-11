/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabaseClient } from './client';

export const uploadImageToStorage = async (file: File) => {
  try {
    const { error } = await supabaseClient.storage
      .from('gift_image_box')
      .upload(file.name, file);

    if (error) {
      throw new Error(error.message);
    }

    const { data } = supabaseClient.storage
      .from('gift_image_box')
      .getPublicUrl(file.name);

    return data.publicUrl;
  } catch (error: any) {
    console.error('이미지 업로드 오류: ', error);
    throw new Error(error.message);
  }
};

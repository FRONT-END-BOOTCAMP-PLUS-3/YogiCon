/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabaseClient } from './client';

export const uploadImageToStorage = async (file: File) => {
  try {
    const { data: fileList } = await supabaseClient.storage
      .from('gift_image_box')
      .list();

    const fileExists = fileList?.some(
      (existingFile) => existingFile.name === file.name
    );

    if (fileExists) {
      alert(`해당 기프티콘이 이미 존재합니다. 다른 기프티콘을 선택하세요.`);
      return null;
    }

    const { error } = await supabaseClient.storage
      .from('gift_image_box')
      .upload(file.name, file);

    if (error) {
      throw new Error(error.message);
    }
    const { data: uploadedFile } = supabaseClient.storage
      .from('gift_image_box')
      .getPublicUrl(file.name);

    return uploadedFile.publicUrl;
  } catch (error: any) {
    console.error('이미지 업로드 오류: ', error);
    throw new Error(error.message);
  }
};

export const deleteImageFromStorage = async (fileName: string) => {
  try {
    const { error } = await supabaseClient.storage
      .from('gift_image_box')
      .remove([fileName]);

    if (error) {
      throw new Error(`이미지 삭제 실패: ${error.message}`);
    }
    console.log('이미지 삭제 성공');
    return true;
  } catch (error: any) {
    console.error('이미지 삭제 오류:', error);
    return false;
  }
};

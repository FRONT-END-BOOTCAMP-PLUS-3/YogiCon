import { supabase } from '@/utils/supabase/client';

const SbUserRepository = async (userData: any) => {
  if (!userData.id || !userData.kakao_account?.profile?.nickname) {
    console.error('[Supabase] 사용자 정보가 올바르지 않습니다.', userData);
    return;
  }

  const userToSave = {
    id: userData.id.toString(),
    email: userData.kakao_account?.email || null,
    nickname: userData.kakao_account?.profile?.nickname,
    profile_image: userData.kakao_account?.profile?.profile_image_url || null,
  };

  try {
    // 유저 조회
    let { data: existingUser, error: selectError } = await supabase
      .from('user')
      .select('*')
      .eq('id', userToSave.id)
      .single();

    if (existingUser) {
      console.log('[Supabase] 기존 사용자 존재:', existingUser);
      return existingUser;
    }
    const { data: registeredUserInfo } = await supabase
      .from('user')
      .insert(userToSave)
      .select()
      .single();
    return registeredUserInfo;
  } catch (error) {
    console.error('[Supabase] 저장 중 오류 발생:', error);
  }
};

export { SbUserRepository };

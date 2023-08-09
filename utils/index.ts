interface ICookieInfo {
  userId: number;
  nickname: string;
  avatar: string;
}

export const setCookie = (cookies: any, { nickname }: ICookieInfo) => {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const path = '/';
  cookies.set('userId', nickname, {
    path,
    expires
  })
}

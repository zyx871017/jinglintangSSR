import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/_admin/manage')) {
    const adid = request.cookies.get('adid');
    if (adid) {
      return;
    } else {
      return NextResponse.redirect(new URL(`/_admin/manage/login?redir=${request.nextUrl.pathname}`, request.url));
    }
  } else {
    const uid = request.cookies.get('uid');
    if (uid) {
      return;
    } else {
      return NextResponse.redirect(new URL(`/login?redir=${request.nextUrl.pathname}`, request.url));
    }
  }
}

export const config = {
  matcher: [
    '/peoplePublish',
    '/storePublish',
    '/writeComment/:id*',
    '/_admin/manage/store',
    '/_admin/manage/comment'
  ]
}

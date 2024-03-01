import { authenticate } from "./lib/auth"
export const config = {
  matcher:[ '/myposts', '/bookmarks'],
}
 
export async function middleware(request) {
    const {user, isLoggedIn}= await authenticate();
  if (!isLoggedIn) {
    // Respond with JSON indicating an error message
    return Response.json(
      { success: false, message: 'authentication failed' },
      { status: 401 }
    )
  }
}
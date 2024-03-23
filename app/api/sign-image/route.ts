import {v2 as Cloudinary} from 'cloudinary';

export const POST = async(request: Request) => {  
  const body = (await request.json()) as {paramsToSign: Record<string, string>};
  const {paramsToSign} = body;

  const signature = Cloudinary.utils.api_sign_request(paramsToSign, process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!);
  
  return Response.json({signature});
}


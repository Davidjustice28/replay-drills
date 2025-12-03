import type { NextRequest } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { organization_id: string } }
) {
  return Response.json({
    org: params.organization_id,
    message: "drills endpoint works!",
  });
}
export async function POST(request: NextRequest) {}
 
export async function PUT(request: NextRequest) {}
 
export async function DELETE(request: NextRequest) {}
export async function GET() {
  const stats = {
    users: 152,
    verified: 98,
    pendingVerifications: 5,
    pendingTasks: 12,
    dataServices: 8
  };

  return Response.json(stats);
}

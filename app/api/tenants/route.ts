// /app/api/tenants/route.ts
export async function GET() {
  return Response.json([
    {
      id: '1',
      name: 'Tenant One',
      domain: 'tenantone.saas.com',
      createdAt: '2025-07-01'
    },
    {
      id: '2',
      name: 'Tenant Two',
      domain: 'tenanttwo.saas.com',
      createdAt: '2025-07-02'
    },
    // Add more dummy tenants
  ]);
}

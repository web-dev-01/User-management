export async function GET() {
  return Response.json([
    {
      id: 'a1',
      name: 'Temperature Sensor',
      type: 'Sensor',
      status: 'Active',
      createdAt: '2025-07-01'
    },
    {
      id: 'a2',
      name: 'Smart Light',
      type: 'Device',
      status: 'Inactive',
      createdAt: '2025-07-02'
    },
    {
      id: 'a3',
      name: 'Door Lock',
      type: 'Device',
      status: 'Maintenance',
      createdAt: '2025-07-03'
    }
  ]);
}

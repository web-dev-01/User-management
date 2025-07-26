// /app/api/users/route.ts

export async function GET() {
  return Response.json([
    {
      id: 'u1',
      name: 'Rahul Kumar',
      email: 'rahul@example.com',
      role: 'Admin',
      createdAt: '2025-07-01'
    },
    {
      id: 'u2',
      name: 'Anjali Verma',
      email: 'anjali@example.com',
      role: 'User',
      createdAt: '2025-07-02'
    },
    {
      id: 'u3',
      name: 'Vikram Singh',
      email: 'vikram@example.com',
      role: 'User',
      createdAt: '2025-07-03'
    },
    {
      id: 'u4',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      role: 'Manager',
      createdAt: '2025-07-04'
    },
    {
      id: 'u5',
      name: 'Amit Yadav',
      email: 'amit@example.com',
      role: 'User',
      createdAt: '2025-07-05'
    },
    {
      id: 'u6',
      name: 'Sneha Gupta',
      email: 'sneha@example.com',
      role: 'Admin',
      createdAt: '2025-07-06'
    },
    {
      id: 'u7',
      name: 'Ravi Patel',
      email: 'ravi@example.com',
      role: 'User',
      createdAt: '2025-07-07'
    },
    {
      id: 'u8',
      name: 'Kiran Mehta',
      email: 'kiran@example.com',
      role: 'Support',
      createdAt: '2025-07-08'
    },
    {
      id: 'u9',
      name: 'Deepak Joshi',
      email: 'deepak@example.com',
      role: 'Manager',
      createdAt: '2025-07-09'
    },
    {
      id: 'u10',
      name: 'Neha Rani',
      email: 'neha@example.com',
      role: 'User',
      createdAt: '2025-07-10'
    },
    {
      id: 'u11',
      name: 'Abhishek Thakur',
      email: 'abhishek@example.com',
      role: 'Admin',
      createdAt: '2025-07-11'
    }
  ]);
}

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            // Handle GET request to fetch data from Django API
            try {
                const response = await fetch('http://your-django-api-url/api/endpoint');
                const data = await response.json();
                res.status(200).json(data);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching data' });
            }
            break;

        case 'POST':
            // Handle POST request to send data to Django API
            try {
                const response = await fetch('http://your-django-api-url/api/endpoint', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(req.body),
                });
                const data = await response.json();
                res.status(201).json(data);
            } catch (error) {
                res.status(500).json({ message: 'Error sending data' });
            }
            break;

        // Add more cases for other HTTP methods as needed

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
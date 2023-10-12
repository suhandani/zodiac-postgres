import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { date } = req.query;
    try {
      const zodiak = await prisma.zodiac.findFirst({
        where: {
            AND:[
                {
                    startDate: {
                
                        lte: date as string
                    },
                },{
                    endDate:{
                        gte: date as string
                    }
                }

            ]
        },
      });
      res.json(zodiak?.name);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching posts' });
    }
}
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { clerkClient } from '@clerk/nextjs/server';
import type { Tweet } from '@prisma/client';

export const tweetRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const tweets = await ctx.prisma.tweet.findMany({
      take: 100,
    });
    const users = await clerkClient.users.getUserList({
      userId: tweets.map((tweet) => tweet.authorId),
    });
    console.log(users);

    return tweets;
  }),
});

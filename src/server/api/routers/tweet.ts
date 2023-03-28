// Dependencies
import { clerkClient } from '@clerk/nextjs/server';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

// Redis rate limiter
import { Ratelimit } from '@upstash/ratelimit'; // for deno: see above
import { Redis } from '@upstash/redis';

// Helpers
import { filterUserForClient } from '~/server/helpers/filterUserForClient';

// Create a new rate limiter, 1 request per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, '10 s'),
  analytics: true,
});

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '~/server/api/trpc';

// Types
import type { Tweet } from '@prisma/client';

const addUserDataToPosts = async (tweets: Tweet[]) => {
  const userId = tweets.map((tweet) => tweet.authorId);
  const users = (
    await clerkClient.users.getUserList({
      userId: userId,
      limit: 110,
    })
  ).map(filterUserForClient);
};

export const tweetRouter = createTRPCRouter({
  // Get 100 tweets and display them to the home page
  getAll: publicProcedure.query(async ({ ctx }) => {
    const tweets = await ctx.prisma.tweet.findMany({
      take: 100,
      orderBy: [{ createdAt: 'desc' }],
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: tweets.map((tweet) => tweet.authorId),
        limit: 100,
      })
    ).map(filterUserForClient);

    return tweets.map((tweet) => {
      const author = users.find((user) => user.id === tweet.authorId);

      if (!author) {
        console.error('AUTHOR NOT FOUND', tweet);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Author for post not found. POST ID: ${tweet.id}, USER_ID: ${tweet.authorId}`,
        });
      }

      return {
        tweet,
        author: users.find((user) => user.id === tweet.authorId),
      };
    });
  }),

  // Create a new tweet
  create: privateProcedure
    .input(
      z.object({
        text: z
          .string({
            required_error: 'Twoot requires some text',
            invalid_type_error: "That doesn't appear to be text",
          })
          .min(1, { message: 'Twoot must contain at least 1 character' })
          .max(280, { message: 'Twoot cannot be longer than 280 characters' }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      // Checks if the user is signed in
      if (!authorId) {
        console.error('USER NOT SIGNED IN');
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: `You are not signed in, please authenticate so that you may tweet`,
        });
      }

      // Limit the number of tweets that a user can post to the db
      const { success } = await ratelimit.limit(authorId);

      if (!success)
        throw new TRPCError({
          code: 'TOO_MANY_REQUESTS',
          message:
            'You are attempting to spam tweet too many times, You are only allowed to tweet every 10 seconds',
        });

      const tweet = await ctx.prisma.tweet.create({
        data: {
          authorId,
          text: input.text,
        },
      });

      return tweet;
    }),
});

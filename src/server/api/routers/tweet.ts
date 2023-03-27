import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import type { User } from '@clerk/nextjs/dist/api';
import { clerkClient } from '@clerk/nextjs/server';
import type { Tweet } from '@prisma/client';
import { TRPCError } from '@trpc/server';

// Filter out all the user data we don't want reaching the client
const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profilePicture: user.profileImageUrl,
  };
};

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
});

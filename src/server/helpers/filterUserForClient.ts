import type { User } from '@clerk/nextjs/dist/api';
export const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
    createdAt: user.createdAt,
    externalUsername:
      user.externalAccounts.find(
        (externalAccount) =>
          externalAccount.provider === 'oauth_github' ||
          externalAccount.provider === 'oauth_discord' ||
          externalAccount.provider === 'oauth_google'
      )?.username || null,
  };
};

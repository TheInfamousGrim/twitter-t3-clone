import { useUser, UserButton } from '@clerk/nextjs';
import { v4 as uuidV4 } from 'uuid';
import { useState } from 'react';

// Icons
import { TwooterIcon } from './Icons/TwooterIcon';
import {
  HashtagIcon,
  Cog6ToothIcon,
  BellIcon,
  EnvelopeIcon,
  BookmarkIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  HomeIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid';
import { Cog6ToothIcon as Cog6ToothIconOutline } from '@heroicons/react/24/outline';

// Components
import { TweetModal } from './TweetModal';

const navigationItemsLoggedOut = [
  {
    navItemName: 'Explore',
    navItemIcon: HashtagIcon,
  },
  {
    navItemName: 'Settings',
    navItemIcon: Cog6ToothIcon,
  },
];

const navigationItemsLoggedIn = [
  {
    navItemName: 'Home',
    navItemIcon: HomeIcon,
  },
  {
    navItemName: 'Explore',
    navItemIcon: HashtagIcon,
  },
  {
    navItemName: 'Notifications',
    navItemIcon: BellIcon,
  },
  {
    navItemName: 'Messages',
    navItemIcon: EnvelopeIcon,
  },
  {
    navItemName: 'Bookmarks',
    navItemIcon: BookmarkIcon,
  },
  {
    navItemName: 'Profile',
    navItemIcon: UserIcon,
  },
  {
    navItemName: 'More',
    navItemIcon: EllipsisHorizontalCircleIcon,
  },
];

export const SideNavigation = () => {
  // Tweet modal state
  const [tweetModalOpen, setTweetModalOpen] = useState(false);

  // Check if the user is signed in
  const user = useUser();

  if (!user.isSignedIn) {
    return (
      <header className="max-w-3xl p-4">
        <nav className="flex flex-col gap-2">
          <a
            href="#"
            className="w-fit rounded-full p-2 duration-150 ease-in hover:bg-zinc-900"
          >
            <TwooterIcon />
          </a>
          {navigationItemsLoggedOut.map((navItem) => {
            return (
              <div key={`${navItem.navItemName}-${uuidV4()}`} className="">
                <div
                  className="tooltip tooltip-bottom block xl:hidden"
                  data-tip={navItem.navItemName}
                >
                  <a
                    href="#"
                    className="flex w-fit items-center gap-4 rounded-full p-2 duration-150 ease-in hover:bg-zinc-900 xl:pr-6"
                  >
                    <navItem.navItemIcon className="h-8 w-8 text-slate-100" />
                    <p className="sr-only">{navItem.navItemName}</p>
                  </a>
                </div>
                <div className="hidden xl:block">
                  <a
                    href="#"
                    className="flex w-fit items-center gap-4 rounded-full p-2 duration-150 ease-in hover:bg-zinc-900 xl:pr-6"
                  >
                    <navItem.navItemIcon className="h-8 w-8 text-slate-100" />
                    <p className="text-xl">{navItem.navItemName}</p>
                  </a>
                </div>
              </div>
            );
          })}
        </nav>
      </header>
    );
  }
  return (
    <>
      <header className="max-w-3xl p-4">
        <nav className="flex h-full flex-col justify-between">
          <div className="flex flex-col gap-2">
            <a
              href="#"
              className="w-fit rounded-full p-2 duration-150 ease-in hover:bg-zinc-900"
            >
              <TwooterIcon />
              <p className="sr-only">Home</p>
            </a>
            {navigationItemsLoggedIn.map((navItem) => {
              return (
                <div key={`${navItem.navItemName}-${uuidV4()}`} className="">
                  <div
                    className="tooltip tooltip-bottom block xl:hidden"
                    data-tip={navItem.navItemName}
                  >
                    <a
                      href="#"
                      className="flex w-fit items-center gap-4 rounded-full p-2 duration-150 ease-in hover:bg-zinc-900"
                    >
                      <navItem.navItemIcon className="h-8 w-8 text-slate-100" />
                      <p className="sr-only">{navItem.navItemName}</p>
                    </a>
                  </div>
                  <div className="hidden xl:block">
                    <a
                      href="#"
                      className="flex w-fit items-center gap-4 rounded-full p-2 duration-150 ease-in hover:bg-zinc-900 xl:pr-6"
                    >
                      <navItem.navItemIcon className="h-8 w-8 text-slate-100" />
                      <p className="text-xl">{navItem.navItemName}</p>
                    </a>
                  </div>
                </div>
              );
            })}
            <button
              className="tooltip tooltip-top flex w-fit items-center rounded-full bg-bright-pink p-2 duration-150 ease-in hover:bg-pink-700"
              data-tip="Tweet"
              onClick={() => setTweetModalOpen(true)}
            >
              <PencilSquareIcon className="h-8 w-8" />
            </button>
          </div>
          <div
            className="tooltip tooltip-top flex justify-center rounded-full p-2 duration-150 ease-in hover:bg-zinc-900"
            data-tip="Account"
          >
            <UserButton />
          </div>
        </nav>
      </header>
      <TweetModal
        tweetModalOpen={tweetModalOpen}
        setTweetModalOpen={setTweetModalOpen}
      />
    </>
  );
};

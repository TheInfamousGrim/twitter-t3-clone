import { useUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
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

export const SideNavigation = () => {
  // Tweet modal state
  const [tweetModalOpen, setTweetModalOpen] = useState(false);

  // Check if the user is signed in
  const { user, isSignedIn, isLoaded } = useUser();

  // Nav Link Data
  const navigationItemsLoggedOut = [
    {
      navItemName: 'Explore',
      navItemIcon: HashtagIcon,
      href: '#',
    },
    {
      navItemName: 'Settings',
      navItemIcon: Cog6ToothIcon,
      href: '#',
    },
  ];

  /* --------------------------- Unauthorized Navbar -------------------------- */
  if (!user || !isSignedIn || !isLoaded || !user.username) {
    return (
      <header className="fixed top-0 left-0 mr-5 min-w-[68px]  p-4 xl:w-72">
        <nav className="flex h-full flex-col items-center justify-between">
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="w-fit rounded-full p-2 duration-150 ease-in hover:bg-zinc-900"
            >
              <TwooterIcon />
            </Link>
            {navigationItemsLoggedOut.map((navItem) => {
              return (
                <div key={`${navItem.navItemName}-${uuidV4()}`} className="">
                  <div
                    className="tooltip tooltip-bottom block xl:hidden"
                    data-tip={navItem.navItemName}
                  >
                    <Link
                      href={navItem.href}
                      className="flex w-fit items-center gap-4 rounded-full p-2 duration-150 ease-in hover:bg-zinc-900 xl:pr-6"
                    >
                      <navItem.navItemIcon className="h-8 w-8 text-slate-100" />
                      <p className="sr-only">{navItem.navItemName}</p>
                    </Link>
                  </div>
                  <div className="hidden xl:block">
                    <Link
                      href={navItem.href}
                      className="flex w-fit items-center gap-4 rounded-full p-2 duration-150 ease-in hover:bg-zinc-900 xl:pr-6"
                    >
                      <navItem.navItemIcon className="h-8 w-8 text-slate-100" />
                      <p className="text-xl">{navItem.navItemName}</p>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </nav>
      </header>
    );
  }

  const navigationItemsLoggedIn = [
    {
      navItemName: 'Home',
      navItemIcon: HomeIcon,
      href: '/',
    },
    {
      navItemName: 'Explore',
      navItemIcon: HashtagIcon,
      href: '#',
    },
    {
      navItemName: 'Notifications',
      navItemIcon: BellIcon,
      href: '#',
    },
    {
      navItemName: 'Messages',
      navItemIcon: EnvelopeIcon,
      href: '#',
    },
    {
      navItemName: 'Bookmarks',
      navItemIcon: BookmarkIcon,
      href: '#',
    },
    {
      navItemName: 'Profile',
      navItemIcon: UserIcon,
      href: `/@${user?.username}`,
    },
    {
      navItemName: 'More',
      navItemIcon: EllipsisHorizontalCircleIcon,
      href: '#',
    },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 min-w-[68px] p-4 xl:w-72">
        <nav className="flex h-full flex-col items-center justify-between">
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="w-fit rounded-full p-2 duration-150 ease-in hover:bg-zinc-900"
            >
              <TwooterIcon />
              <p className="sr-only">Home</p>
            </Link>
            {navigationItemsLoggedIn.map((navItem) => {
              return (
                <div key={`${navItem.navItemName}-${uuidV4()}`} className="">
                  <div
                    className="tooltip tooltip-bottom block xl:hidden"
                    data-tip={navItem.navItemName}
                  >
                    <Link
                      href={navItem.href}
                      className="flex w-fit items-center gap-4 rounded-full p-2 duration-150 ease-in hover:bg-zinc-900"
                    >
                      <navItem.navItemIcon className="h-8 w-8 text-slate-100" />
                      <p className="sr-only">{navItem.navItemName}</p>
                    </Link>
                  </div>
                  <div className="hidden xl:block">
                    <Link
                      href={navItem.href}
                      className="flex w-fit items-center gap-4 rounded-full p-2 duration-150 ease-in hover:bg-zinc-900 xl:pr-6"
                    >
                      <navItem.navItemIcon className="h-8 w-8 text-slate-100" />
                      <p className="text-xl">{navItem.navItemName}</p>
                    </Link>
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
          <UserButton
            showName={true}
            appearance={{
              elements: {
                rootBox: 'xl:w-[192px]',
                userButtonBox:
                  'flex-row-reverse mt-2 justify-start xl:justify-end w-full',
                userButtonOuterIdentifier:
                  'text-white font-bold text-lg hidden xl:block',
                userButtonTrigger:
                  'tooltip tooltip-top rounded-full p-2 duration-150 ease-in hover:bg-zinc-900',
              },
            }}
          />
        </nav>
      </header>
      <TweetModal
        tweetModalOpen={tweetModalOpen}
        setTweetModalOpen={setTweetModalOpen}
      />
    </>
  );
};

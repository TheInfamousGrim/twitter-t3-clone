import { useUser, UserButton } from '@clerk/nextjs';
import { v4 as uuidV4 } from 'uuid';

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
} from '@heroicons/react/24/solid';
import { Cog6ToothIcon as Cog6ToothIconOutline } from '@heroicons/react/24/outline';

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
    <header className="max-w-3xl p-4">
      <nav className="flex flex-col gap-2">
        <a
          href="#"
          className="w-fit rounded-full p-2 duration-150 ease-in hover:bg-zinc-900"
        >
          <TwooterIcon />
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
        <UserButton />
      </nav>
    </header>
  );
};

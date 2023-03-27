import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useUser } from '@clerk/nextjs';
import { XMarkIcon, GlobeEuropeAfricaIcon } from '@heroicons/react/24/solid';
import { FaceSmileIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

type TweetModalTypes = {
  tweetModalOpen: boolean;
  setTweetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TweetModal = ({
  tweetModalOpen,
  setTweetModalOpen,
}: TweetModalTypes) => {
  // User state from clerk
  const { user, isLoaded, isSignedIn } = useUser();
  // Input for the tweet
  const [input, setInput] = useState('');

  if (!isLoaded || !isSignedIn) {
    return (
      <Transition.Root show={tweetModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setTweetModalOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-700 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-black px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mb-5 flex flex-col sm:mb-6">
                      <button
                        className="tooltip tooltip-bottom rounded-full p-2 hover:bg-zinc-900"
                        data-tip="Close"
                        onClick={() => setTweetModalOpen(false)}
                      >
                        <XMarkIcon className="h-6 w-6" />
                        <p className="sr-only">Close</p>
                      </button>
                    </div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Payment successful
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Consequatur amet labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => setTweetModalOpen(false)}
                    >
                      Go back to dashboard
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  }

  return (
    <Transition.Root show={tweetModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setTweetModalOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-700 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-full transform gap-3 bg-black px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:rounded-2xl sm:py-2 sm:px-4">
                <div className="">
                  <button
                    className="tooltip tooltip-bottom w-fit rounded-full p-2 hover:bg-zinc-900"
                    data-tip="Close"
                    onClick={() => setTweetModalOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" />
                    <p className="sr-only">Close</p>
                  </button>
                </div>
                <div className="flex w-full gap-4">
                  <div className="mt-4">
                    <img
                      src={user.profileImageUrl}
                      height={48}
                      width={48}
                      alt={user.username ?? 'User profile img'}
                    />
                  </div>
                  <div className="w-full">
                    <div className="mt-3 border-b border-zinc-800 sm:mt-5">
                      <Dialog.Title as="h3" className="sr-only">
                        Create your tweet
                      </Dialog.Title>
                      <textarea
                        rows={6}
                        name="comment"
                        id="comment"
                        placeholder={`What's going on?`}
                        className="block w-full rounded-md border-none bg-transparent text-xl text-gray-100 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bright-pink sm:py-1.5 sm:leading-6"
                        defaultValue={''}
                      />
                      <div className="my-4 flex items-center gap-1">
                        <GlobeEuropeAfricaIcon className="h-4 w-4 text-bright-pink" />
                        <p className="text-sm font-bold text-bright-pink">
                          Everyone can reply
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <button
                        className="tooltip tooltip-bottom w-fit rounded-full p-2 duration-150 ease-in hover:bg-pink-900 hover:bg-opacity-25"
                        data-tip="Emoji"
                      >
                        <FaceSmileIcon className="h-6 w-6 text-bright-pink" />
                        <p className="sr-only">Emoji Picker</p>
                      </button>
                      <button className="w-fit rounded-full bg-bright-pink p-2 text-lg font-bold">
                        Tweet
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
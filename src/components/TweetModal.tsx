// Dependencies
import clsx from 'clsx';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useEditor, EditorContent } from '@tiptap/react';
import { useUser } from '@clerk/nextjs';

// Icons
import { XMarkIcon, GlobeEuropeAfricaIcon } from '@heroicons/react/24/solid';
import {
  ArrowLeftIcon,
  FaceSmileIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

// Components
import { CharacterCounter } from './CharacterCounter';

// Api
import { api } from '~/utils/api';

// TipTap Rich Text Editor
const TweetRichTextEditor = (e) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          'max-h-64 overflow-scroll rounded-md border-none bg-transparent text-xl text-gray-100 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bright-pink sm:py-1.5 sm:leading-6',
      },
    },
    onUpdate({ editor, e }) {
      e.handlerCharacterInput();
    },
    extensions: [
      StarterKit,
      Placeholder.configure({
        emptyEditorClass:
          'text-zinc-500 before:content-[attr(data-placeholder)] float-left h-0 pointer-events-none',
        placeholder: 'Write something',
      }),
    ],
  });

  return <EditorContent editor={editor} />;
};

// Types
type TweetModalTypes = {
  tweetModalOpen: boolean;
  setTweetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
import type { ChangeEvent } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export const TweetModal = ({
  tweetModalOpen,
  setTweetModalOpen,
}: TweetModalTypes) => {
  // User state from clerk
  const { user, isLoaded, isSignedIn } = useUser();
  // Input for the tweet
  const [input, setInput] = useState('');
  const [charCount, setCharCount] = useState(0);

  // User context
  const ctx = api.useContext();

  // Mutation for creating a tweet
  const { mutate, isLoading: isTweeting } = api.tweet.create.useMutation({
    onSuccess: () => {
      setInput('');
      void ctx.tweet.getAll.invalidate();
      setTweetModalOpen(false);
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.text;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0], {
          style: {
            border: '1px solid #f91880',
            backgroundColor: 'black',
            color: '#F3F4F6',
          },
        });
      } else {
        toast.error('Failed to post! Please try again later.', {
          style: {
            border: '1px solid #f91880',
            backgroundColor: 'black',
            color: '#F3F4F6',
          },
        });
      }
    },
  });

  // User Input Event Handler
  const handleCharacterInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // set the input to the
    e.stopPropagation();
    setInput(e.currentTarget.value);

    // set the current char length
    setCharCount(e.currentTarget.value.length);
  };

  // Unauthorized tweet modal
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
                <Dialog.Panel className="relative w-full transform gap-3 bg-black px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:rounded-2xl sm:p-6">
                  <div className="flex justify-between">
                    <button
                      className="tooltip tooltip-bottom hidden w-fit rounded-full p-2 hover:bg-zinc-900 sm:block"
                      data-tip="Close"
                      onClick={() => setTweetModalOpen(false)}
                    >
                      <XMarkIcon className="h-6 w-6" />
                      <p className="sr-only">Close</p>
                    </button>
                    <button
                      className="tooltip tooltip-bottom visible w-fit rounded-full p-2 hover:bg-zinc-900 sm:hidden"
                      data-tip="Go back"
                      onClick={() => setTweetModalOpen(false)}
                    >
                      <ArrowLeftIcon className="h-6 w-6" />
                      <p className="sr-only">Close</p>
                    </button>
                  </div>
                  <div className="flex w-full gap-4">
                    <div className="w-full">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-600 bg-opacity-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6"
                        >
                          {`Looks like you're not signed in 🥺`}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {`You need to sign in, so that you can tweet`}
                          </p>
                        </div>
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
  }

  /* ------------------------- Authorized Tweet Modal ------------------------- */

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
                <div className="flex justify-between">
                  <button
                    className="tooltip tooltip-bottom w-fit rounded-full p-2 hover:bg-zinc-900"
                    data-tip="Close"
                    onClick={() => setTweetModalOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" />
                    <p className="sr-only">Close</p>
                  </button>
                  {isTweeting && <LoadingSpinner size={20} />}
                </div>
                <div className="flex w-full gap-4">
                  <div className="mt-4">
                    <Image
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
                      <TweetRichTextEditor />
                      {/* <textarea
                        rows={6}
                        name="comment"
                        id="comment"
                        placeholder={`What's going on?`}
                        className="block w-full rounded-md border-none bg-transparent text-xl text-gray-100 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bright-pink sm:py-1.5 sm:leading-6"
                        defaultValue={''}
                        value={input}
                        onChange={(e) => handleCharacterInput(e)}
                      /> */}
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
                      <div className="flex items-center gap-4">
                        <CharacterCounter charCount={charCount} />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            mutate({ text: input });
                          }}
                          disabled={
                            (charCount === 0 || charCount > 280) ?? false
                          }
                          className={clsx(
                            'w-fit rounded-full bg-bright-pink p-2 text-lg font-bold',
                            charCount === 0 && 'bg-pink-800 text-gray-400',
                            charCount > 280 && 'bg-pink-800 text-gray-400'
                          )}
                        >
                          Tweet
                        </button>
                      </div>
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

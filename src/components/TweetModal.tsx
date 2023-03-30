// Dependencies
import clsx from 'clsx';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useEditor, EditorContent } from '@tiptap/react';
import HardBreak from '@tiptap/extension-hard-break';
import { useUser } from '@clerk/nextjs';
import {
  useForm,
  SubmitHandler,
  useController,
  Controller,
  useFormState,
} from 'react-hook-form';

// Icons
import { XMarkIcon, GlobeEuropeAfricaIcon } from '@heroicons/react/24/solid';
import {
  ArrowLeftIcon,
  FaceSmileIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

// Components
import { CharacterCounter } from './CharacterCounter';
import { LoadingSpinner } from './LoadingSpinner';

// Api
import { api } from '~/utils/api';

// Types
type TweetModalTypes = {
  tweetModalOpen: boolean;
  setTweetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
type TweetData = {
  text: string;
};

// TipTap Rich Text Editor
const TweetRichTextEditor = (props: {
  text: string;
  onChange: (html: string) => void;
}) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          'max-h-64 max-w-[485px] overflow-scroll rounded-md border-none bg-transparent text-xl text-gray-100 shadow-sm outline-none placeholder:text-gray-400 sm:py-1.5 sm:leading-6',
      },
    },
    content: props.text,
    onUpdate({ editor }) {
      const html = editor.getHTML();
      props.onChange(html);
    },
    extensions: [
      StarterKit,
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => this.editor.commands.setHardBreak(),
          };
        },
      }),
      Placeholder.configure({
        emptyEditorClass:
          'text-zinc-500 before:content-[attr(data-placeholder)] float-left h-0 pointer-events-none',
        placeholder: 'Write something',
      }),
    ],
  });

  return <EditorContent editor={editor} />;
};

export const TweetModal = ({
  tweetModalOpen,
  setTweetModalOpen,
}: TweetModalTypes) => {
  // User state from clerk
  const { user, isLoaded, isSignedIn } = useUser();

  // React Hook Forms
  const form = useForm<TweetData>({
    mode: 'onChange',
    defaultValues: { text: '' },
  });
  const { control, handleSubmit, reset } = form;

  // Input for the tweet
  const [charCount, setCharCount] = useState(0);

  // User context
  const ctx = api.useContext();

  // Toast styles
  const toastStyles = {
    border: '1px solid #f91880',
    backgroundColor: 'black',
    color: '#F3F4F6',
  };

  // Mutation for creating a tweet
  const { mutate, isLoading: isTweeting } = api.tweet.create.useMutation({
    onSuccess: () => {
      reset({ text: '' });
      setCharCount(0);
      void ctx.tweet.getAll.invalidate();
      setTweetModalOpen(false);
      return;
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.text;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0], {
          style: toastStyles,
        });
        return;
      } else {
        toast.error('Failed to post! Please try again later.', {
          style: toastStyles,
        });
        return;
      }
    },
  });

  // On Submit handler
  const onTweetSubmit = (data: TweetData) => {
    const parser = new DOMParser();
    const tweetHTML = parser.parseFromString(data.text, 'text/html');
    const tweetLength = tweetHTML.documentElement.textContent?.length;

    // Form validation
    if (tweetLength === undefined) {
      toast.error('Something went wrong, please try again', {
        style: toastStyles,
      });
      return;
    }

    if (tweetLength === 0) {
      toast.error('Twoot needs to be at least 1 characters long', {
        style: toastStyles,
      });
      return;
    }

    if (tweetLength > 280) {
      toast.error('Twoot is too long, max limit is 280 characters', {
        style: toastStyles,
      });
      return;
    }

    mutate({ text: data.text });
    return;
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
                    className="tooltip tooltip-bottom hidden w-fit rounded-full p-2 hover:bg-zinc-900 sm:block"
                    data-tip="Close"
                    type="button"
                    onClick={() => setTweetModalOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" />
                    <p className="sr-only">Close</p>
                  </button>
                  <button
                    className="tooltip tooltip-bottom visible w-fit rounded-full p-2 hover:bg-zinc-900 sm:hidden"
                    data-tip="Go back"
                    type="button"
                    onClick={() => setTweetModalOpen(false)}
                  >
                    <ArrowLeftIcon className="h-6 w-6" />
                    <p className="sr-only">Close</p>
                  </button>
                  {isTweeting && <LoadingSpinner size={20} />}
                </div>
                <form onSubmit={handleSubmit(onTweetSubmit)}>
                  <div className="flex w-full gap-4">
                    <div className="mt-4 w-14">
                      <Image
                        src={user.profileImageUrl}
                        height={48}
                        width={48}
                        className="h-12 w-12 rounded-full"
                        alt={user.username ?? 'User profile img'}
                      />
                    </div>
                    <div className="w-full">
                      <div className="mt-3 border-b border-zinc-800 sm:mt-5">
                        <Dialog.Title as="h3" className="sr-only">
                          Create your tweet
                        </Dialog.Title>
                        <Controller
                          control={control}
                          name="text"
                          render={({ field }) => (
                            <TweetRichTextEditor
                              text={field.value}
                              onChange={(html: string) => {
                                const parser = new DOMParser();
                                const tweetHTML = parser.parseFromString(
                                  html,
                                  'text/html'
                                );
                                const tweetLength =
                                  tweetHTML.documentElement.textContent?.length;
                                if (tweetLength) {
                                  setCharCount(tweetLength);
                                }
                                field.onChange(html);
                              }}
                            />
                          )}
                          defaultValue=""
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
                        <div className="flex items-center gap-4">
                          <CharacterCounter charCount={charCount} />
                          <button
                            type="submit"
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
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

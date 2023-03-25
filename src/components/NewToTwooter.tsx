// Dependencies
import { SignUpButton } from '@clerk/nextjs';

// Components
import { TextLink } from './TextLink';

export const NewToTwooter = () => {
  return (
    <div className="hidden max-w-xs p-6 lg:block">
      <div className="relative isolate flex max-w-xs flex-col items-start justify-start gap-3 overflow-hidden border border-zinc-800 py-4 px-3 shadow-2xl sm:rounded-3xl">
        <h2 className="max-w-2xl text-2xl font-bold text-white">
          New to Twooter?
        </h2>
        <p className="text-sm text-gray-300">
          Sign up now to get the joy of arguing with strangers online!
        </p>

        <div className="rounded-full  bg-slate-100 py-1.5 px-3.5 text-base font-bold text-stone-900 shadow-sm duration-150 ease-in hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300">
          <SignUpButton />
        </div>
        <div>
          <p className="text-sm text-gray-300">
            {`By signing up, you agree to the `}
            <TextLink text="Terms of Service" href="#" />
            {` and `}
            <TextLink text="Privacy Policy" href="#" />
            {`, including `}
            <TextLink text="Cookie Use" href="#" />
          </p>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-zinc-500">
          &copy; {new Date().getFullYear().toString()}
          {' Twooter, inc'}
        </p>
      </div>
    </div>
  );
};

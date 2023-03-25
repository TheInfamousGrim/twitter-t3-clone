import { SignInButton, SignUpButton } from '@clerk/nextjs';

export const AuthFooter = () => {
  return (
    <footer className="fixed right-0 left-0 bottom-0 flex justify-center bg-bright-pink py-4 px-10 text-gray-100 sm:justify-between ">
      <div className="ml- hidden sm:block">
        <h3 className="text-2xl font-bold">{`Don't miss what's happening`}</h3>
        <p>{`People on Twitter are the first to know`}</p>
      </div>
      <div className="flex items-center gap-5">
        <div className="rounded-full border border-gray-300 bg-transparent py-1.5 px-3.5 text-base font-bold text-gray-100 shadow-sm duration-150 ease-in hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300">
          <SignInButton />
        </div>

        <div className="rounded-full bg-slate-100 py-1.5 px-3.5 text-base font-bold text-stone-900 shadow-sm duration-150 ease-in hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300">
          <SignUpButton />
        </div>
      </div>
    </footer>
  );
};

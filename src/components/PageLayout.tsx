import { type PropsWithChildren } from 'react';

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="ml-20 flex h-full grow flex-col overscroll-none md:ml-0 md:grow-0">
      <section className="h-full w-full max-w-[600px] border-x border-zinc-800 md:w-[600px]">
        {props.children}
      </section>
    </main>
  );
};

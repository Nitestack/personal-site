import { type FC, type ReactNode } from "react";

const Layout: FC<{
  title: string;
  description: string;
  children: ReactNode;
}> = ({ title, description, children }) => {
  return (
    <div className="mt-4 space-y-6 md:mt-8 md:space-y-12 lg:mt-12">
      <section className="text-center">
        <h1 className="text-3xl font-extrabold tracking-wide sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-2 text-balance md:text-lg">{description}</p>
      </section>
      {children}
    </div>
  );
};

export default Layout;

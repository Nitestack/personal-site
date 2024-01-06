import { Github, Twitter } from "lucide-react";
import Link from "next/link";
import { type FC } from "react";

const Footer: FC = () => {
  return (
    <footer>
      <div className="container mx-auto px-6 py-4 text-center text-white">
        <h3 className="text-xl font-bold">Let's Connect</h3>
        <p className="mt-2">Email: nhan.pham@mail.de</p>
        <div className="flex justify-center mt-4 space-x-2">
          <Link
            target="_blank"
            className="text-white hover:text-gray-300"
            href="/twitter"
          >
            <Twitter className="h-6 w-6" />
          </Link>
          <Link
            target="_blank"
            className="text-white hover:text-gray-300"
            href="/github"
          >
            <Github className="h-6 w-6" />
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-300">
          © {new Date().getFullYear()} Nhan Pham. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

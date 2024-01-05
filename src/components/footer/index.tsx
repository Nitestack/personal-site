import { Link } from "@navigation";
import { Github, Linkedin, Twitter } from "lucide-react";
import { type FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-gray-900">
      <div className="container mx-auto px-6 py-4 text-center text-white">
        <h3 className="text-xl font-bold">Let's Connect</h3>
        <p className="mt-2">Email: nhan.pham@mail.de</p>
        <div className="flex justify-center mt-4 space-x-2">
          <Link
            className="text-white hover:text-gray-300"
            href="https://x.com/nitestack"
          >
            <Twitter className="h-6 w-6" />
          </Link>
          <Link className="text-white hover:text-gray-300" href="#">
            <Linkedin className="h-6 w-6" />
          </Link>
          <Link
            className="text-white hover:text-gray-300"
            href="https://github.com/Nitestack"
          >
            <Github className="h-6 w-6" />
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-300">
          © Nhan Pham. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import { NavLink } from "react-router-dom";

const Footer = () => {
  
  return (
    <footer className="w-full bg-black text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & description */}
        <div>
          <h2 className="text-2xl font-bold text-white">ByteBlog</h2>
          <p className="mt-3 text-sm text-gray-400">
            A developer-focused blog to share knowledge, tutorials, and
            real-world coding experiences.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink
                to="/"
                className="hover:text-white transition-colors"
              >
                Home
              </NavLink>
            </li>
          </ul>
        </div>

        {/* CTA / Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Stay Connected</h3>
          <p className="text-sm text-gray-400 mb-3">
            Follow for updates and new posts.
          </p>
          <div className="flex gap-4 text-sm">
            <button className="hover:text-white transition-colors"><a href="https://github.com/akashsingh062/ByteBlogs">Github</a></button>
            <button className="hover:text-white transition-colors"><a href="https://www.linkedin.com/in/akashsingh062/">LinkedIn</a></button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} ByteBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

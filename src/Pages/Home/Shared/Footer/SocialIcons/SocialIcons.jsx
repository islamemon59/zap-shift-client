import { FaLinkedin, FaTwitter, FaGithub, FaFacebook } from "react-icons/fa";

const SocialIcons = () => {
  return (
    <div className="flex gap-4 items-center">
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="w-6 h-6 text-[#0A66C2] hover:scale-110 transition" />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter className="w-6 h-6 text-[#1DA1F2] hover:scale-110 transition" />
      </a>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
        <FaGithub className="w-6 h-6 text-gray-300 hover:scale-110 transition" />
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook className="w-6 h-6 text-[#1877F2] rounded-full hover:scale-110 transition" />
      </a>
    </div>
  );
};

export default SocialIcons;

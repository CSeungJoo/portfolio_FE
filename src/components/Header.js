import "../styles/header.css";

const Header = ({nickname}) => {
  return (
    <header>
      <span>{nickname}.PORTFOLIO</span>
      <ul>
        <li>
          <a href={`${nickname}#profile`} className="hover:text-gray-400">PROFILE</a>
        </li>
        <li>
          <a href={`${nickname}#skills`} className="hover:text-gray-400">SKILLS</a>
        </li>
        <li>
          <a href={`${nickname}#projects`} className="hover:text-gray-400">PROJECTS</a>
        </li>
        <li>
          <a href={`${nickname}#awards`} className="hover:text-gray-400">AWARDS</a>
        </li>
      </ul>
    </header>
  );
};

export default Header;

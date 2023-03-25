type TextLinkTypes = {
  text: string;
  href: string;
  color?: 'gray' | 'pink';
};

export const TextLink = ({ text, href }: TextLinkTypes) => {
  return (
    <a href={href}>
      <span className="text-bright-pink hover:underline">{text}</span>
    </a>
  );
};

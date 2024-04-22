type AuthHeaderProps = {
  children?: never;
  text: string;
};

export function AuthHeader({ text }: AuthHeaderProps) {
  return <h1 className="text-4xl font-bold text-center">{text}</h1>;
}

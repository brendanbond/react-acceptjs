import usePrism from '../hooks/usePrism';

const CodeBlock = ({
  language,
  children,
}: {
  language: string;
  children: string;
}) => {
  usePrism();
  return (
    <div>
      <pre className="bg-light">
        <code className={`language-${language}`}>{children}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;

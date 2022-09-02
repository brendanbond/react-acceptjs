const ResponseBlock = ({ response }: { response: string }) => {
  return (
    <>
      <label className="form-label">Response</label>
      <pre
        className="bg-light"
        style={{ width: '100%', height: '210px', marginTop: 0 }}
      >
        <code className="language-json">{response}</code>
      </pre>
    </>
  );
};

export default ResponseBlock;

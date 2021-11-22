import * as React from 'react';

const cachedScripts: string[] = [];

function useScript(
  url: string,
  async = true,
  appendToHeadOrBody: 'head' | 'body' = 'head'
) {
  const [state, setState] = React.useState({
    loaded: false,
    error: false,
  });

  React.useEffect(() => {
    if (cachedScripts.includes(url)) {
      setState({
        loaded: true,
        error: false,
      });
    } else {
      cachedScripts.push(url);

      const script = document.createElement('script');
      script.src = url;
      script.async = async;

      const onScriptLoad = () => {
        setState({
          loaded: true,
          error: false,
        });
      };

      const onScriptError = () => {
        const index = cachedScripts.indexOf(url);
        if (index >= 0) cachedScripts.splice(index, 1);
        script.remove();

        setState({
          loaded: true,
          error: true,
        });
      };

      script.addEventListener('load', onScriptLoad);
      script.addEventListener('error', onScriptError);

      appendToHeadOrBody === 'head'
        ? document.head.appendChild(script)
        : document.body.appendChild(script);

      return () => {
        script.removeEventListener('load', onScriptLoad);
        script.removeEventListener('error', onScriptError);
      };
    }
    return undefined;
  }, [url, async, appendToHeadOrBody]);

  return [state.loaded, state.error];
}

export default useScript;

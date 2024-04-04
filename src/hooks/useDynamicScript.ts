import * as React from 'react';

/**
 * `useDynamicScript()` is similar to `useScript()` - the key difference
 * being `useDynamicScript()` will remove the `<script>` tag from the DOM
 * before the component is removed.
 */
function useDynamicScript(
  url: string,
  async = true,
  appendToHeadOrBody: 'head' | 'body' = 'head'
) {
  const [state, setState] = React.useState({
    loaded: false,
    error: false,
  });

  React.useEffect(() => {
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
      script.remove();
    };
  }, [url, async, appendToHeadOrBody]);

  return [state.loaded, state.error];
}

export default useDynamicScript;

import { useEffect } from 'react';

const usePrism = () => {
  useEffect(() => {
    window.Prism.highlightAll();
  });
};

export default usePrism;

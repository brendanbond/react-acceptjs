import { Toast } from 'bootstrap';

declare global {
  interface Window {
    Prism: {
      highlightAll: () => void;
    };
    bootstrap: {
      Toast: Toast;
    };
  }
}

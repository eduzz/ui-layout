import { type ReactNode, useState, useLayoutEffect, type ReactPortal } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  target: string | HTMLElement;
}

function createWrapper(id: string) {
  const element = document.createElement('div');
  element.setAttribute('id', id);
  element.classList.add('eduzz-ui-layout-portal');
  document.body.appendChild(element);
  return element;
}

const Portal = ({ children, target }: PortalProps) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(() =>
    typeof target !== 'string' ? target : null
  );

  useLayoutEffect(() => {
    if (typeof target !== 'string') {
      return;
    }

    let element = document.getElementById(target);
    let created = false;

    if (!element) {
      created = true;
      element = createWrapper(target);
    }

    setWrapperElement(element);

    return () => {
      if (created && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [target]);

  if (!wrapperElement) return null;
  return createPortal(children, wrapperElement) as ReactPortal;
};

export default Portal;

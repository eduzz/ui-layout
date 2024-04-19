import { ReactNode, memo, useCallback, useMemo, useRef, useState } from 'react';

import { useContextSelector } from 'use-context-selector';

import TopbarActionsContext, { TopbarActionsContextType } from './context';
import useBoolean from '../../hooks/useBoolean';
import useClickOutside from '../../hooks/useClickOutside';
import IconChevronLeft from '../../Icons/ChevronLeft';
import { cn } from '../../utils/cn';
import Action from '../Action';
import TopbarContext from '../context';

import './styles.css';

interface ActionsProps {
  children: ReactNode;
}

const Actions = ({ children }: ActionsProps) => {
  const [actions, setActions] = useState<Parameters<TopbarActionsContextType>[0][]>([]);
  const [expanded, toggleExpanded, , closeExpanded] = useBoolean(false);

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, closeExpanded, []);

  const hasUser = useContextSelector(TopbarContext, context => !!context.user);

  const registerAction: TopbarActionsContextType = useCallback(action => {
    setActions(actions => [...actions, action]);

    return () => setActions(actions => actions.filter(a => a !== action));
  }, []);

  const badgeCount = useMemo(() => actions.reduce((acc, a) => acc + a.badgeCount, 0), [actions]);
  const badgeDot = useMemo(() => actions.some(a => a.badgeDot), [actions]);

  return (
    <div
      ref={ref}
      className={cn('eduzz-ui-layout-topbar-actions', {
        '--eduzz-ui-layout-enabled': actions.length > 2,
        '--eduzz-ui-layout-has-user': hasUser,
        '--eduzz-ui-layout-expanded': expanded
      })}
    >
      <div className='eduzz-ui-layout-topbar-actions-content'>
        <Action
          className='eduzz-ui-layout-topbar-actions-content-expand'
          badgeCount={expanded ? 0 : badgeCount}
          badgeDot={expanded ? false : badgeDot}
          icon={<IconChevronLeft size={19} className={cn({ 'rotate-180': expanded })} />}
          onClick={toggleExpanded}
        />
        <TopbarActionsContext.Provider value={registerAction}>
          <div className='eduzz-ui-layout-topbar-actions-content-icons'>{children}</div>
        </TopbarActionsContext.Provider>
      </div>
    </div>
  );
};

export default memo(Actions);

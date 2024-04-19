import { memo, useRef } from 'react';

import { useContextSelector } from 'use-context-selector';

import Avatar from '../../Avatar';
import LayoutContext from '../../context';
import useClickOutside from '../../hooks/useClickOutside';
import useEscapeKey from '../../hooks/useEscapeKey';
import IconCaretDown from '../../Icons/CaretDown';
import { cn } from '../../utils/cn';
import Action from '../Action';
import TopbarContext from '../context';

const User = memo(() => {
  const wrapperMenuUser = useRef<HTMLDivElement>(null);
  const user = useContextSelector(TopbarContext, context => context.user);

  const opened = useContextSelector(LayoutContext, context => context.userMenu.opened);
  const hasMenu = useContextSelector(LayoutContext, context => context.userMenu.exists);
  const toogleOpened = useContextSelector(LayoutContext, context => context.userMenu.toogleOpened);
  const falseOpened = useContextSelector(LayoutContext, context => context.userMenu.falseOpened);
  const registerContainer = useContextSelector(LayoutContext, context => context.userMenu.registerContainerPortal);

  useClickOutside(wrapperMenuUser, () => hasMenu && falseOpened(), [hasMenu]);
  useEscapeKey(() => hasMenu && falseOpened(), [hasMenu]);

  if (!user) {
    return null;
  }

  return (
    <div
      ref={wrapperMenuUser}
      className={cn('uizz-layout-pointer-events-none uizz-layout-relative uizz-layout-z-[1100] uizz-layout-ml-2', {
        '!uizz-layout-pointer-events-auto': hasMenu
      })}
    >
      <Action
        active={hasMenu && opened}
        icon={<Avatar src={user.avatar}>{user.name}</Avatar>}
        className='[&_.eduzz-ui-layout-topbar-action-button-text]:uizz-layout-font-bold'
        right={
          hasMenu && (
            <IconCaretDown
              size={16}
              className={cn('uizz-layout-hidden  md:uizz-layout-inline-block', { 'rotate-180': opened })}
            />
          )
        }
        label={user.name}
        onClick={toogleOpened}
      />

      <div ref={registerContainer} />
    </div>
  );
});

export default User;

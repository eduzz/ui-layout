import { HTMLAttributes, memo, useRef } from 'react';

import { useContextSelector } from 'use-context-selector';

import Dropdown from './Dropdown';
import useBoolean from '../../hooks/useBoolean';
import useClickOutside from '../../hooks/useClickOutside';
import useEscapeKey from '../../hooks/useEscapeKey';
import usePromise from '../../hooks/usePromise';
import IconApps from '../../Icons/Apps';
import Action from '../Action';
import TopbarContext from '../context';

export type TopbarApplication = HTMLAttributes<HTMLDivElement> & {
  application: string;
  label: string;
  icon: string;
  beta?: boolean;
  description?: string;
  url: string;
};

type TopbarAppsProps = {
  id?: string;
};

const getEnvironment = (): 'prod' | 'dev' | 'qa' => {
  const host = window.location.host;

  if (host.includes('testzz.ninja')) return 'qa';

  if (host.includes('devopzz.ninja') || host.includes('localhost')) return 'dev';

  return 'prod';
};

const getApplicationList = async () => {
  const fileName = {
    prod: 'applications.json',
    dev: 'applications_dev.json',
    qa: 'applications_qa.json'
  }[getEnvironment()];

  const request = await fetch(`https://cdn.eduzzcdn.com/topbar/${fileName}`);
  return (await request.json()) as TopbarApplication[];
};

const TopbarApps = memo<TopbarAppsProps>(({ id, ...rest }) => {
  const isSupport = useContextSelector(TopbarContext, context => context.user?.isSupport ?? false);
  const currentApplication = useContextSelector(TopbarContext, context => context.currentApplication);

  const [openedDropdown, toogleDropdown, , closeDropdown] = useBoolean();
  const wrapperDropdownRef = useRef<HTMLDivElement>(null);

  const [applications] = usePromise(async () => {
    const applications = await getApplicationList();

    return applications.filter(app => {
      if (!app.beta) return true;
      if (isSupport) return true;
      return app.application === currentApplication;
    });
  }, [currentApplication, isSupport]);

  useClickOutside(wrapperDropdownRef, closeDropdown, []);

  useEscapeKey(() => {
    if (!openedDropdown) return;
    closeDropdown();
  }, [openedDropdown]);

  return (
    <div id={`eduzz-ui-layout-topbar-apps${id ?? ''}`} ref={wrapperDropdownRef} {...rest}>
      <Action icon={<IconApps size={19} />} active={openedDropdown} onClick={toogleDropdown} />

      <Dropdown
        applications={applications}
        currentApplication={currentApplication}
        opened={openedDropdown}
        onClose={closeDropdown}
      />
    </div>
  );
});

export default TopbarApps;

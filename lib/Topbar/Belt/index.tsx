import * as React from 'react';

import { Typography } from 'antd';

import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { useContextSelector } from 'use-context-selector';

import BeltIcon from '../../Icons/Belt';
import { beltColor, beltForegroundColor } from '../../utils/beltColor';
import TopbarContext from '../context';

const supportedBelts = ['white', 'red', 'orange', 'green', 'black', 'golden'];

const Belt = React.memo(({ className }: { className?: string }) => {
  const belt = useContextSelector(TopbarContext, context => context.user?.belt);

  const [beltColor, setBeltColor] = React.useState('');
  const [beltClass, setBeltClass] = React.useState('');

  React.useEffect(() => {
    if (!belt) {
      setBeltColor('');
      setBeltClass('');
      return;
    }

    const nameBeltClass = belt.toString().toLowerCase().split(' ')[0];

    const classBelt = supportedBelts.includes(nameBeltClass)
      ? nameBeltClass
      : nameBeltClass === 'sensei'
      ? 'black'
      : 'white';

    setBeltColor(belt);
    setBeltClass(classBelt);
  }, [belt]);

  if (!beltColor) {
    return null;
  }

  return (
    <div className={cx(className, `ui-eduzz-layout-topbar-belt-color-${beltClass}`)}>
      <div className='ui-eduzz-layout-topbar-belt-badge'>
        <BeltIcon size={25} className='ui-eduzz-layout-topbar-belt-icon' />
        <Typography className='ui-eduzz-layout-topbar-belt-text'>{beltColor}</Typography>
      </div>
    </div>
  );
});

export default styled(Belt, { label: 'ui-eduzz-layout-topbar-belt' })`
  color: white;
  display: flex;
  align-items: center;
  padding: 8px 16px 8px 16px;
  border-radius: 16px;
  border-top-left-radius: 0;
  border-bottom-right-radius: 0;
  margin-right: 1.5rem;
  height: 2rem;

  @media (max-width: 991px) {
    display: none;
  }

  @media (max-width: 1199px) {
    padding: 8px 10px 8px 10px;
    border-top-left-radius: 0;
    border-bottom-right-radius: 0;

    & .ui-eduzz-layout-topbar-belt-text {
      display: none;
    }
  }

  &.none {
    display: none;
  }

  &.ui-eduzz-layout-topbar-belt-color-white {
    background-color: ${beltColor.white};
    color: ${beltColor.white};

    .ui-eduzz-layout-topbar-belt-badge {
      color: ${beltForegroundColor.white};
    }
  }

  &.ui-eduzz-layout-topbar-belt-color-red {
    background-color: ${beltColor.red};
    color: ${beltColor.red};

    .ui-eduzz-layout-topbar-belt-badge {
      color: ${beltForegroundColor.red};
    }
  }

  &.ui-eduzz-layout-topbar-belt-color-orange {
    background-color: ${beltColor.orange};
    color: ${beltColor.orange};

    .ui-eduzz-layout-topbar-belt-badge {
      color: ${beltForegroundColor.orange};
    }
  }

  &.ui-eduzz-layout-topbar-belt-color-green {
    background-color: ${beltColor.green};
    color: ${beltColor.green};

    .ui-eduzz-layout-topbar-belt-badge {
      color: ${beltForegroundColor.green};
    }
  }

  &.ui-eduzz-layout-topbar-belt-color-black {
    background-color: ${beltColor.black};
    color: ${beltColor.black};

    .ui-eduzz-layout-topbar-belt-badge {
      color: ${beltForegroundColor.black};
    }
  }

  &.ui-eduzz-layout-topbar-belt-color-golden {
    background-color: ${beltColor.golden};
    color: ${beltColor.golden};

    .ui-eduzz-layout-topbar-belt-badge {
      color: ${beltForegroundColor.golden};
    }
  }

  .ui-eduzz-layout-topbar-belt-badge {
    display: flex;
    align-items: center;

    & > .ui-eduzz-layout-topbar-belt-text {
      color: inherit;
      white-space: nowrap;
      text-transform: uppercase;
      font-style: italic;
      font-size: 14px;
      margin-left: 0.25rem;
    }
  }

  .ui-eduzz-layout-topbar-belt-icon {
    min-width: 2rem;
    display: flex;
    align-items: center;
  }
`;

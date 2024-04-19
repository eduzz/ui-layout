import { memo, useEffect, useState } from 'react';

import { useContextSelector } from 'use-context-selector';

import BeltIcon from '../../Icons/Belt';
import { cn } from '../../utils/cn';
import TopbarContext from '../context';

import './style.css';

const supportedBelts = ['white', 'red', 'orange', 'green', 'black', 'golden'];

const Belt = memo(() => {
  const belt = useContextSelector(TopbarContext, context => context.user?.belt);

  const [beltColor, setBeltColor] = useState('');
  const [beltClass, setBeltClass] = useState('');

  useEffect(() => {
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
    <div className={cn('eduzz-ui-layout-topbar-belt', `eduzz-ui-layout-topbar-belt-color-${beltClass}`)}>
      <div className='eduzz-ui-layout-topbar-belt-badge'>
        <BeltIcon size={25} className='eduzz-ui-layout-topbar-belt-icon' />
        <p className='eduzz-ui-layout-topbar-belt-text'>{beltColor}</p>
      </div>
    </div>
  );
});

export default Belt;

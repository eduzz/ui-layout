import { createContext } from 'use-context-selector';

export interface SidebarGroupWithGroupSwitcherContextType {
  selectedGroup: string;
}

const SidebarGroupWithGroupSwitcherContext = createContext<SidebarGroupWithGroupSwitcherContextType>({
  selectedGroup: ''
});

export default SidebarGroupWithGroupSwitcherContext;

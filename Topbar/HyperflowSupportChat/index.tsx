import HyperflowSupportChat from './chat';
import { TopbarHyperflowSupportChatProps } from './types';

const TopbarHyperflowSupportChat = ({
  jwtToHyperflow,
  currentUser,
  hyperflowConfig
}: TopbarHyperflowSupportChatProps) => {
  if (!jwtToHyperflow) return null;
  return (
    <HyperflowSupportChat jwtToHyperflow={jwtToHyperflow} currentUser={currentUser} hyperflowConfig={hyperflowConfig} />
  );
};

export default TopbarHyperflowSupportChat;

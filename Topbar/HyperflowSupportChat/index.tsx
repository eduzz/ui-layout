import HyperflowSupportChat from './chat';
import { TopbarHyperflowSupportChatProps } from './types';

const TopbarHyperflowSupportChat = ({
  getJwtPromise,
  currentUser,
  hyperflowConfig
}: TopbarHyperflowSupportChatProps) => {
  return (
    <HyperflowSupportChat getJwtPromise={getJwtPromise} currentUser={currentUser} hyperflowConfig={hyperflowConfig} />
  );
};

export default TopbarHyperflowSupportChat;

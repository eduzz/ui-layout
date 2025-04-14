import HyperflowSupportChat from './chat';
import { type TopbarHyperflowSupportChatProps } from './types';

const TopbarHyperflowSupportChat = ({
  accountsJwt,
  currentUser,
  hyperflowConfig,
  hyperflowJwt
}: TopbarHyperflowSupportChatProps) => {
  return (
    <HyperflowSupportChat
      accountsJwt={accountsJwt}
      currentUser={currentUser}
      hyperflowConfig={hyperflowConfig}
      hyperflowJwt={hyperflowJwt}
    />
  );
};

export default TopbarHyperflowSupportChat;

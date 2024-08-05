import HyperflowSupportChat from './chat';

export interface TopbarHyperflowSupportChatProps {
  jwtToHyperflow?: string;
  currentUser?: any;
  hyperflowConfig?: any;
}

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

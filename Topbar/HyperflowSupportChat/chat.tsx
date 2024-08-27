import useExternalScript from './import';
import { CurrentUser, HyperflowConfig, HyperflowParams, SupportChatProps } from './types';

function getChatTokenID(currentUser: CurrentUser, hyperflowConfig: HyperflowConfig) {
  const chatUnityID = hyperflowConfig.chatUnityID;
  const chatBlackID = hyperflowConfig.chatBlackID;
  const chatEliteID = hyperflowConfig.chatEliteID;
  const beltsCanViewChatBlack = ['Black', 'Golden', 'Sensei'];
  const beltUserCanViewChatBlack = beltsCanViewChatBlack.includes((currentUser?.belt || '').split(' ')[0]);

  if (currentUser?.tag === 'unity') return chatUnityID;
  if (beltUserCanViewChatBlack || currentUser?.isClubeBlack) return chatBlackID;
  return chatEliteID;
}

const HyperflowSupportChat: React.FC<SupportChatProps> = ({ jwtToHyperflow, currentUser, hyperflowConfig }) => {
  const hyperflow = useExternalScript('https://webchat.hyperflow.global/sdk.js');
  const chatToken = getChatTokenID(currentUser, hyperflowConfig);

  if (hyperflow !== 'ready') {
    return null;
  }

  Hyperflow.init(chatToken).on('getStarted', () => {
    const params: HyperflowParams = {
      id: currentUser.id,
      name: currentUser.name.split(' ')[0],
      email: currentUser.email,
      sender: jwtToHyperflow,
      origin: hyperflowConfig.origin
    };

    if (currentUser?.isAccessPolicy) {
      params.original_id = currentUser?.originalUserId;
      params.original_name = currentUser?.originalUserName?.split(' ')[0];
      params.original_email = currentUser?.originalUserEmail;
    }

    Hyperflow.initFlow(hyperflowConfig.flowId, params);
  });
};

export default HyperflowSupportChat;

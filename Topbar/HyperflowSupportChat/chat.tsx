import { useEffect } from 'react';

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

const HyperflowSupportChat: React.FC<SupportChatProps> = ({
  accountsJwt,
  currentUser,
  hyperflowConfig,
  hyperflowJwt
}) => {
  const hyperflow = useExternalScript('https://webchat.hyperflow.global/sdk.js');
  const chatToken = getChatTokenID(currentUser, hyperflowConfig);

  useEffect(() => {
    if (typeof Hyperflow === 'undefined') {
      return;
    }

    Hyperflow.reinit(chatToken, { sender: hyperflowJwt }).on('getStarted', async () => {
      try {
        const jwt = await accountsJwt();
        const params: HyperflowParams = {
          id: currentUser.id,
          name: currentUser.name.split(' ')[0],
          email: currentUser.email,
          sender: jwt,
          origin: hyperflowConfig.origin
        };

        if (currentUser?.isAccessPolicy) {
          params.original_id = currentUser?.originalUserId;
          params.original_name = currentUser?.originalUserName?.split(' ')[0];
          params.original_email = currentUser?.originalUserEmail;
        }

        const clonableParams = JSON.parse(JSON.stringify(params));
        Hyperflow.initFlow(hyperflowConfig.flowId, clonableParams);
      } catch (error) {
        console.error('Error getting JWT: ', error);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hyperflow, currentUser?.id]);

  return <div id='hyperflow-chat-container'>Chat is ready</div>;
};

export default HyperflowSupportChat;

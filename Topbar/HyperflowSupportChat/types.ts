export type CurrentUser = {
  tag: string;
  belt: string;
  isClubeBlack: boolean;
  id: number;
  name: string;
  email: string;
  isAccessPolicy: boolean;
} & (
  | {
      isAccessPolicy: true;
      originalUserId: number;
      originalUserName: string;
      originalUserEmail: string;
    }
  | { isAccessPolicy: false }
);

export type HyperflowConfig = {
  chatUnityID: string;
  chatBlackID: string;
  chatEliteID: string;
  flowId: string;
};

export type TopbarHyperflowSupportChatProps = {
  jwtToHyperflow: string;
  currentUser: CurrentUser;
  hyperflowConfig: HyperflowConfig;
};

export type HyperflowParams = {
  id: number;
  name: string;
  email: string;
  original_id?: number;
  original_name?: string;
  original_email?: string;
  sender: string;
};

export type SupportChatProps = {
  jwtToHyperflow: string;
  currentUser: CurrentUser;
  hyperflowConfig: HyperflowConfig;
};

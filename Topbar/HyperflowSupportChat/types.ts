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
  origin: 'blinket' | 'checkout' | 'myeduzz' | 'nutror' | 'orbitpages' | 'safevideo';
};

export type TopbarHyperflowSupportChatProps = {
  accountsJwt: () => Promise<string>;
  currentUser: CurrentUser;
  hyperflowConfig: HyperflowConfig;
  hyperflowJwt: string;
};

export type HyperflowParams = {
  id: number;
  name: string;
  email: string;
  original_id?: number;
  original_name?: string;
  original_email?: string;
  sender: string;
  origin: 'blinket' | 'checkout' | 'myeduzz' | 'nutror' | 'orbitpages' | 'safevideo';
};

export type SupportChatProps = {
  accountsJwt: () => Promise<string>;
  currentUser: CurrentUser;
  hyperflowConfig: HyperflowConfig;
  hyperflowJwt: string;
};

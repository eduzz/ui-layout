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
  origin: OriginType;
};

export type TopbarHyperflowSupportChatProps = {
  jwtToHyperflow: string;
  currentUser: CurrentUser;
  hyperflowConfig: HyperflowConfig;
};

enum OriginType {
  blinket = 'blinket',
  checkout = 'checkout',
  myeduzz = 'myeduzz',
  nutror = 'nutror',
  orbitpages = 'orbitpages',
  safevideo = 'safevideo'
}

export type HyperflowParams = {
  id: number;
  name: string;
  email: string;
  original_id?: number;
  original_name?: string;
  original_email?: string;
  sender: string;
  origin: OriginType;
};

export type SupportChatProps = {
  jwtToHyperflow: string;
  currentUser: CurrentUser;
  hyperflowConfig: HyperflowConfig;
};

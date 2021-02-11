export interface Tag {
    name: string;
    description: string;
    color?: string;
}
export interface ShopActionsData {
  assignedTo: number;
  shopId: number;
  robotState: string;
  inputUrl: string;
  dexiRobot: string;
  dexiRun: string;
  usingProxy: boolean;
}
export interface Country {
    countryCode: string;
    countryId: number;
    name: string;
}
export interface Shop{
    activeOffers: number;
    assignedTo: number;
    dexiRobot: string;
    dexiRun: string;
    executionState: string;
    inputUrl?: string;
    lastChanged: string;
    lastExecuted: string;
    lastModifiedByName: string;
    name: string;
    rank: number;
    robotState: string;
    shopId: number;
    tag: string;
    usingProxy: number;
}
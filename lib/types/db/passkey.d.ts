export interface Passkey {
  id: string;
  name?: string;
  publicKey: string;
  userId: string;
  credentialID: string;
  counter: number;
  deviceType: string;
  backedUp: boolean;
  transports?: string;
  createdAt?: Date;
  aaguid?: string;
}

export interface CreatePasskeyData {
  id?: string;
  name?: string;
  publicKey: string;
  userId: string;
  credentialID: string;
  counter: number;
  deviceType: string;
  backedUp: boolean;
  transports?: string;
  aaguid?: string;
}

export interface UpdatePasskeyData {
  name?: string;
  publicKey?: string;
  credentialID?: string;
  counter?: number;
  deviceType?: string;
  backedUp?: boolean;
  transports?: string;
  aaguid?: string;
}
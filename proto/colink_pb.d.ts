import * as jspb from 'google-protobuf'



export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class Jwt extends jspb.Message {
  getJwt(): string;
  setJwt(value: string): Jwt;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Jwt.AsObject;
  static toObject(includeInstance: boolean, msg: Jwt): Jwt.AsObject;
  static serializeBinaryToWriter(message: Jwt, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Jwt;
  static deserializeBinaryFromReader(message: Jwt, reader: jspb.BinaryReader): Jwt;
}

export namespace Jwt {
  export type AsObject = {
    jwt: string,
  }
}

export class StorageEntry extends jspb.Message {
  getKeyName(): string;
  setKeyName(value: string): StorageEntry;

  getKeyPath(): string;
  setKeyPath(value: string): StorageEntry;

  getPayload(): Uint8Array | string;
  getPayload_asU8(): Uint8Array;
  getPayload_asB64(): string;
  setPayload(value: Uint8Array | string): StorageEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StorageEntry.AsObject;
  static toObject(includeInstance: boolean, msg: StorageEntry): StorageEntry.AsObject;
  static serializeBinaryToWriter(message: StorageEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StorageEntry;
  static deserializeBinaryFromReader(message: StorageEntry, reader: jspb.BinaryReader): StorageEntry;
}

export namespace StorageEntry {
  export type AsObject = {
    keyName: string,
    keyPath: string,
    payload: Uint8Array | string,
  }
}

export class StorageEntries extends jspb.Message {
  getEntriesList(): Array<StorageEntry>;
  setEntriesList(value: Array<StorageEntry>): StorageEntries;
  clearEntriesList(): StorageEntries;
  addEntries(value?: StorageEntry, index?: number): StorageEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StorageEntries.AsObject;
  static toObject(includeInstance: boolean, msg: StorageEntries): StorageEntries.AsObject;
  static serializeBinaryToWriter(message: StorageEntries, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StorageEntries;
  static deserializeBinaryFromReader(message: StorageEntries, reader: jspb.BinaryReader): StorageEntries;
}

export namespace StorageEntries {
  export type AsObject = {
    entriesList: Array<StorageEntry.AsObject>,
  }
}

export class GenerateTokenRequest extends jspb.Message {
  getExpirationTime(): number;
  setExpirationTime(value: number): GenerateTokenRequest;

  getPrivilege(): string;
  setPrivilege(value: string): GenerateTokenRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GenerateTokenRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GenerateTokenRequest): GenerateTokenRequest.AsObject;
  static serializeBinaryToWriter(message: GenerateTokenRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GenerateTokenRequest;
  static deserializeBinaryFromReader(message: GenerateTokenRequest, reader: jspb.BinaryReader): GenerateTokenRequest;
}

export namespace GenerateTokenRequest {
  export type AsObject = {
    expirationTime: number,
    privilege: string,
  }
}

export class UserConsent extends jspb.Message {
  getPublicKey(): Uint8Array | string;
  getPublicKey_asU8(): Uint8Array;
  getPublicKey_asB64(): string;
  setPublicKey(value: Uint8Array | string): UserConsent;

  getSignatureTimestamp(): number;
  setSignatureTimestamp(value: number): UserConsent;

  getExpirationTimestamp(): number;
  setExpirationTimestamp(value: number): UserConsent;

  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): UserConsent;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserConsent.AsObject;
  static toObject(includeInstance: boolean, msg: UserConsent): UserConsent.AsObject;
  static serializeBinaryToWriter(message: UserConsent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserConsent;
  static deserializeBinaryFromReader(message: UserConsent, reader: jspb.BinaryReader): UserConsent;
}

export namespace UserConsent {
  export type AsObject = {
    publicKey: Uint8Array | string,
    signatureTimestamp: number,
    expirationTimestamp: number,
    signature: Uint8Array | string,
  }
}

export class ReadKeysRequest extends jspb.Message {
  getPrefix(): string;
  setPrefix(value: string): ReadKeysRequest;

  getIncludeHistory(): boolean;
  setIncludeHistory(value: boolean): ReadKeysRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReadKeysRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ReadKeysRequest): ReadKeysRequest.AsObject;
  static serializeBinaryToWriter(message: ReadKeysRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReadKeysRequest;
  static deserializeBinaryFromReader(message: ReadKeysRequest, reader: jspb.BinaryReader): ReadKeysRequest;
}

export namespace ReadKeysRequest {
  export type AsObject = {
    prefix: string,
    includeHistory: boolean,
  }
}

export class Participant extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): Participant;

  getRole(): string;
  setRole(value: string): Participant;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Participant.AsObject;
  static toObject(includeInstance: boolean, msg: Participant): Participant.AsObject;
  static serializeBinaryToWriter(message: Participant, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Participant;
  static deserializeBinaryFromReader(message: Participant, reader: jspb.BinaryReader): Participant;
}

export namespace Participant {
  export type AsObject = {
    userId: string,
    role: string,
  }
}

export class Decision extends jspb.Message {
  getIsApproved(): boolean;
  setIsApproved(value: boolean): Decision;

  getIsRejected(): boolean;
  setIsRejected(value: boolean): Decision;

  getReason(): string;
  setReason(value: string): Decision;

  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): Decision;

  getCorePublicKey(): Uint8Array | string;
  getCorePublicKey_asU8(): Uint8Array;
  getCorePublicKey_asB64(): string;
  setCorePublicKey(value: Uint8Array | string): Decision;

  getUserConsent(): UserConsent | undefined;
  setUserConsent(value?: UserConsent): Decision;
  hasUserConsent(): boolean;
  clearUserConsent(): Decision;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Decision.AsObject;
  static toObject(includeInstance: boolean, msg: Decision): Decision.AsObject;
  static serializeBinaryToWriter(message: Decision, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Decision;
  static deserializeBinaryFromReader(message: Decision, reader: jspb.BinaryReader): Decision;
}

export namespace Decision {
  export type AsObject = {
    isApproved: boolean,
    isRejected: boolean,
    reason: string,
    signature: Uint8Array | string,
    corePublicKey: Uint8Array | string,
    userConsent?: UserConsent.AsObject,
  }
}

export class Task extends jspb.Message {
  getTaskId(): string;
  setTaskId(value: string): Task;

  getProtocolName(): string;
  setProtocolName(value: string): Task;

  getProtocolParam(): Uint8Array | string;
  getProtocolParam_asU8(): Uint8Array;
  getProtocolParam_asB64(): string;
  setProtocolParam(value: Uint8Array | string): Task;

  getParticipantsList(): Array<Participant>;
  setParticipantsList(value: Array<Participant>): Task;
  clearParticipantsList(): Task;
  addParticipants(value?: Participant, index?: number): Participant;

  getParentTask(): string;
  setParentTask(value: string): Task;

  getRequireAgreement(): boolean;
  setRequireAgreement(value: boolean): Task;

  getDecisionsList(): Array<Decision>;
  setDecisionsList(value: Array<Decision>): Task;
  clearDecisionsList(): Task;
  addDecisions(value?: Decision, index?: number): Decision;

  getStatus(): string;
  setStatus(value: string): Task;

  getExpirationTime(): number;
  setExpirationTime(value: number): Task;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Task.AsObject;
  static toObject(includeInstance: boolean, msg: Task): Task.AsObject;
  static serializeBinaryToWriter(message: Task, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Task;
  static deserializeBinaryFromReader(message: Task, reader: jspb.BinaryReader): Task;
}

export namespace Task {
  export type AsObject = {
    taskId: string,
    protocolName: string,
    protocolParam: Uint8Array | string,
    participantsList: Array<Participant.AsObject>,
    parentTask: string,
    requireAgreement: boolean,
    decisionsList: Array<Decision.AsObject>,
    status: string,
    expirationTime: number,
  }
}

export class ConfirmTaskRequest extends jspb.Message {
  getTaskId(): string;
  setTaskId(value: string): ConfirmTaskRequest;

  getDecision(): Decision | undefined;
  setDecision(value?: Decision): ConfirmTaskRequest;
  hasDecision(): boolean;
  clearDecision(): ConfirmTaskRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConfirmTaskRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConfirmTaskRequest): ConfirmTaskRequest.AsObject;
  static serializeBinaryToWriter(message: ConfirmTaskRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConfirmTaskRequest;
  static deserializeBinaryFromReader(message: ConfirmTaskRequest, reader: jspb.BinaryReader): ConfirmTaskRequest;
}

export namespace ConfirmTaskRequest {
  export type AsObject = {
    taskId: string,
    decision?: Decision.AsObject,
  }
}

export class CoreInfo extends jspb.Message {
  getMqUri(): string;
  setMqUri(value: string): CoreInfo;

  getCorePublicKey(): Uint8Array | string;
  getCorePublicKey_asU8(): Uint8Array;
  getCorePublicKey_asB64(): string;
  setCorePublicKey(value: Uint8Array | string): CoreInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CoreInfo.AsObject;
  static toObject(includeInstance: boolean, msg: CoreInfo): CoreInfo.AsObject;
  static serializeBinaryToWriter(message: CoreInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CoreInfo;
  static deserializeBinaryFromReader(message: CoreInfo, reader: jspb.BinaryReader): CoreInfo;
}

export namespace CoreInfo {
  export type AsObject = {
    mqUri: string,
    corePublicKey: Uint8Array | string,
  }
}

export class SubscribeRequest extends jspb.Message {
  getKeyName(): string;
  setKeyName(value: string): SubscribeRequest;

  getStartTimestamp(): number;
  setStartTimestamp(value: number): SubscribeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubscribeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SubscribeRequest): SubscribeRequest.AsObject;
  static serializeBinaryToWriter(message: SubscribeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubscribeRequest;
  static deserializeBinaryFromReader(message: SubscribeRequest, reader: jspb.BinaryReader): SubscribeRequest;
}

export namespace SubscribeRequest {
  export type AsObject = {
    keyName: string,
    startTimestamp: number,
  }
}

export class SubscriptionMessage extends jspb.Message {
  getChangeType(): string;
  setChangeType(value: string): SubscriptionMessage;

  getKeyPath(): string;
  setKeyPath(value: string): SubscriptionMessage;

  getPayload(): Uint8Array | string;
  getPayload_asU8(): Uint8Array;
  getPayload_asB64(): string;
  setPayload(value: Uint8Array | string): SubscriptionMessage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubscriptionMessage.AsObject;
  static toObject(includeInstance: boolean, msg: SubscriptionMessage): SubscriptionMessage.AsObject;
  static serializeBinaryToWriter(message: SubscriptionMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubscriptionMessage;
  static deserializeBinaryFromReader(message: SubscriptionMessage, reader: jspb.BinaryReader): SubscriptionMessage;
}

export namespace SubscriptionMessage {
  export type AsObject = {
    changeType: string,
    keyPath: string,
    payload: Uint8Array | string,
  }
}

export class MQQueueName extends jspb.Message {
  getQueueName(): string;
  setQueueName(value: string): MQQueueName;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MQQueueName.AsObject;
  static toObject(includeInstance: boolean, msg: MQQueueName): MQQueueName.AsObject;
  static serializeBinaryToWriter(message: MQQueueName, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MQQueueName;
  static deserializeBinaryFromReader(message: MQQueueName, reader: jspb.BinaryReader): MQQueueName;
}

export namespace MQQueueName {
  export type AsObject = {
    queueName: string,
  }
}

export class CoLinkInternalTaskIDWithKeyPath extends jspb.Message {
  getKeyPath(): string;
  setKeyPath(value: string): CoLinkInternalTaskIDWithKeyPath;

  getTaskId(): string;
  setTaskId(value: string): CoLinkInternalTaskIDWithKeyPath;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CoLinkInternalTaskIDWithKeyPath.AsObject;
  static toObject(includeInstance: boolean, msg: CoLinkInternalTaskIDWithKeyPath): CoLinkInternalTaskIDWithKeyPath.AsObject;
  static serializeBinaryToWriter(message: CoLinkInternalTaskIDWithKeyPath, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CoLinkInternalTaskIDWithKeyPath;
  static deserializeBinaryFromReader(message: CoLinkInternalTaskIDWithKeyPath, reader: jspb.BinaryReader): CoLinkInternalTaskIDWithKeyPath;
}

export namespace CoLinkInternalTaskIDWithKeyPath {
  export type AsObject = {
    keyPath: string,
    taskId: string,
  }
}

export class CoLinkInternalTaskIDList extends jspb.Message {
  getTaskIdsWithKeyPathsList(): Array<CoLinkInternalTaskIDWithKeyPath>;
  setTaskIdsWithKeyPathsList(value: Array<CoLinkInternalTaskIDWithKeyPath>): CoLinkInternalTaskIDList;
  clearTaskIdsWithKeyPathsList(): CoLinkInternalTaskIDList;
  addTaskIdsWithKeyPaths(value?: CoLinkInternalTaskIDWithKeyPath, index?: number): CoLinkInternalTaskIDWithKeyPath;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CoLinkInternalTaskIDList.AsObject;
  static toObject(includeInstance: boolean, msg: CoLinkInternalTaskIDList): CoLinkInternalTaskIDList.AsObject;
  static serializeBinaryToWriter(message: CoLinkInternalTaskIDList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CoLinkInternalTaskIDList;
  static deserializeBinaryFromReader(message: CoLinkInternalTaskIDList, reader: jspb.BinaryReader): CoLinkInternalTaskIDList;
}

export namespace CoLinkInternalTaskIDList {
  export type AsObject = {
    taskIdsWithKeyPathsList: Array<CoLinkInternalTaskIDWithKeyPath.AsObject>,
  }
}


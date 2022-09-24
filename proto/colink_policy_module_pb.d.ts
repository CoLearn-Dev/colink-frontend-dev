import * as jspb from 'google-protobuf'

import * as google_protobuf_wrappers_pb from 'google-protobuf/google/protobuf/wrappers_pb';


export class Rule extends jspb.Message {
  getRuleId(): string;
  setRuleId(value: string): Rule;

  getTaskFilter(): TaskFilter | undefined;
  setTaskFilter(value?: TaskFilter): Rule;
  hasTaskFilter(): boolean;
  clearTaskFilter(): Rule;

  getAction(): string;
  setAction(value: string): Rule;

  getPriority(): number;
  setPriority(value: number): Rule;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Rule.AsObject;
  static toObject(includeInstance: boolean, msg: Rule): Rule.AsObject;
  static serializeBinaryToWriter(message: Rule, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Rule;
  static deserializeBinaryFromReader(message: Rule, reader: jspb.BinaryReader): Rule;
}

export namespace Rule {
  export type AsObject = {
    ruleId: string,
    taskFilter?: TaskFilter.AsObject,
    action: string,
    priority: number,
  }
}

export class TaskFilter extends jspb.Message {
  getTaskId(): string;
  setTaskId(value: string): TaskFilter;

  getProtocolName(): string;
  setProtocolName(value: string): TaskFilter;

  getParticipantsList(): Array<string>;
  setParticipantsList(value: Array<string>): TaskFilter;
  clearParticipantsList(): TaskFilter;
  addParticipants(value: string, index?: number): TaskFilter;

  getRole(): string;
  setRole(value: string): TaskFilter;

  getParentTaskFilter(): TaskFilter | undefined;
  setParentTaskFilter(value?: TaskFilter): TaskFilter;
  hasParentTaskFilter(): boolean;
  clearParentTaskFilter(): TaskFilter;

  getRequireAgreement(): google_protobuf_wrappers_pb.BoolValue | undefined;
  setRequireAgreement(value?: google_protobuf_wrappers_pb.BoolValue): TaskFilter;
  hasRequireAgreement(): boolean;
  clearRequireAgreement(): TaskFilter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TaskFilter.AsObject;
  static toObject(includeInstance: boolean, msg: TaskFilter): TaskFilter.AsObject;
  static serializeBinaryToWriter(message: TaskFilter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TaskFilter;
  static deserializeBinaryFromReader(message: TaskFilter, reader: jspb.BinaryReader): TaskFilter;
}

export namespace TaskFilter {
  export type AsObject = {
    taskId: string,
    protocolName: string,
    participantsList: Array<string>,
    role: string,
    parentTaskFilter?: TaskFilter.AsObject,
    requireAgreement?: google_protobuf_wrappers_pb.BoolValue.AsObject,
  }
}

export class Settings extends jspb.Message {
  getEnable(): boolean;
  setEnable(value: boolean): Settings;

  getRulesList(): Array<Rule>;
  setRulesList(value: Array<Rule>): Settings;
  clearRulesList(): Settings;
  addRules(value?: Rule, index?: number): Rule;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Settings.AsObject;
  static toObject(includeInstance: boolean, msg: Settings): Settings.AsObject;
  static serializeBinaryToWriter(message: Settings, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Settings;
  static deserializeBinaryFromReader(message: Settings, reader: jspb.BinaryReader): Settings;
}

export namespace Settings {
  export type AsObject = {
    enable: boolean,
    rulesList: Array<Rule.AsObject>,
  }
}


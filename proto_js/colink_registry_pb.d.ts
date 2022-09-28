import * as jspb from 'google-protobuf'



export class Registry extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): Registry;

  getGuestJwt(): string;
  setGuestJwt(value: string): Registry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Registry.AsObject;
  static toObject(includeInstance: boolean, msg: Registry): Registry.AsObject;
  static serializeBinaryToWriter(message: Registry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Registry;
  static deserializeBinaryFromReader(message: Registry, reader: jspb.BinaryReader): Registry;
}

export namespace Registry {
  export type AsObject = {
    address: string,
    guestJwt: string,
  }
}

export class Registries extends jspb.Message {
  getRegistriesList(): Array<Registry>;
  setRegistriesList(value: Array<Registry>): Registries;
  clearRegistriesList(): Registries;
  addRegistries(value?: Registry, index?: number): Registry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Registries.AsObject;
  static toObject(includeInstance: boolean, msg: Registries): Registries.AsObject;
  static serializeBinaryToWriter(message: Registries, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Registries;
  static deserializeBinaryFromReader(message: Registries, reader: jspb.BinaryReader): Registries;
}

export namespace Registries {
  export type AsObject = {
    registriesList: Array<Registry.AsObject>,
  }
}

export class UserRecord extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): UserRecord;

  getCoreAddr(): string;
  setCoreAddr(value: string): UserRecord;

  getGuestJwt(): string;
  setGuestJwt(value: string): UserRecord;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserRecord.AsObject;
  static toObject(includeInstance: boolean, msg: UserRecord): UserRecord.AsObject;
  static serializeBinaryToWriter(message: UserRecord, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserRecord;
  static deserializeBinaryFromReader(message: UserRecord, reader: jspb.BinaryReader): UserRecord;
}

export namespace UserRecord {
  export type AsObject = {
    userId: string,
    coreAddr: string,
    guestJwt: string,
  }
}


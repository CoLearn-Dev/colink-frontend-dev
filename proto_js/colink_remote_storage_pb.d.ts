import * as jspb from 'google-protobuf'



export class CreateParams extends jspb.Message {
  getRemoteKeyName(): string;
  setRemoteKeyName(value: string): CreateParams;

  getIsPublic(): boolean;
  setIsPublic(value: boolean): CreateParams;

  getPayload(): Uint8Array | string;
  getPayload_asU8(): Uint8Array;
  getPayload_asB64(): string;
  setPayload(value: Uint8Array | string): CreateParams;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateParams.AsObject;
  static toObject(includeInstance: boolean, msg: CreateParams): CreateParams.AsObject;
  static serializeBinaryToWriter(message: CreateParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateParams;
  static deserializeBinaryFromReader(message: CreateParams, reader: jspb.BinaryReader): CreateParams;
}

export namespace CreateParams {
  export type AsObject = {
    remoteKeyName: string,
    isPublic: boolean,
    payload: Uint8Array | string,
  }
}

export class ReadParams extends jspb.Message {
  getRemoteKeyName(): string;
  setRemoteKeyName(value: string): ReadParams;

  getIsPublic(): boolean;
  setIsPublic(value: boolean): ReadParams;

  getHolderId(): string;
  setHolderId(value: string): ReadParams;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReadParams.AsObject;
  static toObject(includeInstance: boolean, msg: ReadParams): ReadParams.AsObject;
  static serializeBinaryToWriter(message: ReadParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReadParams;
  static deserializeBinaryFromReader(message: ReadParams, reader: jspb.BinaryReader): ReadParams;
}

export namespace ReadParams {
  export type AsObject = {
    remoteKeyName: string,
    isPublic: boolean,
    holderId: string,
  }
}

export class UpdateParams extends jspb.Message {
  getRemoteKeyName(): string;
  setRemoteKeyName(value: string): UpdateParams;

  getIsPublic(): boolean;
  setIsPublic(value: boolean): UpdateParams;

  getPayload(): Uint8Array | string;
  getPayload_asU8(): Uint8Array;
  getPayload_asB64(): string;
  setPayload(value: Uint8Array | string): UpdateParams;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateParams.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateParams): UpdateParams.AsObject;
  static serializeBinaryToWriter(message: UpdateParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateParams;
  static deserializeBinaryFromReader(message: UpdateParams, reader: jspb.BinaryReader): UpdateParams;
}

export namespace UpdateParams {
  export type AsObject = {
    remoteKeyName: string,
    isPublic: boolean,
    payload: Uint8Array | string,
  }
}

export class DeleteParams extends jspb.Message {
  getRemoteKeyName(): string;
  setRemoteKeyName(value: string): DeleteParams;

  getIsPublic(): boolean;
  setIsPublic(value: boolean): DeleteParams;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteParams.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteParams): DeleteParams.AsObject;
  static serializeBinaryToWriter(message: DeleteParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteParams;
  static deserializeBinaryFromReader(message: DeleteParams, reader: jspb.BinaryReader): DeleteParams;
}

export namespace DeleteParams {
  export type AsObject = {
    remoteKeyName: string,
    isPublic: boolean,
  }
}


/**
 * @fileoverview gRPC-Web generated client stub for colink
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as colink$server$dev_proto_colink_pb from '../../colink-server-dev/proto/colink_pb';


export class CoLinkClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorRefreshToken = new grpcWeb.MethodDescriptor(
    '/colink.CoLink/RefreshToken',
    grpcWeb.MethodType.UNARY,
    colink$server$dev_proto_colink_pb.RefreshTokenRequest,
    colink$server$dev_proto_colink_pb.Jwt,
    (request: colink$server$dev_proto_colink_pb.RefreshTokenRequest) => {
      return request.serializeBinary();
    },
    colink$server$dev_proto_colink_pb.Jwt.deserializeBinary
  );

  refreshToken(
    request: colink$server$dev_proto_colink_pb.RefreshTokenRequest,
    metadata: grpcWeb.Metadata | null): Promise<colink$server$dev_proto_colink_pb.Jwt>;

  refreshToken(
    request: colink$server$dev_proto_colink_pb.RefreshTokenRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.Jwt) => void): grpcWeb.ClientReadableStream<colink$server$dev_proto_colink_pb.Jwt>;

  refreshToken(
    request: colink$server$dev_proto_colink_pb.RefreshTokenRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.Jwt) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/colink.CoLink/RefreshToken',
        request,
        metadata || {},
        this.methodDescriptorRefreshToken,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/colink.CoLink/RefreshToken',
    request,
    metadata || {},
    this.methodDescriptorRefreshToken);
  }

  methodDescriptorImportUser = new grpcWeb.MethodDescriptor(
    '/colink.CoLink/ImportUser',
    grpcWeb.MethodType.UNARY,
    colink$server$dev_proto_colink_pb.UserConsent,
    colink$server$dev_proto_colink_pb.Jwt,
    (request: colink$server$dev_proto_colink_pb.UserConsent) => {
      return request.serializeBinary();
    },
    colink$server$dev_proto_colink_pb.Jwt.deserializeBinary
  );

  importUser(
    request: colink$server$dev_proto_colink_pb.UserConsent,
    metadata: grpcWeb.Metadata | null): Promise<colink$server$dev_proto_colink_pb.Jwt>;

  importUser(
    request: colink$server$dev_proto_colink_pb.UserConsent,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.Jwt) => void): grpcWeb.ClientReadableStream<colink$server$dev_proto_colink_pb.Jwt>;

  importUser(
    request: colink$server$dev_proto_colink_pb.UserConsent,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.Jwt) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/colink.CoLink/ImportUser',
        request,
        metadata || {},
        this.methodDescriptorImportUser,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/colink.CoLink/ImportUser',
    request,
    metadata || {},
    this.methodDescriptorImportUser);
  }

  methodDescriptorCreateEntry = new grpcWeb.MethodDescriptor(
    '/colink.CoLink/CreateEntry',
    grpcWeb.MethodType.UNARY,
    colink$server$dev_proto_colink_pb.StorageEntry,
    colink$server$dev_proto_colink_pb.StorageEntry,
    (request: colink$server$dev_proto_colink_pb.StorageEntry) => {
      return request.serializeBinary();
    },
    colink$server$dev_proto_colink_pb.StorageEntry.deserializeBinary
  );

  createEntry(
    request: colink$server$dev_proto_colink_pb.StorageEntry,
    metadata: grpcWeb.Metadata | null): Promise<colink$server$dev_proto_colink_pb.StorageEntry>;

  createEntry(
    request: colink$server$dev_proto_colink_pb.StorageEntry,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.StorageEntry) => void): grpcWeb.ClientReadableStream<colink$server$dev_proto_colink_pb.StorageEntry>;

  createEntry(
    request: colink$server$dev_proto_colink_pb.StorageEntry,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.StorageEntry) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/colink.CoLink/CreateEntry',
        request,
        metadata || {},
        this.methodDescriptorCreateEntry,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/colink.CoLink/CreateEntry',
    request,
    metadata || {},
    this.methodDescriptorCreateEntry);
  }

  methodDescriptorReadEntries = new grpcWeb.MethodDescriptor(
    '/colink.CoLink/ReadEntries',
    grpcWeb.MethodType.UNARY,
    colink$server$dev_proto_colink_pb.StorageEntries,
    colink$server$dev_proto_colink_pb.StorageEntries,
    (request: colink$server$dev_proto_colink_pb.StorageEntries) => {
      return request.serializeBinary();
    },
    colink$server$dev_proto_colink_pb.StorageEntries.deserializeBinary
  );

  readEntries(
    request: colink$server$dev_proto_colink_pb.StorageEntries,
    metadata: grpcWeb.Metadata | null): Promise<colink$server$dev_proto_colink_pb.StorageEntries>;

  readEntries(
    request: colink$server$dev_proto_colink_pb.StorageEntries,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.StorageEntries) => void): grpcWeb.ClientReadableStream<colink$server$dev_proto_colink_pb.StorageEntries>;

  readEntries(
    request: colink$server$dev_proto_colink_pb.StorageEntries,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.StorageEntries) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/colink.CoLink/ReadEntries',
        request,
        metadata || {},
        this.methodDescriptorReadEntries,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/colink.CoLink/ReadEntries',
    request,
    metadata || {},
    this.methodDescriptorReadEntries);
  }

  methodDescriptorUpdateEntry = new grpcWeb.MethodDescriptor(
    '/colink.CoLink/UpdateEntry',
    grpcWeb.MethodType.UNARY,
    colink$server$dev_proto_colink_pb.StorageEntry,
    colink$server$dev_proto_colink_pb.StorageEntry,
    (request: colink$server$dev_proto_colink_pb.StorageEntry) => {
      return request.serializeBinary();
    },
    colink$server$dev_proto_colink_pb.StorageEntry.deserializeBinary
  );

  updateEntry(
    request: colink$server$dev_proto_colink_pb.StorageEntry,
    metadata: grpcWeb.Metadata | null): Promise<colink$server$dev_proto_colink_pb.StorageEntry>;

  updateEntry(
    request: colink$server$dev_proto_colink_pb.StorageEntry,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.StorageEntry) => void): grpcWeb.ClientReadableStream<colink$server$dev_proto_colink_pb.StorageEntry>;

  updateEntry(
    request: colink$server$dev_proto_colink_pb.StorageEntry,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.StorageEntry) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/colink.CoLink/UpdateEntry',
        request,
        metadata || {},
        this.methodDescriptorUpdateEntry,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/colink.CoLink/UpdateEntry',
    request,
    metadata || {},
    this.methodDescriptorUpdateEntry);
  }

  methodDescriptorDeleteEntry = new grpcWeb.MethodDescriptor(
    '/colink.CoLink/DeleteEntry',
    grpcWeb.MethodType.UNARY,
    colink$server$dev_proto_colink_pb.StorageEntry,
    colink$server$dev_proto_colink_pb.StorageEntry,
    (request: colink$server$dev_proto_colink_pb.StorageEntry) => {
      return request.serializeBinary();
    },
    colink$server$dev_proto_colink_pb.StorageEntry.deserializeBinary
  );

  deleteEntry(
    request: colink$server$dev_proto_colink_pb.StorageEntry,
    metadata: grpcWeb.Metadata | null): Promise<colink$server$dev_proto_colink_pb.StorageEntry>;

  deleteEntry(
    request: colink$server$dev_proto_colink_pb.StorageEntry,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.StorageEntry) => void): grpcWeb.ClientReadableStream<colink$server$dev_proto_colink_pb.StorageEntry>;

  deleteEntry(
    request: colink$server$dev_proto_colink_pb.StorageEntry,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.StorageEntry) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/colink.CoLink/DeleteEntry',
        request,
        metadata || {},
        this.methodDescriptorDeleteEntry,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/colink.CoLink/DeleteEntry',
    request,
    metadata || {},
    this.methodDescriptorDeleteEntry);
  }

  methodDescriptorReadKeys = new grpcWeb.MethodDescriptor(
    '/colink.CoLink/ReadKeys',
    grpcWeb.MethodType.UNARY,
    colink$server$dev_proto_colink_pb.ReadKeysRequest,
    colink$server$dev_proto_colink_pb.StorageEntries,
    (request: colink$server$dev_proto_colink_pb.ReadKeysRequest) => {
      return request.serializeBinary();
    },
    colink$server$dev_proto_colink_pb.StorageEntries.deserializeBinary
  );

  readKeys(
    request: colink$server$dev_proto_colink_pb.ReadKeysRequest,
    metadata: grpcWeb.Metadata | null): Promise<colink$server$dev_proto_colink_pb.StorageEntries>;

  readKeys(
    request: colink$server$dev_proto_colink_pb.ReadKeysRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.StorageEntries) => void): grpcWeb.ClientReadableStream<colink$server$dev_proto_colink_pb.StorageEntries>;

  readKeys(
    request: colink$server$dev_proto_colink_pb.ReadKeysRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.StorageEntries) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/colink.CoLink/ReadKeys',
        request,
        metadata || {},
        this.methodDescriptorReadKeys,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/colink.CoLink/ReadKeys',
    request,
    metadata || {},
    this.methodDescriptorReadKeys);
  }

  methodDescriptorCreateTask = new grpcWeb.MethodDescriptor(
    '/colink.CoLink/CreateTask',
    grpcWeb.MethodType.UNARY,
    colink$server$dev_proto_colink_pb.Task,
    colink$server$dev_proto_colink_pb.Task,
    (request: colink$server$dev_proto_colink_pb.Task) => {
      return request.serializeBinary();
    },
    colink$server$dev_proto_colink_pb.Task.deserializeBinary
  );

  createTask(
    request: colink$server$dev_proto_colink_pb.Task,
    metadata: grpcWeb.Metadata | null): Promise<colink$server$dev_proto_colink_pb.Task>;

  createTask(
    request: colink$server$dev_proto_colink_pb.Task,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.Task) => void): grpcWeb.ClientReadableStream<colink$server$dev_proto_colink_pb.Task>;

  createTask(
    request: colink$server$dev_proto_colink_pb.Task,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.Task) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/colink.CoLink/CreateTask',
        request,
        metadata || {},
        this.methodDescriptorCreateTask,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/colink.CoLink/CreateTask',
    request,
    metadata || {},
    this.methodDescriptorCreateTask);
  }

  methodDescriptorConfirmTask = new grpcWeb.MethodDescriptor(
    '/colink.CoLink/ConfirmTask',
    grpcWeb.MethodType.UNARY,
    colink$server$dev_proto_colink_pb.ConfirmTaskRequest,
    colink$server$dev_proto_colink_pb.Empty,
    (request: colink$server$dev_proto_colink_pb.ConfirmTaskRequest) => {
      return request.serializeBinary();
    },
    colink$server$dev_proto_colink_pb.Empty.deserializeBinary
  );

  confirmTask(
    request: colink$server$dev_proto_colink_pb.ConfirmTaskRequest,
    metadata: grpcWeb.Metadata | null): Promise<colink$server$dev_proto_colink_pb.Empty>;

  confirmTask(
    request: colink$server$dev_proto_colink_pb.ConfirmTaskRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.Empty) => void): grpcWeb.ClientReadableStream<colink$server$dev_proto_colink_pb.Empty>;

  confirmTask(
    request: colink$server$dev_proto_colink_pb.ConfirmTaskRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/colink.CoLink/ConfirmTask',
        request,
        metadata || {},
        this.methodDescriptorConfirmTask,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/colink.CoLink/ConfirmTask',
    request,
    metadata || {},
    this.methodDescriptorConfirmTask);
  }

  methodDescriptorFinishTask = new grpcWeb.MethodDescriptor(
    '/colink.CoLink/FinishTask',
    grpcWeb.MethodType.UNARY,
    colink$server$dev_proto_colink_pb.Task,
    colink$server$dev_proto_colink_pb.Empty,
    (request: colink$server$dev_proto_colink_pb.Task) => {
      return request.serializeBinary();
    },
    colink$server$dev_proto_colink_pb.Empty.deserializeBinary
  );

  finishTask(
    request: colink$server$dev_proto_colink_pb.Task,
    metadata: grpcWeb.Metadata | null): Promise<colink$server$dev_proto_colink_pb.Empty>;

  finishTask(
    request: colink$server$dev_proto_colink_pb.Task,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.Empty) => void): grpcWeb.ClientReadableStream<colink$server$dev_proto_colink_pb.Empty>;

  finishTask(
    request: colink$server$dev_proto_colink_pb.Task,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/colink.CoLink/FinishTask',
        request,
        metadata || {},
        this.methodDescriptorFinishTask,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/colink.CoLink/FinishTask',
    request,
    metadata || {},
    this.methodDescriptorFinishTask);
  }

  methodDescriptorRequestCoreInfo = new grpcWeb.MethodDescriptor(
    '/colink.CoLink/RequestCoreInfo',
    grpcWeb.MethodType.UNARY,
    colink$server$dev_proto_colink_pb.Empty,
    colink$server$dev_proto_colink_pb.CoreInfo,
    (request: colink$server$dev_proto_colink_pb.Empty) => {
      return request.serializeBinary();
    },
    colink$server$dev_proto_colink_pb.CoreInfo.deserializeBinary
  );

  requestCoreInfo(
    request: colink$server$dev_proto_colink_pb.Empty,
    metadata: grpcWeb.Metadata | null): Promise<colink$server$dev_proto_colink_pb.CoreInfo>;

  requestCoreInfo(
    request: colink$server$dev_proto_colink_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.CoreInfo) => void): grpcWeb.ClientReadableStream<colink$server$dev_proto_colink_pb.CoreInfo>;

  requestCoreInfo(
    request: colink$server$dev_proto_colink_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.CoreInfo) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/colink.CoLink/RequestCoreInfo',
        request,
        metadata || {},
        this.methodDescriptorRequestCoreInfo,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/colink.CoLink/RequestCoreInfo',
    request,
    metadata || {},
    this.methodDescriptorRequestCoreInfo);
  }

  methodDescriptorSubscribe = new grpcWeb.MethodDescriptor(
    '/colink.CoLink/Subscribe',
    grpcWeb.MethodType.UNARY,
    colink$server$dev_proto_colink_pb.SubscribeRequest,
    colink$server$dev_proto_colink_pb.MQQueueName,
    (request: colink$server$dev_proto_colink_pb.SubscribeRequest) => {
      return request.serializeBinary();
    },
    colink$server$dev_proto_colink_pb.MQQueueName.deserializeBinary
  );

  subscribe(
    request: colink$server$dev_proto_colink_pb.SubscribeRequest,
    metadata: grpcWeb.Metadata | null): Promise<colink$server$dev_proto_colink_pb.MQQueueName>;

  subscribe(
    request: colink$server$dev_proto_colink_pb.SubscribeRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.MQQueueName) => void): grpcWeb.ClientReadableStream<colink$server$dev_proto_colink_pb.MQQueueName>;

  subscribe(
    request: colink$server$dev_proto_colink_pb.SubscribeRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.MQQueueName) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/colink.CoLink/Subscribe',
        request,
        metadata || {},
        this.methodDescriptorSubscribe,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/colink.CoLink/Subscribe',
    request,
    metadata || {},
    this.methodDescriptorSubscribe);
  }

  methodDescriptorUnsubscribe = new grpcWeb.MethodDescriptor(
    '/colink.CoLink/Unsubscribe',
    grpcWeb.MethodType.UNARY,
    colink$server$dev_proto_colink_pb.MQQueueName,
    colink$server$dev_proto_colink_pb.Empty,
    (request: colink$server$dev_proto_colink_pb.MQQueueName) => {
      return request.serializeBinary();
    },
    colink$server$dev_proto_colink_pb.Empty.deserializeBinary
  );

  unsubscribe(
    request: colink$server$dev_proto_colink_pb.MQQueueName,
    metadata: grpcWeb.Metadata | null): Promise<colink$server$dev_proto_colink_pb.Empty>;

  unsubscribe(
    request: colink$server$dev_proto_colink_pb.MQQueueName,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.Empty) => void): grpcWeb.ClientReadableStream<colink$server$dev_proto_colink_pb.Empty>;

  unsubscribe(
    request: colink$server$dev_proto_colink_pb.MQQueueName,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/colink.CoLink/Unsubscribe',
        request,
        metadata || {},
        this.methodDescriptorUnsubscribe,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/colink.CoLink/Unsubscribe',
    request,
    metadata || {},
    this.methodDescriptorUnsubscribe);
  }

  methodDescriptorInterCoreSyncTask = new grpcWeb.MethodDescriptor(
    '/colink.CoLink/InterCoreSyncTask',
    grpcWeb.MethodType.UNARY,
    colink$server$dev_proto_colink_pb.Task,
    colink$server$dev_proto_colink_pb.Empty,
    (request: colink$server$dev_proto_colink_pb.Task) => {
      return request.serializeBinary();
    },
    colink$server$dev_proto_colink_pb.Empty.deserializeBinary
  );

  interCoreSyncTask(
    request: colink$server$dev_proto_colink_pb.Task,
    metadata: grpcWeb.Metadata | null): Promise<colink$server$dev_proto_colink_pb.Empty>;

  interCoreSyncTask(
    request: colink$server$dev_proto_colink_pb.Task,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.Empty) => void): grpcWeb.ClientReadableStream<colink$server$dev_proto_colink_pb.Empty>;

  interCoreSyncTask(
    request: colink$server$dev_proto_colink_pb.Task,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: colink$server$dev_proto_colink_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/colink.CoLink/InterCoreSyncTask',
        request,
        metadata || {},
        this.methodDescriptorInterCoreSyncTask,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/colink.CoLink/InterCoreSyncTask',
    request,
    metadata || {},
    this.methodDescriptorInterCoreSyncTask);
  }

}


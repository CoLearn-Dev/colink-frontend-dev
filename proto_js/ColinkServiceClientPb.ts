/**
 * @fileoverview gRPC-Web generated client stub for colink
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as proto_colink_pb from './colink_pb';


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

  methodDescriptorGenerateToken = new grpcWeb.MethodDescriptor(
    '/colink.CoLink/GenerateToken',
    grpcWeb.MethodType.UNARY,
    proto_colink_pb.GenerateTokenRequest,
    proto_colink_pb.Jwt,
    (request: proto_colink_pb.GenerateTokenRequest) => {
      return request.serializeBinary();
    },
    proto_colink_pb.Jwt.deserializeBinary
  );

  generateToken(
    request: proto_colink_pb.GenerateTokenRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_colink_pb.Jwt>;

  generateToken(
    request: proto_colink_pb.GenerateTokenRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_colink_pb.Jwt) => void): grpcWeb.ClientReadableStream<proto_colink_pb.Jwt>;

  generateToken(
    request: proto_colink_pb.GenerateTokenRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_colink_pb.Jwt) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/colink.CoLink/GenerateToken',
        request,
        metadata || {},
        this.methodDescriptorGenerateToken,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/colink.CoLink/GenerateToken',
    request,
    metadata || {},
    this.methodDescriptorGenerateToken);
  }

  methodDescriptorImportUser = new grpcWeb.MethodDescriptor(
    '/colink.CoLink/ImportUser',
    grpcWeb.MethodType.UNARY,
    proto_colink_pb.UserConsent,
    proto_colink_pb.Jwt,
    (request: proto_colink_pb.UserConsent) => {
      return request.serializeBinary();
    },
    proto_colink_pb.Jwt.deserializeBinary
  );

  importUser(
    request: proto_colink_pb.UserConsent,
    metadata: grpcWeb.Metadata | null): Promise<proto_colink_pb.Jwt>;

  importUser(
    request: proto_colink_pb.UserConsent,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_colink_pb.Jwt) => void): grpcWeb.ClientReadableStream<proto_colink_pb.Jwt>;

  importUser(
    request: proto_colink_pb.UserConsent,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_colink_pb.Jwt) => void) {
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
    proto_colink_pb.StorageEntry,
    proto_colink_pb.StorageEntry,
    (request: proto_colink_pb.StorageEntry) => {
      return request.serializeBinary();
    },
    proto_colink_pb.StorageEntry.deserializeBinary
  );

  createEntry(
    request: proto_colink_pb.StorageEntry,
    metadata: grpcWeb.Metadata | null): Promise<proto_colink_pb.StorageEntry>;

  createEntry(
    request: proto_colink_pb.StorageEntry,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_colink_pb.StorageEntry) => void): grpcWeb.ClientReadableStream<proto_colink_pb.StorageEntry>;

  createEntry(
    request: proto_colink_pb.StorageEntry,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_colink_pb.StorageEntry) => void) {
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
    proto_colink_pb.StorageEntries,
    proto_colink_pb.StorageEntries,
    (request: proto_colink_pb.StorageEntries) => {
      return request.serializeBinary();
    },
    proto_colink_pb.StorageEntries.deserializeBinary
  );

  readEntries(
    request: proto_colink_pb.StorageEntries,
    metadata: grpcWeb.Metadata | null): Promise<proto_colink_pb.StorageEntries>;

  readEntries(
    request: proto_colink_pb.StorageEntries,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_colink_pb.StorageEntries) => void): grpcWeb.ClientReadableStream<proto_colink_pb.StorageEntries>;

  readEntries(
    request: proto_colink_pb.StorageEntries,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_colink_pb.StorageEntries) => void) {
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
    proto_colink_pb.StorageEntry,
    proto_colink_pb.StorageEntry,
    (request: proto_colink_pb.StorageEntry) => {
      return request.serializeBinary();
    },
    proto_colink_pb.StorageEntry.deserializeBinary
  );

  updateEntry(
    request: proto_colink_pb.StorageEntry,
    metadata: grpcWeb.Metadata | null): Promise<proto_colink_pb.StorageEntry>;

  updateEntry(
    request: proto_colink_pb.StorageEntry,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_colink_pb.StorageEntry) => void): grpcWeb.ClientReadableStream<proto_colink_pb.StorageEntry>;

  updateEntry(
    request: proto_colink_pb.StorageEntry,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_colink_pb.StorageEntry) => void) {
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
    proto_colink_pb.StorageEntry,
    proto_colink_pb.StorageEntry,
    (request: proto_colink_pb.StorageEntry) => {
      return request.serializeBinary();
    },
    proto_colink_pb.StorageEntry.deserializeBinary
  );

  deleteEntry(
    request: proto_colink_pb.StorageEntry,
    metadata: grpcWeb.Metadata | null): Promise<proto_colink_pb.StorageEntry>;

  deleteEntry(
    request: proto_colink_pb.StorageEntry,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_colink_pb.StorageEntry) => void): grpcWeb.ClientReadableStream<proto_colink_pb.StorageEntry>;

  deleteEntry(
    request: proto_colink_pb.StorageEntry,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_colink_pb.StorageEntry) => void) {
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
    proto_colink_pb.ReadKeysRequest,
    proto_colink_pb.StorageEntries,
    (request: proto_colink_pb.ReadKeysRequest) => {
      return request.serializeBinary();
    },
    proto_colink_pb.StorageEntries.deserializeBinary
  );

  readKeys(
    request: proto_colink_pb.ReadKeysRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_colink_pb.StorageEntries>;

  readKeys(
    request: proto_colink_pb.ReadKeysRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_colink_pb.StorageEntries) => void): grpcWeb.ClientReadableStream<proto_colink_pb.StorageEntries>;

  readKeys(
    request: proto_colink_pb.ReadKeysRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_colink_pb.StorageEntries) => void) {
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
    proto_colink_pb.Task,
    proto_colink_pb.Task,
    (request: proto_colink_pb.Task) => {
      return request.serializeBinary();
    },
    proto_colink_pb.Task.deserializeBinary
  );

  createTask(
    request: proto_colink_pb.Task,
    metadata: grpcWeb.Metadata | null): Promise<proto_colink_pb.Task>;

  createTask(
    request: proto_colink_pb.Task,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_colink_pb.Task) => void): grpcWeb.ClientReadableStream<proto_colink_pb.Task>;

  createTask(
    request: proto_colink_pb.Task,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_colink_pb.Task) => void) {
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
    proto_colink_pb.ConfirmTaskRequest,
    proto_colink_pb.Empty,
    (request: proto_colink_pb.ConfirmTaskRequest) => {
      return request.serializeBinary();
    },
    proto_colink_pb.Empty.deserializeBinary
  );

  confirmTask(
    request: proto_colink_pb.ConfirmTaskRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_colink_pb.Empty>;

  confirmTask(
    request: proto_colink_pb.ConfirmTaskRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_colink_pb.Empty) => void): grpcWeb.ClientReadableStream<proto_colink_pb.Empty>;

  confirmTask(
    request: proto_colink_pb.ConfirmTaskRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_colink_pb.Empty) => void) {
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
    proto_colink_pb.Task,
    proto_colink_pb.Empty,
    (request: proto_colink_pb.Task) => {
      return request.serializeBinary();
    },
    proto_colink_pb.Empty.deserializeBinary
  );

  finishTask(
    request: proto_colink_pb.Task,
    metadata: grpcWeb.Metadata | null): Promise<proto_colink_pb.Empty>;

  finishTask(
    request: proto_colink_pb.Task,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_colink_pb.Empty) => void): grpcWeb.ClientReadableStream<proto_colink_pb.Empty>;

  finishTask(
    request: proto_colink_pb.Task,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_colink_pb.Empty) => void) {
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

  methodDescriptorRequestInfo = new grpcWeb.MethodDescriptor(
    '/colink.CoLink/RequestInfo',
    grpcWeb.MethodType.UNARY,
    proto_colink_pb.Empty,
    proto_colink_pb.RequestInfoResponse,
    (request: proto_colink_pb.Empty) => {
      return request.serializeBinary();
    },
    proto_colink_pb.RequestInfoResponse.deserializeBinary
  );

  requestInfo(
    request: proto_colink_pb.Empty,
    metadata: grpcWeb.Metadata | null): Promise<proto_colink_pb.RequestInfoResponse>;

  requestInfo(
    request: proto_colink_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_colink_pb.RequestInfoResponse) => void): grpcWeb.ClientReadableStream<proto_colink_pb.RequestInfoResponse>;

  requestInfo(
    request: proto_colink_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_colink_pb.RequestInfoResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/colink.CoLink/RequestInfo',
        request,
        metadata || {},
        this.methodDescriptorRequestInfo,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/colink.CoLink/RequestInfo',
    request,
    metadata || {},
    this.methodDescriptorRequestInfo);
  }

  methodDescriptorSubscribe = new grpcWeb.MethodDescriptor(
    '/colink.CoLink/Subscribe',
    grpcWeb.MethodType.UNARY,
    proto_colink_pb.SubscribeRequest,
    proto_colink_pb.MQQueueName,
    (request: proto_colink_pb.SubscribeRequest) => {
      return request.serializeBinary();
    },
    proto_colink_pb.MQQueueName.deserializeBinary
  );

  subscribe(
    request: proto_colink_pb.SubscribeRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_colink_pb.MQQueueName>;

  subscribe(
    request: proto_colink_pb.SubscribeRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_colink_pb.MQQueueName) => void): grpcWeb.ClientReadableStream<proto_colink_pb.MQQueueName>;

  subscribe(
    request: proto_colink_pb.SubscribeRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_colink_pb.MQQueueName) => void) {
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
    proto_colink_pb.MQQueueName,
    proto_colink_pb.Empty,
    (request: proto_colink_pb.MQQueueName) => {
      return request.serializeBinary();
    },
    proto_colink_pb.Empty.deserializeBinary
  );

  unsubscribe(
    request: proto_colink_pb.MQQueueName,
    metadata: grpcWeb.Metadata | null): Promise<proto_colink_pb.Empty>;

  unsubscribe(
    request: proto_colink_pb.MQQueueName,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_colink_pb.Empty) => void): grpcWeb.ClientReadableStream<proto_colink_pb.Empty>;

  unsubscribe(
    request: proto_colink_pb.MQQueueName,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_colink_pb.Empty) => void) {
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

  methodDescriptorStartProtocolOperator = new grpcWeb.MethodDescriptor(
    '/colink.CoLink/StartProtocolOperator',
    grpcWeb.MethodType.UNARY,
    proto_colink_pb.StartProtocolOperatorRequest,
    proto_colink_pb.ProtocolOperatorInstanceId,
    (request: proto_colink_pb.StartProtocolOperatorRequest) => {
      return request.serializeBinary();
    },
    proto_colink_pb.ProtocolOperatorInstanceId.deserializeBinary
  );

  startProtocolOperator(
    request: proto_colink_pb.StartProtocolOperatorRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_colink_pb.ProtocolOperatorInstanceId>;

  startProtocolOperator(
    request: proto_colink_pb.StartProtocolOperatorRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_colink_pb.ProtocolOperatorInstanceId) => void): grpcWeb.ClientReadableStream<proto_colink_pb.ProtocolOperatorInstanceId>;

  startProtocolOperator(
    request: proto_colink_pb.StartProtocolOperatorRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_colink_pb.ProtocolOperatorInstanceId) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/colink.CoLink/StartProtocolOperator',
        request,
        metadata || {},
        this.methodDescriptorStartProtocolOperator,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/colink.CoLink/StartProtocolOperator',
    request,
    metadata || {},
    this.methodDescriptorStartProtocolOperator);
  }

  methodDescriptorStopProtocolOperator = new grpcWeb.MethodDescriptor(
    '/colink.CoLink/StopProtocolOperator',
    grpcWeb.MethodType.UNARY,
    proto_colink_pb.ProtocolOperatorInstanceId,
    proto_colink_pb.Empty,
    (request: proto_colink_pb.ProtocolOperatorInstanceId) => {
      return request.serializeBinary();
    },
    proto_colink_pb.Empty.deserializeBinary
  );

  stopProtocolOperator(
    request: proto_colink_pb.ProtocolOperatorInstanceId,
    metadata: grpcWeb.Metadata | null): Promise<proto_colink_pb.Empty>;

  stopProtocolOperator(
    request: proto_colink_pb.ProtocolOperatorInstanceId,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_colink_pb.Empty) => void): grpcWeb.ClientReadableStream<proto_colink_pb.Empty>;

  stopProtocolOperator(
    request: proto_colink_pb.ProtocolOperatorInstanceId,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_colink_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/colink.CoLink/StopProtocolOperator',
        request,
        metadata || {},
        this.methodDescriptorStopProtocolOperator,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/colink.CoLink/StopProtocolOperator',
    request,
    metadata || {},
    this.methodDescriptorStopProtocolOperator);
  }

  methodDescriptorInterCoreSyncTask = new grpcWeb.MethodDescriptor(
    '/colink.CoLink/InterCoreSyncTask',
    grpcWeb.MethodType.UNARY,
    proto_colink_pb.Task,
    proto_colink_pb.Empty,
    (request: proto_colink_pb.Task) => {
      return request.serializeBinary();
    },
    proto_colink_pb.Empty.deserializeBinary
  );

  interCoreSyncTask(
    request: proto_colink_pb.Task,
    metadata: grpcWeb.Metadata | null): Promise<proto_colink_pb.Empty>;

  interCoreSyncTask(
    request: proto_colink_pb.Task,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_colink_pb.Empty) => void): grpcWeb.ClientReadableStream<proto_colink_pb.Empty>;

  interCoreSyncTask(
    request: proto_colink_pb.Task,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_colink_pb.Empty) => void) {
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

  methodDescriptorInterCoreSyncTaskWithReverseConnection = new grpcWeb.MethodDescriptor(
    '/colink.CoLink/InterCoreSyncTaskWithReverseConnection',
    grpcWeb.MethodType.SERVER_STREAMING,
    proto_colink_pb.Task,
    proto_colink_pb.Task,
    (request: proto_colink_pb.Task) => {
      return request.serializeBinary();
    },
    proto_colink_pb.Task.deserializeBinary
  );

  interCoreSyncTaskWithReverseConnection(
    request: proto_colink_pb.Task,
    metadata?: grpcWeb.Metadata): grpcWeb.ClientReadableStream<proto_colink_pb.Task> {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/colink.CoLink/InterCoreSyncTaskWithReverseConnection',
      request,
      metadata || {},
      this.methodDescriptorInterCoreSyncTaskWithReverseConnection);
  }

}


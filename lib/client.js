/*
 * Copyright 2015 Basho Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Core modules
var Core = require('./core/core');

// Ping command
var Ping = require('./commands/ping');

// KV exports / commands
var KV = require('./commands/kv');

// CRDT exports / commands
var CRDT = require('./commands/crdt');

// Yokozuna exports / commands
var YZ = require('./commands/yz');

// Map-Reduce exports / commands
var MR = require('./commands/mr');

/**
 * Provides the Client class
 * @module Client
 */

/**
 * A Class that represents a Riak client.
 *
 * @class Client
 * @constructor
 * @param {String[]|RiakCluster} cluster - either an array of IP|fqdn[:port] or the cluster to use. See {{#crossLink "RiakCluster"}}{{/crossLink}}.
 */
function Client() {
    if (arguments.length === 1 && arguments[0] instanceof Core.RiakCluster) {
        this.cluster = arguments[0];
        this.cluster.start();
    } else if (arguments.length) {
        var nodes = Core.RiakNode.buildNodes(arguments[0]);
        this.cluster = new Core.RiakCluster({ nodes: nodes});
        this.cluster.start();
    } else {
        throw new Error('an array of IP|fqdn[:port] or an instance of RiakCluser is required');
    }
}

/*
 * KV methods
 */

/**
 * See {{#crossLink "RiakCluster/execute:method"}}RiakCluster#execute{{/crossLink}}
 * @method execute
 * @param {Object} command Any Riak command object from the various modules.
 */
Client.prototype.execute = function(command) {
    this.cluster.execute(command);
};

/**
 * See {{#crossLink "Ping"}}{{/crossLink}}
 * @param {Function} callback The callback to be executed when the operation completes.
 */
Client.prototype.ping = function(callback) {
    var cmd = new Ping(callback);
    this.cluster.execute(cmd);
};

/**
 * See {{#crossLink "DeleteValue"}}{{/crossLink}}
 * @method deleteValue
 * @param {Object} options The options for this operation.
 * @param {Function} callback The callback to be executed when the operation completes.
 */
Client.prototype.deleteValue = function(options, callback) {
    var cmd = new KV.DeleteValue(options, callback);
    this.cluster.execute(cmd);
};

/**
 * See {{#crossLink "FetchBucketProps"}}{{/crossLink}}
 * @method fetchBucketProps * @param {Object} options The options for this operation.
 * @param {Function} callback The callback to be executed when the operation completes.
 */
Client.prototype.fetchBucketProps = function(options, callback) {
    var cmd = new KV.FetchBucketProps(options, callback);
    this.cluster.execute(cmd);
};

/**
 * See {{#crossLink "FetchValue"}}{{/crossLink}}
 * @method fetchValue
 * @param {Object} options The options for this operation.
 * @param {Function} callback The callback to be executed when the operation completes.
 */
Client.prototype.fetchValue = function(options, callback) {
    var cmd = new KV.FetchValue(options, callback);
    this.cluster.execute(cmd);
};

/**
 * See {{#crossLink "ListBuckets"}}{{/crossLink}}
 * @method ListBuckets
 * @param {Object} options The options for this operation.
 * @param {Function} callback The callback to be executed when the operation completes.
 */
Client.prototype.listBuckets = function(options, callback) {
    var cmd = new KV.ListBuckets(options, callback);
    this.cluster.execute(cmd);
};

/**
 * See {{#crossLink "ListKeys"}}{{/crossLink}}
 * @method listKeys
 * @param {Object} options The options for this operation.
 * @param {Function} callback The callback to be executed when the operation completes.
 */
Client.prototype.listKeys = function(options, callback) {
    var cmd = new KV.ListKeys(options, callback);
    this.cluster.execute(cmd);
};

/**
 * See {{#crossLink "SecondaryIndexQuery"}}{{/crossLink}}
 * @method secondaryIndexQuery
 * @param {Object} options The options for this operation.
 * @param {Function} callback The callback to be executed when the operation completes.
 */
Client.prototype.secondaryIndexQuery = function(options, callback) {
    var cmd = new KV.SecondaryIndexQuery(options, callback);
    this.cluster.execute(cmd);
};

/**
 * See {{#crossLink "StoreBucketProps"}}{{/crossLink}}
 * @method storeBucketProps
 * @param {Object} options The options for this operation.
 * @param {Function} callback The callback to be executed when the operation completes.
 */
Client.prototype.storeBucketProps = function(options, callback) {
    var cmd = new KV.StoreBucketProps(options, callback);
    this.cluster.execute(cmd);
};

/**
 * See {{#crossLink "StoreValue"}}{{/crossLink}}
 * @method storeValue
 * @param {Object} options The options for this operation.
 * @param {Function} callback The callback to be executed when the operation completes.
 */
Client.prototype.storeValue = function(options, callback) {
    var cmd = new KV.StoreValue(options, callback);
    this.cluster.execute(cmd);
};

/*
 * CRDT methods
 */

/**
 * See {{#crossLink "FetchCounter"}}{{/crossLink}}
 * @method fetchCounter
 * @param {Object} options The options for this operation.
 * @param {Function} callback The callback to be executed when the operation completes.
 */
Client.prototype.fetchCounter = function(options, callback) {
    var cmd = new CRDT.FetchCounter(options, callback);
    this.cluster.execute(cmd);
};

/**
 * See {{#crossLink "UpdateCounter"}}{{/crossLink}}
 * @method updateCounter
 * @param {Object} options The options for this operation.
 * @param {Function} callback The callback to be executed when the operation completes.
 */
Client.prototype.updateCounter = function(options, callback) {
    var cmd = new CRDT.UpdateCounter(options, callback);
    this.cluster.execute(cmd);
};

/**
 * See {{#crossLink "FetchSet"}}{{/crossLink}}
 * @method fetchSet
 * @param {Object} options The options for this operation.
 * @param {Function} callback The callback to be executed when the operation completes.
 */
Client.prototype.fetchSet = function(options, callback) {
    var cmd = new CRDT.FetchSet(options, callback);
    this.cluster.execute(cmd);
};

/**
 * See {{#crossLink "UpdateSet"}}{{/crossLink}}
 * @method updateSet
 * @param {Object} options The options for this operation.
 * @param {Function} callback The callback to be executed when the operation completes.
 */
Client.prototype.updateSet = function(options, callback) {
    var cmd = new CRDT.UpdateSet(options, callback);
    this.cluster.execute(cmd);
};

/**
 * See {{#crossLink "FetchMap"}}{{/crossLink}}
 * @method fetchMap
 * @param {Object} options The options for this operation.
 * @param {Function} callback The callback to be executed when the operation completes.
 */
Client.prototype.fetchMap = function(options, callback) {
    var cmd = new CRDT.FetchMap(options, callback);
    this.cluster.execute(cmd);
};

/**
 * See {{#crossLink "UpdateMap"}}{{/crossLink}}
 * @method updateMap
 * @param {Object} options The options for this operation.
 * @param {Function} callback The callback to be executed when the operation completes.
 */
Client.prototype.updateMap = function(options, callback) {
    var cmd = new CRDT.UpdateMap(options, callback);
    this.cluster.execute(cmd);
};

/*
 * YZ methods
 */

/**
 * See {{#crossLink "DeleteIndex"}}{{/crossLink}}
 * @method deleteIndex
 * @param {Object} options The options for this operation.
 * @param {Function} callback The callback to be executed when the operation completes.
 */
Client.prototype.deleteIndex = function(options, callback) {
    var cmd = new YZ.DeleteIndex(options, callback);
    this.cluster.execute(cmd);
};

/**
 * See {{#crossLink "FetchIndex"}}{{/crossLink}}
 * @method fetchIndex
 * @param {Object} options The options for this operation.
 * @param {Function} callback The callback to be executed when the operation completes.
 */
Client.prototype.fetchIndex = function(options, callback) {
    var cmd = new YZ.FetchIndex(options, callback);
    this.cluster.execute(cmd);
};

/**
 * See {{#crossLink "FetchSchema"}}{{/crossLink}}
 * @method fetchSchema
 * @param {Object} options The options for this operation.
 * @param {Function} callback The callback to be executed when the operation completes.
 */
Client.prototype.fetchSchema = function(options, callback) {
    var cmd = new YZ.FetchSchema(options, callback);
    this.cluster.execute(cmd);
};

/**
 * See {{#crossLink "Search"}}{{/crossLink}}
 * @method search
 * @param {Object} options The options for this operation.
 * @param {Function} callback The callback to be executed when the operation completes.
 */
Client.prototype.search = function(options, callback) {
    var cmd = new YZ.Search(options, callback);
    this.cluster.execute(cmd);
};

/**
 * See {{#crossLink "StoreIndex"}}{{/crossLink}}
 * @method storeIndex
 * @param {Object} options The options for this operation.
 * @param {Function} callback The callback to be executed when the operation completes.
 */
Client.prototype.storeIndex = function(options, callback) {
    var cmd = new YZ.StoreIndex(options, callback);
    this.cluster.execute(cmd);
};

/**
 * See {{#crossLink "StoreSchema"}}{{/crossLink}}
 * @method storeSchema
 * @param {Object} options The options for this operation.
 * @param {Function} callback The callback to be executed when the operation completes.
 */
Client.prototype.storeSchema = function(options, callback) {
    var cmd = new YZ.StoreSchema(options, callback);
    this.cluster.execute(cmd);
};

/*
 * MR 
 */

/**
 * See {{#crossLink "MapReduce"}}{{/crossLink}}
 * @method mapReduce
 * @param {Object} options The options for this operation.
 * @param {Function} callback The callback to be executed when the operation completes.
 */
Client.prototype.mapReduce = function(options, callback) {
    var cmd = new MR.MapReduce(options, callback);
    this.cluster.execute(cmd);
};


// Namespaces
function Riak() { }
function Commands() { }

// Core exports
module.exports = Riak;
module.exports.Client = Client;

module.exports.Node = Core.RiakNode;
module.exports.Node.buildNodes = Core.RiakNode.buildNodes;
module.exports.Node.Builder = Core.RiakNode.Builder;

module.exports.Cluster = Core.RiakCluster;
module.exports.Cluster.Builder = Core.RiakCluster.Builder;

// Command exports
module.exports.Commands = Commands;
module.exports.Commands.Ping = Ping;

module.exports.Commands.KV = KV;
module.exports.Commands.CRDT = CRDT;
module.exports.Commands.YZ = YZ;
module.exports.Commands.MR = MR;

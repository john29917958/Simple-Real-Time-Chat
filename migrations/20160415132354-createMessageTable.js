'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  db.createTable('messages', {
    id: { type: 'int', primaryKey: true},
    user: 'string',
    text: 'string',
    createdAt: 'datetime',
    updatedAt: 'datetime'
  })
};

exports.down = function(db) {
  db.dropTable('messages');
};

exports.ACTV_GET_RULE = {
  id: {type: 'id'}
};

exports.ACTV_FETCH_RULE = {
  page: {type: 'integer'},
  pageSize: {type: 'integer'},
};

exports.ACTV_ADD_RULE = {
  pic: {type: 'string'},
  title: {type: 'string'},
  sponsor: {type: 'string'},
  abstract: {type: 'string'},
  url: {type: 'string'},
  order: {type: 'integer', required: false}
};

exports.ACTV_UPDATE_RULE = {
  update: {type: 'object', required: true}
};

exports.ACTV_DELETE_RULE = {
  id: {type: 'id'},
};

exports.RECOM_ACTV_ADD_RULE = {
  sid: {type: 'id'},
  weight: {type: 'integer'}
};

exports.RECOM_ACTV_UPDATE_RULE = {
  update: {type: 'object', required: true}
};

exports.RECOM_ACTV_DELETE_RULE = {
  id: {types: 'id'}
};
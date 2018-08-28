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
  url: {type: 'string'}
};

exports.ACTV_UPDATE_RULE = {
  update: {type: 'object'}
};

exports.ACTV_DELETE_RULE = {
  id: {type: 'id'},
};
exports.DAPP_GET_RULE = {
  id: {type: 'id'}
};

exports.DAPP_FETCH_RULE = {
  page: {type: 'integer'},
  pageSize: {type: 'integer'}
};

exports.DAPP_ADD_RULE = {
  icon: {type: 'url'},
  type: {type: 'string'},
  name: {type: 'string'},
  url: {type: 'url'},
  author: {type: 'string'},
  intro: {type: 'string'},
  content: {type: 'string'}
};

exports.DAPP_UPDATE_RULE = {
  update: {type: 'object'}
};

exports.DAPP_DELETE_RULE = {
  id: {type: 'id'}
};
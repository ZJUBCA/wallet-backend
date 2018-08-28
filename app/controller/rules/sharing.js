exports.SHARING_GET_RULE = {
  id: {type: 'id'}
};

exports.SHARING_FETCH_RULE = {
  page: {type: 'int'},
  pageSize: {type: 'int'}
};

exports.SHARING_ADD_RULE = {
  pic: {type: 'url'},
  author: {type: 'string'},
  title: {type: 'string'},
  content: {type: 'string'},
};

exports.SHARING_UPDATE_RULE = {
  update: {type: 'object'}
};

exports.SHARING_DELETE_RULE = {
  id: {type: 'id'}
};

exports.SHARING_SEARCH_RULE = {
  keywords: {type: 'string'}
};
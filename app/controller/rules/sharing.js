exports.SHARING_GET_RULE = {
  id: {type: 'id'}
};

exports.SHARING_FETCH_RULE = {
  page: {type: 'integer'},
  pageSize: {type: 'integer'}
};

exports.SHARING_ADD_RULE = {
  pic: {type: 'url'},
  author: {type: 'string'},
  title: {type: 'string'},
  content: {type: 'string'},
};

exports.SHARING_UPDATE_RULE = {
  id: {type: 'id'},
  update: {type: 'json'}
};

exports.SHARING_DELETE_RULE = {
  id: {type: 'id'}
};

exports.SHARING_SEARCH_RULE = {
  keywords: {type: 'string'}
};
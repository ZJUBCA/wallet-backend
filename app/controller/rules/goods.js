exports.GOODS_GET_RULE = {
  id: {type: 'id'}
};

exports.GOODS_FETCH_RULE = {
  page: {type: 'integer'},
  pageSize: {type: 'integer'}
};

exports.GOODS_ADD_RULE = {
  pic: {type: 'url'},
  name: {type: 'string'},
  provider: {type: 'string'},
  intro: {type: 'string'},
  value: {type: 'number'},
  token: {type: 'string'},
  deadline: {type: 'dateTime'}
};

exports.GOODS_UPDATE_RULE = {
  update: {type: 'object'}
};
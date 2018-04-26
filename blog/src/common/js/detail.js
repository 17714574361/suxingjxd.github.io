import AV from 'leancloud-storage'

export default function toDetail(id, callbackSuccess, callbackError) {
  var query = new AV.Query('Article');
  query.get(id).then(function (result) {
    console.log("de",result)
    let query = new AV.Query('Account');
    query.equalTo('user_id', result.attributes.user_id);
    query.find().then(function (account) {
      result.attributes.headurl = account[0].attributes.headurl
      result.attributes.nickname = account[0].attributes.nickname
      callbackSuccess(result)
    }, function (err) {
      callbackError(err)
      console.log(err)
    })
    // console.log(newres);

  }, function (err) {
    console.log(err)
    callbackError(err)
  })
}

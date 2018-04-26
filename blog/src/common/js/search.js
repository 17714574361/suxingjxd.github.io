import AV from 'leancloud-storage'

export default function toSearch(con, callbackSuccess, callbackError) {
  let query = new AV.Query('Article');
  query.descending('-createAt');
  query.contains('content', con);
  query.find()
    .then(function (result) {

      let newres = [];
      for (let item of result) {
        let userid = item.attributes.user_id
        let query = new AV.Query('Account');
        query.equalTo('user_id', userid);
        query.find().then(function (account) {
          item.attributes.headurl = account[0].attributes.headurl
          item.attributes.nickname = account[0].attributes.nickname
          newres.push(item)
        }, function (err) {
          console.log(err)
        })

      }

      console.log('result ', newres)
      callbackSuccess(newres)
    }).catch(function (err) {
    console.log(JSON.stringify(err))
    callbackError(err)
  })
}

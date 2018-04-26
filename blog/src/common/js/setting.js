import AV from 'leancloud-storage'

/**
 * 获取个人信息
 * @param user_id
 * @param callbackSuccess
 * @param callbackError
 */
export function getUserInfo(user_id, callbackSuccess, callbackError) {
  let query = new AV.Query('Account');
  query.equalTo('user_id', user_id);
  query.find().then(function (account) {
    console.log('setting_mounted', account)
    callbackSuccess(account)
  }, function (err) {
    console.log(err)
    callbackError(err)
  })
}

/**
 * 保存头像及保存headurl
 * @param user_id
 * @param callbackSuccess
 * @param callbackError
 */
export function save_headurl(localFile, callbackSuccess, callbackError) {
  let currentUser = AV.User.current();
  let name = currentUser.id + '.jpg';
  let file_img = new AV.File(name, localFile);
  file_img.save().then(function (file) {
    // 文件保存成功
    // console.log(file.url());
    let query = new AV.Query('Account');
    query.equalTo('user_id', currentUser.id);
    query.find().then(function (account) {
      console.log('file', account[0])
      account[0].set('headurl', file.url())
      account[0].save()
      callbackSuccess(account)
    }, function (err) {
      console.log(err)
      callbackSuccess(err)
    })
  }, function (error) {
    // 异常处理
    console.error(error);
    callbackSuccess(err)
  });
}

/**
 * 保存个人信息
 * @param user_id
 * @param callbackSuccess
 * @param callbackError
 */
export function save_info(nickname, blogName, introduce, web, callbackSuccess, callbackError) {
  let currentUser = AV.User.current();
  let query = new AV.Query('Account');
  query.equalTo('user_id', currentUser.id);
  query.find().then(function (account) {
    console.log('save', account[0])
    account[0].set('nickname', nickname)
    account[0].set('blogname', blogName)
    account[0].set('introduce', introduce)
    account[0].set('web', web)
    account[0].save()
  }, function (err) {
    console.log(err)
  })
}

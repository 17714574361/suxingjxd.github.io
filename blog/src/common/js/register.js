import AV from 'leancloud-storage'

export default function toRegister(username, password, nickname, callbackSuccess, callbackError) {
  var user = new AV.User();
  user.setUsername(username);
  user.setPassword(password);
  user.setEmail(username);
  user.signUp().then(function (loginedUser) {
    console.log(loginedUser)
    let Account = AV.Object.extend('Account');
    let account = new Account();
    account.set('user_id', loginedUser.id)
    account.set('nickname', nickname)
    account.set('blogname', '')
    account.set('introduce', '')
    account.set('web', '')
    account.set('headurl', '')
    account.save()
      .then(function (result) {
        console.log(result)
        callbackSuccess(result)
      }, function (err) {
        console.log(err)
        callbackError(err)
      })
  }, function (err) {
    console.log(err)
  })
}

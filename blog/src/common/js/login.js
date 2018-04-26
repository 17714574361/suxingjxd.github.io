import AV from 'leancloud-storage'

export default function toLogin(username, password, callbackSuccess, callbackError) {
  AV.User.logIn(username, password)
    .then(function (loginedUser) {
      callbackSuccess(loginedUser)
    }, function (err) {
      callbackError(err)
    })
}

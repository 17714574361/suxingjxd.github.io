import AV from 'leancloud-storage'

export function to_del(id, callbackSuccess, callbackError) {
  let todo = AV.Object.createWithoutData('Article', id);
  todo.destroy().then(function (success) {
    // 删除成功
    console.log('del success')
    callbackSuccess(success)
  }, function (error) {
    // 删除失败
    callbackError(error)
    console.log('del fail')
  });
}

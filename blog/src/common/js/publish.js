import AV from 'leancloud-storage'

export function toPublish(article_title, input, compiledMarkdown, callbackSuccess, callbackError) {
  console.log('comp', compiledMarkdown)
  var currentUser = AV.User.current();
  let Article = AV.Object.extend('Article');
  let article = new Article();
  article.set('title', article_title);
  article.set('input', input);
  article.set('content', compiledMarkdown);
  article.set('user_id', currentUser.id)
  article.set('publish', 1)//1表示发布，0表示保存
  article.save()
    .then(function (result) {
      console.log(result)
      callbackSuccess(result)
      // alert('发布成功');
    }, function (err) {
      console.log(err)
      callbackError(err)
      // alert('发布失败')
    })
}


export function toLoad(id, callbackSuccess, callbackError) {
  var query = new AV.Query('Article');
  query.get(id).then(function (result) {
    console.log("toLoad", result)
    callbackSuccess(result)
  }, function (err) {
    console.log(err)
    callbackError(err)
  })
}

export function toUpdateArticle(id, title, input, compiledMarkdown, callbackSuccess, callbackError) {

  let query = new AV.Query('Article');
  query.equalTo('objectId', id);
  query.find().then(function (article) {
    console.log('save', article[0])
    article[0].set('title', title);
    article[0].set('input', input);
    article[0].set('content', compiledMarkdown);
    article[0].save()
    callbackSuccess(article)
  }, function (err) {
    console.log(err)
    callbackError(err)
  })
}

export default {
  checkEmail: function (str) {
    let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    return reg.test(str);
  },

  /**
   * @return {boolean}
   */
  CheckPassWord: function (password) {//密码必须包含数字和字母
    let reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
    return reg.test(password);
  }
}

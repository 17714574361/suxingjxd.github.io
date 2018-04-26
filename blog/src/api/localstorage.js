export let localStorageApi = {
  setData: function (name, obj) {
    localStorage.setItem(name, JSON.stringify(obj))
  },
  getData: function (name) {
    if (localStorage.getItem(name)) {
      let jsons = localStorage.getItem(name);
      return JSON.parse(jsons);
    } else {
      return ''
    }
  }
}

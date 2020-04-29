//設定dom
  var form = document.querySelector('form')
  var displayArea = document.querySelector('ul')
  //因為是從localStorage撈資料，所以陣列資料可以跨瀏覽器分頁做使用、即使關掉分頁或瀏覽器再打開仍不會消失。
  //一開始localStorage沒有資料，所以設為空陣列。
  var wishList = JSON.parse(localStorage.getItem('wishList')) || []



//輸入資料→新增到螢幕顯示、新增到陣列、新增到localStorage
  form.addEventListener('submit', event => {
    event.preventDefault()
    //get <input type="text" name='wish' placeholder="Create a new wish" required maxlength="25">
    var input = document.querySelector('input[type="text"]')
    displayWish(input.value)    //新增到螢幕顯示
    wishList.push(input.value)    //新增到陣列
    updateLocalStorage(input.value)    //新增到LocalStorage
    //清除輸入資料
    input.value = ''
  })



//更新螢幕顯示
  function displayWish(input) {
    displayArea.innerHTML += `
      <li>${input}<span>X</span></li>
    `
  }



//更新localStorage，並同步更新螢幕顯示
//因為是從localStorage撈資料，所以螢幕顯示資料可以跨瀏覽器分頁做使用、即使關掉分頁或瀏覽器再打開仍不會消失。
  function updateLocalStorage() {
    localStorage.setItem('wishList', JSON.stringify(wishList))
  }
  function displayWishList() {
    wishList.forEach(wish => displayWish(wish))
  }
  displayWishList()  



//點擊某項資料的<span>X</span>→從螢幕顯示移除、從陣列移除、從localStorage移除
displayArea.addEventListener('click', event => {
  if (event.target.tagName !== 'SPAN') { return }
  var li = event.target.parentElement
  //event.target:<span>X</span>
  //event.target.parentElement:<li>${input}<span>X</span></li>
  li.remove()    //從螢幕顯示移除
  wishList.splice(wishList.indexOf(li.textContent.slice(0, -1)), 1)    //從陣列移除
  //arr.splice(指定第幾筆資料,要刪除幾筆資料)
  //arr.indexOf(欲在陣列中搜尋的元素)，回傳值為陣列中找到的第一個元素索引值，沒找到則為 -1
  //li.textContent:${input}<span>X</span>，例如882X
  //li.textContent.slice(0, -1) :${input}，例如882
  //str.slice(0, -1) 提取第一個字符到倒数第一個字符(不包含倒数第一個字符)
  updateLocalStorage()    //從localStorage移除
})
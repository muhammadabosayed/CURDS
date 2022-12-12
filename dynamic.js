let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
//test all elements selectors by id
// console.log(title,price,taxes,ads,discount,total,count,category,submit)
// functions
/*
 * 1 - get total
 * 2 - create prouduct
 * 3 - save in local storage
 * 4 - clrear inputs
 * 5 - read
 * 6 - count
 * 7 - delete
 * 8 - update
 * 9 - search
 * 10 - clean data
 */
let temp // note
/********************/
// 1 - get total
function getTotal() {
  if (price.value != '') {
    let result = +price.value + +taxes.value + +ads.value - +discount.value
    total.innerHTML = result
    total.style.background = 'green'
  } else {
    total.innerHTML = ''
    total.style.background = 'rgb(194, 0, 0)'
  }
}
// 2 - create prouduct
/*
save data in localStorage and move data saved from localstorage to array
*/
let dataPro
if (localStorage.prouduct != null) {
  dataPro = JSON.parse(localStorage.prouduct)
} else {
  dataPro = []
}
let mood = 'create'
submit.onclick = function () {
  let newpro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  }
  if (title.value != '' && price.value != '' && category.value != '') {
    if (mood === 'create') {
      if (+count.value > 1 && +count.value <= 100) {
        for (let i = 0; i < +count.value; i++) {
          dataPro.push(newpro)
        }
      } else {
        dataPro.push(newpro)
      }
    } else {
      dataPro[temp] = newpro
      count.style.display = 'inline'
      submit.innerHTML = 'Create'
    }
    //clear data from inputs after creating
    clearData()
  } else {
    if (title.value == '') {
      title.focus()
    } else if (price.value == '') {
      price.focus()
    } else if (category.value == '') {
      category.focus()
    }
  }

  localStorage.setItem('prouduct', JSON.stringify(dataPro))

  // show data after creating
  showData()
  // console.log(dataPro)
}

// clear data from inputs
function clearData() {
  title.value = ''
  price.value = ''
  taxes.value = ''
  ads.value = ''
  discount.value = ''
  count.value = ''
  total.innerHTML = ''
  total.style.background = 'rgb(194, 0, 0)'
  category.value = ''
}
///////////////////////////////
/* Read Data */

function showData() {
  let tbody = document.getElementById('tbody')
  let table = ''
  for (let i = 0; i < dataPro.length; i++) {
    table += `
        <tr>
          <td>${i+1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick = "updateData(${i})" id="update">update</button></td>
          <td><button onclick="deleteData(${i})" id="delete">delete</button></td>        
        </tr>
  `
  }
  tbody.innerHTML = table

  let deleteAll = document.getElementById('deleteAll')
  if (dataPro.length > 0) {
    deleteAll.innerHTML = `<button onclick="deleteAllData()">deleteAll ( ${dataPro.length} )</button>
  `
  } else {
    deleteAll.innerHTML = ''
  }
}
showData()

/* delete one product */
function deleteData(i) {
  dataPro.splice(i, 1)
  localStorage.prouduct = JSON.stringify(dataPro)
  showData()
}
/* delete All Data */
function deleteAllData() {
  localStorage.clear()
  dataPro.splice(0)
  showData()
}
/* update Data */
function updateData(i) {
  title.value = dataPro[i].title
  price.value = dataPro[i].price
  taxes.value = dataPro[i].taxes
  ads.value = dataPro[i].ads
  discount.value = dataPro[i].discount
  getTotal()
  count.style.display = 'none'
  category.value = dataPro[i].category
  submit.innerHTML = 'Update'
  mood = 'Update'
  temp = i
  scroll({
    top: 0,
    behavior: 'smooth',
  })
}

// search about data
let searchMood = 'title'
function getSearchMood(id) {
  let search = document.getElementById('search')
  if (id === 'searchTitle') {
    searchMood = 'title'
    search.placeholder = 'Search By Title'
  } else {
    searchMood = 'category'
    search.placeholder = 'Search By Category'
  }
  search.focus()
  search.value = ''
  showData()
}

function searchData(value) {
  let table = ''
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood === 'title') {
      if (dataPro[i].title.includes(value)) {
        table += `
  <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick = "updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>        
  </tr>
`
      }
    } else {
      if (dataPro[i].category.includes(value)) {
        table += `
      <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick = "updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>        
      </tr>
    `
      }
    }
  }
  tbody.innerHTML = table
}

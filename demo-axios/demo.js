var url = 'http://127.0.0.1:3000/products';
var products = [];
function getData(){
	return axios.get(url)
	  .then(function (response) {
	    return response.data;
	  })
	  .then(function (myJson){
	  	products = myJson;
	  	render(products);
	  });
}
function innerBtn(item){
	if(item === 'add'){
		var a = document.getElementById('pad');
		a.innerHTML ='<button id="btn-add">Add</button>';
	}else{
		var a = document.getElementById('pad');
		a.innerHTML ='<button id="btn-save">Save</button>';
	}
}
function render(item){
	var listProduct = document.getElementById('table-product');
	var conten = item.map(function(item){
		return '<tr><td>'+ item.name +'</td><td>'+ item.price +'</td><td><button id="e'+item.id+'">Edit</button><button id="d'+item.id+'">Delete</button></td></tr>';
	});
	listProduct.innerHTML = conten.join('');
	innerBtn('add');
}

function addItem(){
	var product = {
		name: this.name,
		price: this.price
	};
	var addName = document.getElementById('nameProduct');
	var addPrice =  document.getElementById('priceProduct');
	if(addName.value != '' && addPrice.value != ''){
		product.name = addName.value;
		product.price = parseInt(addPrice.value);
		postProduct(product);
		addName.value = '';
		addPrice.value = '';
	}
}

function postProduct(json){
	axios.post(url, {
    name: json.name,
    price: json.price
   })
   .then(function (response) {
   	 getData();
     return response;
   })
   .catch(function (error) {
     console.log(error);
   });
}
function putProduct(id, name, price){
	axios.put(url+'/'+id, {
    name: name,
    price: price
   })
   .then(function (response) {
   	 getData();
     return response;
   })
   .catch(function (error) {
     console.log(error);
   });
}
function editProduct(id, items){
	var addName = document.getElementById('nameProduct');
	var addPrice =  document.getElementById('priceProduct');
	items.filter(function(item){
		if(item.id === id){
			addName.value = item.name;
			addPrice.value = item.price;
		}
	});
	var btnEdit = document.getElementById('pad');
	btnEdit.addEventListener('click',function(e){
		if(e.target && e.target.nodeName == "BUTTON") {
			putProduct(id, addName.value, addPrice.value);
        	}
	});
}
function deleteProduct(id){
	axios.delete(url+'/'+id, {
   })
   .then(function (response) {
   	 getData();
     return response;
   })
   .catch(function (error) {
     console.log(error);
   });
}
function main(){
	getData();
	window.onload=function(){
 		var btnAdd = document.getElementById('pad');
		btnAdd.addEventListener('click', function(e){
			if(e.target && e.target.nodeName == "BUTTON") {
				addItem();
        	}
		});
		var getBtn = document.getElementById('table-product');
		getBtn.addEventListener('click',function(e){
			if(e.target && e.target.nodeName == "BUTTON") {
				if(e.target.id[0]=='e'){
					editProduct(parseInt(e.target.id.slice(1)), products);
					innerBtn('edit');
				}
				else{
					deleteProduct(parseInt(e.target.id.slice(1)));
				}
        	}
		});
	}
}
main();
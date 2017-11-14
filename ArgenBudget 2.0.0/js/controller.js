/* Almacenar datos en Collections */

var storePurchase = [],
    totalPurchases = [];

/* Chequear si hay datos en localStorage al cargar APP */

var localS = localStorage.getItem('test');

if (localS) {

  localtoJson = JSON.parse( "[" + localS + "]");

  for (var i in localtoJson) {
    purchaseCreation(localtoJson[i].purchaseId,localtoJson[i]); 
  }
}

/* Modelo de Creación de Compra */

function getValues( product ) {

  this.price = document.getElementById('price').value;
  this.kilos = document.getElementById('kilos').value;
  this.product = document.getElementById('product').value;
  this.date = document.getElementById('date').value;
  this.brand = document.getElementById('brand').value;
  this.category = document.getElementById('category').value;

  var a = isNaN(this.price);
  var b = isNaN(this.kilos);

  if (a === true && b === true) {
    alert("Price and kilos must be numbers");
    return false;
  } else {
 
    this.getInfoProduct = function () {
      return this.product;
    };

    this.getInfoDate = function () {
      return this.date;
    };

    this.getInfoPrice = function () {
      return this.price;
    };

    this.getInfoKilos = function () {
      return this.kilos;
    };

    this.getInfoBrand = function () {
      return this.brand;
    };

    this.getInfoCategory = function () {
      return this.category;
    };
  }
}

/* Instancias del Modelo de Compra */
/* Comienzo de la construcción de la compra *//////////////////////////////////////////////////////////////////////////////////////////

function newProduct (){

  var nuevoGasto = new getValues(product);

  /* Validación de Campos vacíos */

  if(nuevoGasto.getInfoCategory() == ""){
    alert('Debe ingresar una categoría de compra')
    return false
  } else if (nuevoGasto.getInfoProduct() == ""){
    alert('Debe ingresar un producto')
    return false
  } else if (nuevoGasto.getInfoDate() == ""){
    alert('Debe ingresar una fecha')
    return false
  } else if (nuevoGasto.getInfoKilos() == ""){
    alert('Debe ingresar la cantidad')
    return false
  } else if (nuevoGasto.getInfoBrand() == ""){
    alert('Debe ingresar la marca')
    return false
  } else if (nuevoGasto.getInfoPrice() == ""){
    alert('Debe ingresar un precio')
    return false
  }

  /* Push into array */

  var objects = { 
                  purchaseId : makeid(), 
                  producto : nuevoGasto.getInfoProduct(), 
                  fecha : nuevoGasto.getInfoDate(), 
                  precio : nuevoGasto.getInfoPrice(), 
                  kilos : nuevoGasto.getInfoKilos(), 
                  marca : nuevoGasto.getInfoBrand(), 
                  categoria : nuevoGasto.getInfoCategory() 
                }

  storePurchase.push(objects);

  /* Handle Local Storage */

  var local = localStorage.getItem('test'),
      localStatus;

  // Determina si hay algo en el DOM y de esa forma se sabe si localstorage está vacío pero no NULL.
  var checkLast = $("#demo").children().length == 0;

  if(local != null && checkLast == false) {
    localStatus = JSON.stringify(objects) + "," + local;
  } else {
    localStatus = JSON.stringify(objects);
  }

  localStorage.setItem('test', localStatus);
  alert("Su producto ha sido ingresado con éxito");

  purchaseCreation(objects.purchaseId);

}

/* Create Purchase */

function purchaseCreation(purchaseId,readCache) { 

  var createUl = document.createElement('ul');
  var getDemo = document.getElementById("demo");
  var createRemovePurchaseButton = document.createElement('input');
      createRemovePurchaseButton.setAttribute("type","button");
      createRemovePurchaseButton.setAttribute("value","Borrar Compra");
  var randomId = purchaseId;
      createRemovePurchaseButton.setAttribute("id",randomId);
      createRemovePurchaseButton.setAttribute("class","borrarCompra");
  var getNumber = purchaseId;
      createUl.setAttribute("id",getNumber);
      getDemo.appendChild(createUl);
      createUl.appendChild(createRemovePurchaseButton);

  var selectUL = document.getElementById(getNumber);

  /* Loop array with for with background color change on category select */

  var text = "";

  if (readCache) {
    var lastItem = readCache;
    totalPurchases.push(readCache);
  } else {
    totalPurchases.push(storePurchase[0]);
    var lastItem = storePurchase.pop();
  }

  for (var i in lastItem) {

    if (i != "purchaseId") {

      if ( lastItem.hasOwnProperty(i) ) {

        var newElem = document.createElement("li"),
            createDiv = document.createElement("div"),
            createEditItem = document.createElement('input');

            newElem.appendChild(createDiv);
            createDiv.innerHTML = text = lastItem[i];
            createDiv.setAttribute("class","dataValue");

            createEditItem.setAttribute("type","button");
            createEditItem.setAttribute("value","Editar");
            createEditItem.setAttribute("class","edit");
            newElem.appendChild(createEditItem);

        var getCategoryValue = lastItem.categoria;
      
        if (getCategoryValue == "Supermercado"){
            selectUL.classList.add('coral');
            selectUL.appendChild(newElem);
        } else if (getCategoryValue == "Impuestos"){
            selectUL.classList.add('aquamarine');
            selectUL.appendChild(newElem);
        } else if (getCategoryValue == "Salidas"){
            selectUL.classList.add('chocolate');
            selectUL.appendChild(newElem);
        } else if (getCategoryValue == "Varios"){
            selectUL.classList.add('crimson');
            selectUL.appendChild(newElem);
        } else {
            selectUL.classList.add('personalizados');
            selectUL.appendChild(newElem);
        }
      }
    }
  }

  $(selectUL).find("li:last-child").addClass("mainCategoryClass");
  $(selectUL).addClass("newPurchase");

  /* Remueve los datos del input */

  document.getElementById('product').value=null;
  document.getElementById('date').value=null;
  document.getElementById('price').value=null;
  document.getElementById('kilos').value=null;
  document.getElementById('brand').value=null;

  /* Eventos dentro de final de función */

  /* Editar Items */

  $('ul#' + getNumber + '>li>input.edit').click(function(){
    var edit = prompt("Ingrese el cambio de valor");
    if (edit != null) {
      $(this).parent().find(".dataValue").empty().append(edit);
      var getIndex = $(this).parent().index(),
          getUl = $(this).parent().parent().index();

      /* Cambiando valor en sesión actual + Guardar cambios en LocalStorage */

      switch (getIndex) {
        case 1:
          lastItem['producto'] = edit;
          totalPurchases[getUl].producto = edit;
          editStorage(totalPurchases);
          break;
        case 2:
          lastItem['fecha'] = edit;
          totalPurchases[getUl].fecha = edit;
          editStorage(totalPurchases);
          break;
        case 3:
          lastItem['precio'] = edit;
          totalPurchases[getUl].precio = edit;
          editStorage(totalPurchases);
          break;
        case 4:
          lastItem['kilos'] = edit;
          totalPurchases[getUl].kilos = edit;
          editStorage(totalPurchases);
          break;
        case 5:
          lastItem['marca'] = edit;
          totalPurchases[getUl].marca = edit;
          editStorage(totalPurchases);
          break;
      }

      function editStorage (totalPurchases) {
          var toStringEdit = JSON.stringify(totalPurchases);
          toStringEdit = toStringEdit.replace("[", "");
          toStringEdit = toStringEdit.replace("]", "");

          localStorage.setItem('test', toStringEdit);
      }

      alert("Valor cambiado con éxito");
     }
  });

  /* Borrar Compra */

  $("#demo ul #" + randomId + "").click(function(event){
    console.dir(event);
    var ulErase = $(this).parent().index();
    //debugger
    if (confirm("desea borrar la compra?") == true) {
      $(this).parent("ul").remove();

      totalPurchases.splice(ulErase, 1);

      var toStringErase = JSON.stringify(totalPurchases);
      toStringErase = toStringErase.replace("[", "");
      toStringErase = toStringErase.replace("]", "");

      localStorage.setItem('test', toStringErase);

      alert("Compra borrada");
      setTimeout(function(){
        document.getElementById('alert').innerHTML="";
      }, 3000);
      emptyExpenses();
    }
    cantidadDeCompras();
  });

  cantidadDeCompras();
  emptyExpenses();
}

/* Fin de la construcción de la compra *//////////////////////////////////////////////////////////////////////////////////////////

/* Tools *////////////////////////////

/* Genera String aleatorias de 5 caracteres */

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 8; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

/* Agregar categorías */

function createCategories (){

  var getCategorieValue = document.getElementById('categories').value;

  if (getCategorieValue.length<3) {
      alert("Es necesario ingresar 3 letras por categoría por lo menos");
      return false;
  } else {

  var newElem = document.createElement ("option");
  newElem.innerHTML = getCategorieValue;
  var container = document.getElementById ("category");
  container.appendChild (newElem);
  alert("Su categoría "+ getCategorieValue +" se ha ingresado con éxito");

  /* Remueve los datos del input */
  document.getElementById('categories').value=null;
  readAllCategoriesFilter();
  }
}

/* Remover categorías */

function removeCategories () {

  function readAllCategories() {
    var txt="";
    var c = document.getElementById('category');
    var selectId = document.getElementById('removeCategoriesContent');

    for (i=1; i<c.length; i++){
      txt = txt + "<li>" + c[i].childNodes[0].nodeValue + "</li>";
    }
    selectId.innerHTML = "<ul id='newUl'>" + txt + "</ul>";
    remove();
  }
  readAllCategories();

  function remove(){
    $("#newUl li").click(function(){

      var getClickValue = $(this).text();
      var getIndex = $(this).index()+1;

      if (confirm("Desea borrar también el contenido de las categorías") == true) {
        removeCat();
        removeContent();
        alert("Categoría y contenido borrados con éxito");
      } else {
        removeCat();
        alert("Categoría borrada con éxito");
      }

      function removeCat(){
        var select = document.getElementById('category');
        select.removeChild(select[getIndex]);
        $('#newUl').remove(); 
        readAllCategories();
        readAllCategoriesFilter();
      }

      function removeContent(){
        var getClickValueWithStrings = getClickValue + "  ";
        $(".mainCategoryClass:contains("+getClickValueWithStrings+")").parent().parent().remove();
      }
    });
  }
  
}

/* Leer categorías */

function readAllCategoriesFilter() {
	var txt="",
		c = document.getElementById('category'),
		selectId = document.getElementById('content-filters');

	for (i=1; i<c.length; i++){
	  	var filtername = c[i].childNodes[0].nodeValue;
	  	txt = txt + "<li>" + filtername + '<input type="radio" name="filter" value=' + filtername + '>' + "</li>";
	  	selectId.innerHTML = "<ul id='loadFilter'>" + txt + "</ul>";
		$('#filter input:radio').click(function(e){ 
			var getTarget = e.target,
			getAtribute = $(getTarget).attr("value");
			if ($(this).is(':checked')) {
				$(".newPurchase").removeClass("show");
  			$(".newPurchase").addClass("hide");
  			$(".mainCategoryClass:contains(" + getAtribute + ")").parent().addClass("show");	  		
	  	}
		})	

		$('#filter input:radio#noFilter').click(function(e){
			$(".newPurchase").removeClass("show");
			$(".newPurchase").removeClass("hide");
		})
	};
}
readAllCategoriesFilter();

/* Determinar la cantidad de compras */

function cantidadDeCompras() {
  var purchaseLength = $('.newPurchase').length;
  $('.lengthOfPurchase').html('Has realizado ' + purchaseLength + ' compras');
}

/* Mostrar si no hay compras */

function emptyExpenses() {
    var anyExpense = $('.newPurchase').length;
  if (anyExpense) {
    $('#noExpences').addClass('hide');
  } else {
    $('#noExpences').removeClass('hide');
  }
}

/* Evaluar OnBlur si son números o no */

function showFocus(elem) {
  var age = elem.value;
  if (isNaN(age)) {
    alert('Debe ingresar solo números');
    elem.style.backgroundColor = 'red';
  }
}

/* Eventos */

document.getElementById('get-values').onclick = newProduct;
document.getElementById('get-categories').onclick = createCategories;
document.getElementById('removeCategories').onclick = removeCategories;

/* Ready */

$(document).ready(function(){
  $( "#date" ).datepicker();
  emptyExpenses();
})
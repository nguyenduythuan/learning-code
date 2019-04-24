function pagination(page, allProducts){
	var numberPage = [];
	var pages = [];
	for(var i = 1; i <= allProducts; i++)
		pages.push(i);
	if(page == 1)
		return numberPage = pages.slice(page-1, page+4);
	else if(page <= 3)
			if(page == 3)
				return numberPage = pages.slice(page-3, page+2);
			else
				return numberPage = pages.slice(page-2, page+3);
		else if(page < allProducts){
				if(page == allProducts-2)
						return numberPage = pages.slice(page-3, allProducts);
				if(page > allProducts-2)
					return numberPage = pages.slice(page-4, allProducts);
				else
					return numberPage = pages.slice(page-3, page+2);
				}
			else
				if(page-5 < 0){
					return numberPage = pages.slice(page-page, allProducts);
				}
				else
					return numberPage = pages.slice(page-5, allProducts);
}

module.exports = pagination;
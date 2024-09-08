const gallerydiv = document.querySelector("#galleryboard");


// return new gallery item with classes for size
function process_size(gallery_pic, galleryitem) {
  var ratio = gallery_pic.width/gallery_pic.height;
  if (ratio < 1 && ratio >= 0.25) {
    galleryitem.classList.add("col-lg-6");
    galleryitem.classList.add("col-md-4");
    galleryitem.classList.add("col-sm-6");
    galleryitem.classList.add("col-xs-12");
  }
  if (ratio > 1 && ratio <= 1.5) {
    galleryitem.classList.add("col-lg-12");
    galleryitem.classList.add("col-md-8");
    galleryitem.classList.add("col-sm-9");
    galleryitem.classList.add("col-xs-12");
  }
  return galleryitem;
}

// clear gallery
function clear_gallery() {
  var gallerydiv = document.querySelector("#galleryboard");
  //console.log('running clear gallery')
  var gal_children = gallerydiv.children;
  var gal_length = gal_children.length;
  //console.log('gal_children count is: ',gal_children.length);
  //console.log('gal_children is: ',gal_children)
  for (gallery_count=0; gallery_count<gal_length; gallery_count++) {
    var gallerydiv = document.querySelector("#galleryboard");
    var gal_children = gallerydiv.children;
    var galleryitem = gal_children[0];
    //console.log('galleryitem to remove is: ',galleryitem);
    galleryitem.remove()
    //console.log('gallery_count is: ',gallery_count);
    //console.log('gal_children count is: ',gal_children.length);
  }
}



// build the gallery
function add_gallery() {
  const gallerydiv = document.querySelector("#galleryboard");

  for (pic=0; pic<gallery.length; pic++) {
    var galleryitem = document.createElement("img");
    galleryitem.src = gallery[pic].path;
    galleryitem = process_size(gallery[pic], galleryitem)
    galleryitem.classList.add("galleryitem")
    gallerydiv.append(galleryitem);
  }
}

// add filter event listeners
function add_filter_eventlisteners() {
  const filterrow = document.querySelector("#filters");
  var allfilters = filterrow.children

  for (filter_count = 0; filter_count < allfilters.length; filter_count++) {
    var filter = allfilters[filter_count];
    filter.addEventListener('click', add_gallery_keyword)
  }
}


// filter paintings by keyword
function add_gallery_keyword(keyword) {
  // clear gallery
  clear_gallery();

  // test keyword
  //console.log('adding gallery with the keyword.target.id: ',keyword.target.id)

  const gallerydiv = document.querySelector("#galleryboard");

  for (pic=0; pic<gallery.length; pic++) {
    keywords = gallery[pic].keywords;
    if (keywords.search(keyword.target.id) >= 0) {
      var galleryitem = document.createElement("img");
      galleryitem.src = gallery[pic].path;
      galleryitem = process_size(gallery[pic], galleryitem);
      galleryitem.classList.add("galleryitem");
      gallerydiv.append(galleryitem);
    }
  }

}

// on ready
$(document).ready(function() {
  const gallerydiv = document.querySelector("#galleryboard");
  add_gallery();
  add_filter_eventlisteners();

});

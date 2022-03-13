/*!
 * Charts - ICOCrypto v1.9.3 by Softnio.
**/
SmartApp =  (function (SmartApp, $, window) {
    "use strict";
	
	SmartApp.AdminTool = {};
	
    var $win		= $(window);
    
	
    SmartApp.AdminTool.init = function () {
    	var editer = $(".summernote");
    	if(editer.length > 0){
    		
    		
    		
    		if (!$("link[href='/assets/editer/summernote-bs4.css']").length){
		        $('<link/>', {
		          rel: 'stylesheet',
		          type: 'text/css',
		          href: '/assets/editer/summernote-bs4.css'
		        }).appendTo('head');
		    }

		    if (!$("link[href='/assets/editer/templates.css']").length){
		        $('<link/>', {
		          rel: 'stylesheet',
		          type: 'text/css',
		          href: '/assets/editer/templates.css'
		        }).appendTo('head');
		    }

		    if (!$("script[src='/assets/editer/summernote-bs4.js']").length){
		        $('<script/>', {
		          referrerpolicy: 'origin',
		          type: 'text/javascript',
		          src: '/assets/editer/summernote-bs4.js'
		        }).appendTo('head');
		    }

		    if (!$("script[src='/assets/editer/templates.js']").length){
		        $('<script/>', {
		          referrerpolicy: 'origin',
		          type: 'text/javascript',
		          src: '/assets/editer/templates.js'
		        }).appendTo('head');
		    }

		    if (!$("script[src='/assets/editer/summernote-classes.js']").length){
		        $('<script/>', {
		          referrerpolicy: 'origin',
		          type: 'text/javascript',
		          src: '/assets/editer/summernote-classes.js'
		        }).appendTo('head');
		    }


		   $.summernote.dom.emptyPara = "<div><br /></div>";
		    
		    
    		$('.summernote').summernote({
			    toolbar:[
			        ['custom',['blocks']], // Custom Buttons
			        ['style',['style']], 
			        ['font',['bold','italic','underline','clear']],
			        ['fontname',['fontname']],
			        ['color',['color']],
			        ['para',['ul','ol','paragraph']],
			        ['height',['height']],
			        ['table',['table']],
			        ['insert',['image','video','media','link','hr']],
			        ['view',['fullscreen','codeview']]
			    ],
			    blocks:{
			    	icon: '<i class="note-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" height="14"><path d="M 1,6.249111 H 6.25031 V 1 H 1 V 6.249111 z M 7.74969,1 V 6.249111 H 13 V 1 H 7.74969 z m 0,12 H 13 V 7.750444 H 7.74969 V 13 z M 1,13 H 6.25031 V 7.750444 H 1 V 13 z"/></svg></i>',
			        templates: '/assets/editer/templates/index.html' // The folder where the Block Templates are stored
			    }
			}).on("summernote.enter", function(we, e) {
			      $(this).summernote('pasteHTML', '<br />&VeryThinSpace;');
			      e.preventDefault();
			});

    	}
    };
    	SmartApp.components.docReady.push(SmartApp.AdminTool.init);
	return SmartApp;
})(SmartApp, jQuery, window);
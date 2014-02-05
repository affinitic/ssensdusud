/**
Copyright (c) 2011 Andrew Pryde
Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

code enhanced by bebel.
**/

(function($){
    $.fn.greyScale=function(args){
        $options=$.extend({
            fadeTime:$.fx.speeds._default,
            loopTime:1000,
            colorize:5,
            reverse:false
        },args);
        function greyScale(image,width,height){
            can=$('<canvas>').css({
                'display':'none',
                'left':'0',
                'position':'absolute',
                'top':'0'
            }).attr({
                'width':width,
                'height':height
            }).addClass('gsCanvas');
            ctx=can[0].getContext('2d');
            ctx.drawImage(image,0,0,width,height);
            imageData=ctx.getImageData(0,0,width,height);
            px=imageData.data;
            for(i=0;i<px.length;i+=4){
                grey=px[i]*.1+px[i+1]*0.6+px[i+2]*0.1;
                px[i]=px[i+1]=px[i+2]=grey;
            }
            //console.log(grey);
            ctx.putImageData(imageData,0,0);
            return can;
        }
        if($.browser.msie){
            this.each(function(){
                var greyscale=$options.reverse?0:1;
                $(this).css({
                    'filter':'progid:DXImageTransform.Microsoft.BasicImage(grayscale='+greyscale+')',
                    'zoom':'1'
                });
                $(this).hover(function(){
                    var greyscale=$options.reverse?1:0;
                    $(this).css({
                        'filter':'progid:DXImageTransform.Microsoft.BasicImage(grayscale='+greyscale+')'
                        });
                },function(){
                    var greyscale=$options.reverse?0:1;
                    $(this).css('filter','progid:DXImageTransform.Microsoft.BasicImage(grayscale='+greyscale+')');
                });
            });
        }else{
            this.each(function(index){
                $(this).wrap('<div class="gsWrapper">');
                gsWrapper=$(this).parent();
                gsWrapper.css({
                    'position':'relative',
                    'display':'inline-block'
                });
                if(window.location.hostname!==this.src.split('/')[2]){
                    $.getImageData({
                        url:$(this).attr('src'),
                        success:$.proxy(function(image){
                            can=greyScale(image,image.width,image.height);
                            if($options.reverse){
                                can.appendTo(gsWrapper).css({
                                    "display":"block",
                                    "opacity":"0"
                                });
                            }
                            else{
                                can.appendTo(gsWrapper).fadeIn($options.fadeTime);
                            }
                        },gsWrapper),
                    error:function(xhr,text_status){}
                    });
            }else{
                can=greyScale($(this)[0],$(this).width(),$(this).height());
                if($options.reverse){
                    can.appendTo(gsWrapper).css({
                        "display":"block",
                        "opacity":"0"
                    });
                }
                else{
                    can.appendTo(gsWrapper).fadeIn($options.fadeTime);
                }
            }
        });
i=0;
var lastRendered=[];

$(this).parent().delegate('.gsCanvas','mouseover mouseout',function(event){
    over=$options.reverse?1:0;
    out=$options.reverse?0:1;
    (event.type=='mouseover')&&$(this).stop().animate({
        'opacity':over
    },$options.fadeTime);
    (event.type=='mouseout')&&$(this).stop().animate({
        'opacity':out
    },$options.fadeTime);
});
}
};

})(jQuery);
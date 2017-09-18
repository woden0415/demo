/**
 * 翻页
 * created by wangdong
 * 2017/01/23
 *
 * 数据从0开始计数
 * 页数从1开始计数
 * 当前对象是所有按钮组(包括上一页、下一页、首页、尾页)
 *
 */
; (function ($) {
  jQuery.fn.paging = function (options) {
		/**
          @param    data             {json}                         所有的数据
          @param    numBtnOnePage    {number}                       显示几个带页数按钮
          @param    numOnePage       {number}                       每页显示几条数据
          @param    btnGroupLoc      {selector}                     带页数按钮位置
          @param    tpl              {selector}                     视图模板
          @param    tplParam         {string}                       视图模板的参数对象
          @param    dataLoc          {selector}                     视图显示位置
		};*/
    var defaults = {
      numBtnOnePage: 5,	   	        /*默认5个翻页按钮*/
      numOnePage: 7,             /*默认显示7条数据*/
    };
    var opts = $.extend(defaults, options);
    opts.numBtnOnePage = Number(opts.numBtnOnePage);
    opts.numOnePage = Number(opts.numOnePage);

    var $this = $(this),
      $firstPageBtn = $this.find(".pure-button.first"),			/*首页*/
      $lastPageBtn = $this.find(".pure-button.last"),          /*尾页*/
      $prevPageBtn = $this.find(".pure-button.prev"),			/*上一页*/
      $nextPageBtn = $this.find(".pure-button.next");			/*下一页*/

    if (opts.data) {
      var dataLength = opts.data.length,
        pageCount = Math.ceil(dataLength / opts.numOnePage);	//总页数
      // 为产品专区添加显示记录和页数
      $this.find(".recordCount .num").text(dataLength);
      $this.find(".pageCount .num").text(pageCount);
      if (dataLength == 0) {
        $firstPageBtn.addClass("disabled");
        $lastPageBtn.addClass("disabled");
        $prevPageBtn.addClass("disabled");
        $nextPageBtn.addClass("disabled");
        $(opts.dataLoc).html("");
        $(opts.btnGroupLoc).html("");
        $firstPageBtn.attr({ "data-page-index": "" });
        $lastPageBtn.attr({ "data-page-index": "" });
        return 0;
      } else {
        $firstPageBtn.removeClass("disabled");
        $lastPageBtn.removeClass("disabled");
        $prevPageBtn.removeClass("disabled");
        $nextPageBtn.removeClass("disabled");
        $firstPageBtn.attr({ "data-page-index": 1 });
        $lastPageBtn.attr({ "data-page-index": pageCount });
      }

    }


		/*
		 * 切割数据
		 * @param  {number} group    第几组数据
		 * @return {data}            截取之后的数据
		 */
    function sliceData(group) {
      var result = opts.data.slice(0 + opts.numOnePage * (group - 1), opts.numOnePage + opts.numOnePage * (group - 1));
      return result;
    }

		/**
		 * 创建翻页按钮，创建的新的翻页视图，视方向而定，选中第一个或者最后一个按钮
		 * @param  {number} n 					为第几组翻页按钮
		 * @param  {string} direction 	        翻页方向
		 * @return {view}           		    返回一个视图
		 */
    function pagingBtn(n, direction) {
      if (direction == "left") {
        var lengthBtns = opts.numBtnOnePage;
        for (var i = 0, itemList = ""; i < lengthBtns; i++) {
          if (i == lengthBtns - 1) {
            itemList = itemList + '<li><a class="pure-button pure-button-active nowPage" href="javascript:void(0)" data-page-index="' + Number(opts.numBtnOnePage * (n - 1) + Number(i + 1)) + '">' + Number(opts.numBtnOnePage * (n - 1) + (i + 1)) + '</a></li>';
          } else {
            itemList = itemList + '<li><a class="pure-button" href="javascript:void(0)" data-page-index="' + Number(opts.numBtnOnePage * (n - 1) + (i + 1)) + '">' + Number(opts.numBtnOnePage * (n - 1) + (i + 1)) + '</a></li>';
          }
        }
      }
      if (direction == "right") {
        var remainPage = pageCount - opts.numBtnOnePage * (n - 1);
        var lengthBtns = (opts.numBtnOnePage < remainPage) ? opts.numBtnOnePage : remainPage;
        for (var i = 0, itemList = ""; i < lengthBtns; i++) {
          if (i == 0) {
            itemList = itemList + '<li><a class="pure-button pure-button-active nowPage" href="javascript:void(0)" data-page-index="' + Number(opts.numBtnOnePage * (n - 1) + (i + 1)) + '">' + Number(opts.numBtnOnePage * (n - 1) + (i + 1)) + '</a></li>';
          } else {
            itemList = itemList + '<li><a class="pure-button" href="javascript:void(0)" data-page-index="' + Number(opts.numBtnOnePage * (n - 1) + (i + 1)) + '">' + Number(opts.numBtnOnePage * (n - 1) + (i + 1)) + '</a></li>';
          }
        }
      }
      $(opts.btnGroupLoc).html(itemList);
    }

		/**
		 * [renderTpl description]
		 * @param  {selector}    tpl       模板的选择器
		 * @param  {json}        pagedata  需要渲染的数据
		 * @return {view}                  返回视图
		 */
    function renderTpl(tpl, pagedata, dataLoc) {
      pagedata[opts.tplParam] = pagedata;
      var source = $(tpl).html();
      var template = Handlebars.compile(source);
      $(dataLoc).html(template(pagedata));
    }

    function bindEvent() {
      $this.off("click", ".pure-button").on("click", ".pure-button", function () {
        var $thisPage = $(this);
        if ($thisPage.attr("data-page-index") != undefined && $thisPage.attr("data-page-index") != "") {
          var thisPageIndex = $thisPage.attr("data-page-index");
          var tempData = sliceData(thisPageIndex);
          tempData[opts.tplParam] = tempData;
          renderTpl(opts.tpl, tempData, opts.dataLoc);
          $thisPage.addClass("pure-button-active nowPage")
            .parent().siblings().find("a").removeClass("pure-button-active nowPage");
          if ($this.find("[data-page-index=" + thisPageIndex + "]").length > 1) {
            $this.find("[data-page-index=" + thisPageIndex + "]").addClass("pure-button-active nowPage");
            $this.find("[data-page-index!=" + thisPageIndex + "]").removeClass("pure-button-active nowPage");
          } else {
            $firstPageBtn.removeClass("pure-button-active nowPage");
            $lastPageBtn.removeClass("pure-button-active nowPage");
          }
          if (pageCount == 1) {
            $prevPageBtn.addClass("disabled");
            $nextPageBtn.addClass("disabled");
          } else {
            if (thisPageIndex == 1) {
              $prevPageBtn.addClass("disabled");
              $nextPageBtn.removeClass("disabled");
            } else if (thisPageIndex == pageCount) {
              $prevPageBtn.removeClass("disabled");
              $nextPageBtn.addClass("disabled");
            } else {
              $prevPageBtn.removeClass("disabled");
              $nextPageBtn.removeClass("disabled");
            }
          }
        }
      });
      $this.off("click", ".pure-button.prev,.pure-button.next")
        .on("click", ".pure-button.prev,.pure-button.next", function () {
          var $pageSwitch = $(this);
          if ($pageSwitch.hasClass("disabled")) {
            return 0;
          } else {
            var currentPage = $(opts.btnGroupLoc).find(".pure-button-active.nowPage");
            var currentPageIndex = currentPage.attr("data-page-index");
            if ($pageSwitch.hasClass("prev")) {
              var prevPageIndex = currentPageIndex - 1;
              if (currentPageIndex % opts.numBtnOnePage == 1) {
                var nGroup = Math.floor(currentPageIndex / opts.numBtnOnePage);
                pagingBtn(nGroup, "left");
                renderTpl(opts.tpl, sliceData(prevPageIndex), opts.dataLoc);
                $nextPageBtn.removeClass("disabled");
              } else {
                $this.find("[data-page-index=" + currentPageIndex + "]").removeClass("pure-button-active nowPage");
                $this.find("[data-page-index=" + prevPageIndex + "]").addClass("pure-button-active nowPage");
                renderTpl(opts.tpl, sliceData(prevPageIndex), opts.dataLoc);
                $nextPageBtn.removeClass("disabled");
                if (prevPageIndex == 1) {
                  $prevPageBtn.addClass("disabled");
                }
              }
            } else if ($pageSwitch.hasClass("next")) {
              var nextPageIndex = Number(currentPageIndex) + 1;
              if (currentPageIndex % opts.numBtnOnePage == 0) {
                var nGroup = Math.floor(Number(currentPageIndex / opts.numBtnOnePage) + 1);
                pagingBtn(nGroup, "right");
                renderTpl(opts.tpl, sliceData(nextPageIndex), opts.dataLoc);
              } else {
                $this.find("[data-page-index=" + currentPageIndex + "]").removeClass("pure-button-active nowPage");
                $this.find("[data-page-index=" + nextPageIndex + "]").addClass("pure-button-active nowPage");
                renderTpl(opts.tpl, sliceData(nextPageIndex), opts.dataLoc);
                $prevPageBtn.removeClass("disabled");
              }
              if (nextPageIndex == pageCount) {
                $nextPageBtn.addClass("disabled");
              }
            }
          }
        });
      $this.off("click", ".pure-button.first,.pure-button.last")
        .on("click", ".pure-button.first,.pure-button.last", function () {
          var $pageBothEnd = $(this),
            currentPage = $pageBothEnd.attr("data-page-index");
          if (currentPage != "") {
            if ($pageBothEnd.hasClass("first")) {
              if ($(opts.btnGroupLoc).filter("li:first").children("a").attr("data-page-index") == 1) {
                return 0;
              } else {
                pagingBtn(1, "right");
                $this.find("[data-page-index=1]").addClass("pure-button-active nowPage");
                $this.find("[data-page-index!=1]").removeClass("pure-button-active nowPage");
                $prevPageBtn.addClass("disabled");
              }
            } else if ($pageBothEnd.hasClass("last")) {
              if ($(opts.btnGroupLoc).find("li:last").children("a").attr("data-page-index") == pageCount) {
                return 0;
              } else {
                pagingBtn(Math.ceil(pageCount / opts.numBtnOnePage), "right");
                $this.find("[data-page-index=" + pageCount + "]").addClass("pure-button-active nowPage");
                $this.find("[data-page-index!=" + pageCount + "]").removeClass("pure-button-active nowPage");
                $nextPageBtn.addClass("disabled");
              }
            }
          }
        });
    }

    /*函数执行入口*/
    $firstPageBtn.removeClass("pure-button-active nowPage");
    $lastPageBtn.removeClass("pure-button-active nowPage");
    $prevPageBtn.removeClass("disabled");
    $nextPageBtn.removeClass("disabled");
    pagingBtn(1, "right");
    $firstPageBtn.addClass("pure-button-active nowPage");
    renderTpl(opts.tpl, sliceData(1), opts.dataLoc);
    if (pageCount == 1) {
      $prevPageBtn.addClass("disabled");
      $nextPageBtn.addClass("disabled");
      $firstPageBtn.addClass("pure-button-active nowPage");
      $lastPageBtn.addClass("pure-button-active nowPage");
      bindEvent();
    } else if (pageCount == 0) {
      $prevPageBtn.addClass("disabled");
      $nextPageBtn.addClass("disabled");
      $prevPageBtn.addClass("disabled");
      $nextPageBtn.addClass("disabled");
    } else {
      $prevPageBtn.addClass("disabled");
      bindEvent();
    }

  }
})(jQuery);

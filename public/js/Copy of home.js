var ajaxes = []
function killAjaxes() {
    $.each(ajaxes, function (i, ajax) {
        ajax.abort()
    })
}


$.widget("custom.catcomplete", $.ui.autocomplete, {
    _create: function () {
        this._super();
        this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
    },
    _renderMenu: function (ul, items) {
        var that = this,
          currentCategory = "";
        $.each(items, function (index, item) {
            var li;
            if (item.category != currentCategory) {
                ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
                currentCategory = item.category;
            }
            li = that._renderItemData(ul, item);
            if (item.category) {
                li.attr("aria-label", item.category + " : " + item.label);
            }
        });

    }
});


$(id).catcomplete({
    appendTo: $("#" + id[0].id + way + "-ul"),
    source: function (request, response) {

        $("blink").empty()
        killAjaxes()
        ajaxes = [
           $.ajax({
               async: false,
               global: false,
               dataType: "json",
               type: 'POST',
               url: '/mobile-api/',
               beforeSend: function (jqXHR, settings, event) {


                   jqXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                   settings.type = 'POST';
                   settings.hasContent = true;
                   settings.global = false;
                   settings.data = $.param({ q: request.term.replace(/[^a-zA-Z0-9 ]/g, ""), method: "pointQuery" });

               },
               success: function (data, status, xhr) {

                   if (data.status !== "200") {
                       bootbox.alert(data.result, function () { });
                       valid = false;
                       $("#" + id[0].id + way).removeClass('ui-autocomplete-loading');
                   } else {
                       response(formatJSON(data));
                       valid = true;
                   }

                   return valid;

               }
           }),
            $.ajax({
                async: false,
                dataType: "json",
                type: 'POST',
                url: '/mobile-api/',
                beforeSend: function (jqXHR, settings, event) {


                    jqXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    settings.type = 'POST';
                    settings.hasContent = true;
                    settings.global = false;
                    settings.data = $.param({ q: request.term.replace(/[^a-zA-Z0-9 ]/g, ""), method: "pointQueryGoogle" });

                },
                success: function (data, status, xhr) {

                    if (data.status !== "200") {
                        bootbox.alert(data.result, function () { });
                        valid = false;
                        $("#" + id[0].id + way).removeClass('ui-autocomplete-loading');
                    } else {
                        response(formatJSON(data));
                        valid = true;
                    }

                    return valid;

                }
            })
        ]
        $.when.apply(0, ajaxes).then(function () {
            response(Array.prototype.map.call(arguments, function (res) {

                return res[0]
            }).reduce(function (p, c) {

                p.result["GOOGLE PLACE"] = c.result["GOOGLE PLACE"]
                return formatJSON(p)
            }))
        })
    },
    minLength: 3,
    autoFocus: true,
    focus: function (event, ui) {
    },
    open: function (event, ui) {
        if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
            $('.ui-autocomplete').off('menufocus hover mouseover');
        }
    },
    close: function (event, ui) {

    },
    select: function (event, ui) {

        if (ui.item !== null) {
            $(id).attr("data-detail", ui.item.detail);
            $(id).addClass("ui-autocomplete-success");
            pickupLabelFix("", ui.item.catId);

        } else {
            $(id).removeClass("ui-autocomplete-success");
        }

        if ($("#pageFrom").val() === "transferUpdate") {
            updateQuotation();


            $(id).closest('div.ui-input-text').parent().find('.divExtInp').remove();

            if (y === "") {
                $(id).closest('div.ui-input-text').after(addInfoInput(x, y, ui.item.catId, ui.item.detail));
            } else {
                $(id).closest('div.ui-input-text').parent().find('a.removeImg').after(addInfoInput(x, y, ui.item.catId, ui.item.detail));
            }




        }

    }, change: function (event, ui) {
        $(id).css('border-color', '');

        if (ui.item !== null) {
            $(id).attr("data-detail", ui.item.detail);
            $(id).addClass("ui-autocomplete-success");
            pickupLabelFix("", ui.item.catId);

        } else {
            $(id).removeClass("ui-autocomplete-success");
            $(id).val("");

        }

    }
}).catcomplete("instance")._renderItem = function (ul, item) {

    return $("<li>")
    .append("<span class='li-label'>" + item.label + "</span><span class='li-image'><img src='" + item.image + "' /></span>")
    .appendTo(ul);
};
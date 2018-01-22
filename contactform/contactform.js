jQuery(document).ready(function ($) {
  "use strict";

  //Contact
  $('form.contactForm').submit(function () {
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function () { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '' && $('.orcamento').css('display') != "none") {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (!i.attr('checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function () { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });

    f.children('select').each(function () { // run all select

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }
        switch (rule) {
          case 'required':
            if (i.val() === null && $('.orcamento').css('display') != "none") {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else {
      if ($(".orcamento").css("display") == "none")
        var data = {
          type: "contato",
          name: $("#name").val(),
          email: $("#email").val(),
          companyName: $("#companyName").val(),
          message: $("#message").val()
        }
      else
        var data = {
          type: "orcamento",
          name: $("#name").val(),
          email: $("#email").val(),
          companyName: $("#companyName").val(),
          service: getService($("#service").val()),
          date: $("#date").val(),
          site: $("input[name='site']:checked").val(),
          logo: $("input[name='logo']:checked").val(),
          message: $("#message").val()
        }
    }
    $(".validation").each(function(){
      var current = $(this);
      if (current.html() == "")
        current.css('display', 'none');
    });
    $.ajax({
      type: "POST",
      url: "contactform/contactform.php",
      cache: false,
      data: data,
      success: function () {
        $("#sendmessage").addClass("show");
        $("#errormessage").removeClass("show fadeIn animated");
        $('.contactForm').find("input, textarea").val("");
        setTimeout(function () {
          $("#sendmessage").removeClass("fadeIn animated");
          $("#sendmessage").addClass("fadeOut animated");
          setTimeout(function () {
            $('#sendmessage').removeClass("show");
            $(".orcamento").css("display", "none");
            $("#message").attr('placeholder', 'Mensagem')
            $("#sendmessage").removeClass("fadeOut animated");
          }, 800);
        }, 3000);

      },
      error: function () {
        $("#sendmessage").removeClass("show");
        $("#errormessage").addClass("show fadeIn animated");
        setTimeout(function () {
          $("#errormessage").removeClass("fadeIn animated");
          $("#errormessage").addClass("fadeOut animated");
          setTimeout(function () {
            $('#errormessage').removeClass("show");
            $("#errormessage").removeClass("fadeOut animated");
          }, 800);
        }, 3000);
      }
    });
    return false;
  });

  function getService(number) {
    switch (number) {
      case 1:
        return "Websites";
      case 2:
        return "Aplicativos Móveis";
      case 3:
        return "Sistemas Empresariais";
      case 4:
        return "Manutenção de Sites";
      case 5:
        return "Branding Digital";
      case 6:
        return "SEO";
      case 7:
        return "E-Commerce";
      case 8:
        return "E-mail Marketing";
      case 9:
        return "Foto Still";
    }
  }

});
$(function() {
  var
    previewNode = $('#preview'),
    themePicker = $('#preview-chooser a'),
    themeNodes = $('#preview .theme'),
    iframes = $('#preview iframe'),
    contentNode = $('#main > .content'),
    selectedTheme = localStorage.getItem('theme') || 'android',
    demoPoints = contentNode.find('input[data-demo]'),
    fullPageDemo = contentNode.find('input[data-fullpage-demo]'),
    externalPoints = contentNode.find('input[data-external-demo]'),
    viewSourceButtons = previewNode.find('.view-source'),
    desktopLauncher = previewNode.find('.desktop-launcher'),
    currentPage,
    currentSource,
    mobileThemes = ['android', 'apple']
    ;

  function getSourceURL(page, source) {
    return 'https://github.com/quasarframework/quasar-play/tree/master/src/pages/showcase/' +
      (source || (page + '.vue'));
  }

  function getDemoURL(theme, page) {
    if (page.indexOf('http') === 0) {
      return page;
    }
    return '/quasar-play/' + theme + '/index.html#/showcase/' + page;
  }

  function getExternalLinks(page, source, alwaysVisible) {
    return '<div class="demo-links ' + (alwaysVisible ? 'demo-always-visible' : '') + '">Demo: ' +
      mobileThemes.map(function(theme) {
        return '<a class="spawn-demo" ' +
          'href="' + getDemoURL(theme, page) + '" target="_blank"><i class="fa fa-' + theme + '"></i></a>';
      }).join(' ') +
      ' <a class="spawn-demo" target="_blank" href="' + getSourceURL(page, source) + '">' +
      'Source <i class="fa fa-file-code-o"></i></a></div>';
  }

  externalPoints.each(function() {
    var
      $this = $(this),
      page = $this.data('external-demo'),
      source = $this.data('source')
      ;

    $this.after(getExternalLinks(page, source, true));
  });

  /* eslint-disable no-extra-parens */
  if (
    !themePicker.length ||
    (!demoPoints.length && !fullPageDemo.length)
  ) {
    return;
  }

  if (window.isMobile) {
    demoPoints.each(function() {
      var
        $this = $(this),
        page = $this.data('demo')
        ;

      $this.replaceWith(getExternalLinks(page, true));
    });

    fullPageDemo.replaceWith(
      getExternalLinks(
        fullPageDemo.data('fullpage-demo'),
        fullPageDemo.data('source'),
        true
      )
    );

    return; // <<<<--- EARLY EXIT
  }

  if (fullPageDemo.length === 0) {
    $('#main .footer').css('margin-bottom', '100vh');
  }

  themePicker.click(function() {
    window.themePreview.selectTheme($(this).data('theme'));
  });

  window.themePreview = {
    show: function(page, source) {
      previewNode.css('display', 'block');
      contentNode.addClass('with-previewer');
      currentPage = page;
      currentSource = source
      this.selectTheme(selectedTheme);
    },
    hide: function() {
      previewNode.css('display', 'none');
      contentNode.removeClass('with-previewer');
    },
    selectPage: function(page) {
      iframes.each(function() {
        var
          $this = $(this),
          theme = $(this).attr('id').split('-')[0]
          ;

        if (selectedTheme !== theme) {
          return;
        }

        if (page) {
          $this.attr('src', getDemoURL(theme, page));

          viewSourceButtons
            .add(desktopLauncher)
            .css('display', page.indexOf('http') === 0 ? 'none' : 'inline-block');

          viewSourceButtons.attr('href', getSourceURL(page, currentSource));
          desktopLauncher.attr('href', getDemoURL(theme, page));
        }
        else {
          $this.attr('src', '');
          viewSourceButtons
            .add(desktopLauncher)
            .css('display', 'none');
        }
      });
    },
    selectTheme: function(theme) {
      themePicker.removeClass('active');

      $('#preview #preview-chooser a[data-theme="' + theme + '"]').addClass('active');

      themeNodes.css('display', 'none');
      $('#' + theme + '-preview').css('display', 'block');

      localStorage.setItem('theme', theme);
      selectedTheme = theme;
      this.selectPage(currentPage);
    }
  };

  if (fullPageDemo.length > 0) {
    window.themePreview.fullPageDemo = true;
    window.themePreview.show(fullPageDemo.data('fullpage-demo'), fullPageDemo.data('source'));
  }
  else {
    window.themePreview.show();
  }
});
